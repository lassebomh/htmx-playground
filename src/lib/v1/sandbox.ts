import { v4 as uuidv4 } from "uuid"
import { sandboxLocationToURLParams, type SandboxLocation, compareSandboxLocations, setWindowLocation } from "../location"
import { get, writable, type Writable } from "svelte/store"

import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { directoryAdd, directoryContainsHandler, directoryDelete } from "./directory";

export abstract class AbstractSandboxHandler {
    
    version = 'v1';

    abstract method: string;
    abstract savable: boolean;

    abstract getConfig(): Promise<any>
    abstract getSandbox(config: any): Promise<Sandbox>
    abstract save(sandbox: Sandbox): Promise<void>
    abstract delete(): Promise<void>

    constructor(public params: {[key: string]: string}) {}

    serialize(sandbox: Sandbox): any {
        let serialized = {
            baseLocation: sandbox.baseLocation,
            nodes: get(sandbox.nodes),
            viewNode: get(sandbox.viewNode),
            openNodes: get(sandbox.openNodes),
            nodeContents: get(sandbox.nodeContents),
            readmeHTML: sandbox.readmeHTML,
        }
    
        return serialized
    }
    
    unserialize(config: any): Sandbox {
        return new Sandbox(
            this,
            writable(config.nodes),
            writable(config.openNodes),
            writable(config.viewNode),
            writable(config.nodeContents),
            writable(config.readmeHTML ?? null),
            config.baseLocation
        )
    }

    getLocation(title: string | null): SandboxLocation {
        return {
            version: this.version,
            method: this.method,
            params: this.params,
            title: title,
        }
    }
}

export class LocalSandboxHandler extends AbstractSandboxHandler {
    method = 'local';
    savable = true;

    async getConfig(): Promise<any> {
        let data = JSON.parse(<any>localStorage.getItem(this.params.id))
        // let sandbox = new Sandbox(this, data.files, data.title, data.readmeHTML)
        return data
    }

    async getSandbox(config: any): Promise<Sandbox> {
        return this.unserialize(config)
    }

    async save(sandbox: Sandbox): Promise<void> {
        if (!this.params.id) {
            let uuid = uuidv4().replaceAll('-', '')
            let end = 4;
            this.params.id=uuid.substring(0, end)

            while (directoryContainsHandler(this)) {
                end += 2
                this.params.id=uuid.substring(0, end)
            }
        }

        let title = sandbox.getTitle()
        directoryAdd(this, title)

        let serialized = JSON.stringify(this.serialize(sandbox))
        localStorage.setItem(this.params.id, serialized)
    }
    async delete(): Promise<void> {
        directoryDelete(this)
        localStorage.removeItem(this.params.id)
    }
}

export class FetchSandboxHandler extends AbstractSandboxHandler {
    method = 'fetch';
    savable = false;

    async getConfig(): Promise<any> {
        let data = await (await fetch(this.params.url + "/sandbox.json")).json()
        return data
    }

    async getSandbox(config: any): Promise<Sandbox> {
        let fileNodes = config.nodes.filter((node: any) => node.type != 'folder')
        let nodeContents = Object.fromEntries(await Promise.all(fileNodes.map(async (node: any) =>
            [node.id, await (await fetch(this.params.url + config.nodePaths[node.id])).text()]
        )))

        config.nodeContents = nodeContents;

        return this.unserialize(config)
    }

    async save(sandbox: Sandbox): Promise<void> {
        directoryAdd(this, sandbox.getTitle())
    }
    async delete(): Promise<void> {
        directoryDelete(this)
    }
}

export class Sandbox {
    private baseFiles?: {[path: string]: string}
    public nodeIndexer: Writable<{[path: string]: number}>

    constructor(
        public handler: AbstractSandboxHandler,
        public nodes: Writable<any[]>,
        public openNodes: Writable<any[]>,
        public viewNode: Writable<string | null>,
        public nodeContents: Writable<{[path: string]: string}>,
        public readmeHTML: Writable<string | null>,
        public baseLocation?: SandboxLocation,
    ) {
        this.nodeIndexer = writable(this.createIndex(get(this.nodes)))

        nodes.subscribe((nodes) => {
            this.nodeIndexer.set(this.createIndex(nodes))
        })
        this.updateReadme()
    }

    getTitle(): string {
        return get(this.nodes).find((node) => node.id == '__root__').text
    }

    updateReadme() {
        let readmeNode = get(this.nodes).find(node => node.text.toLowerCase() == 'readme.md')

        let markdown = null;

        if (readmeNode != null) {
            markdown = get(this.nodeContents)[readmeNode.id]
        }

        if (markdown != null) {
            let unsanitized = <string>marked(markdown, {async: false})
            this.readmeHTML.set(DOMPurify.sanitize(unsanitized))
        } else {
            this.readmeHTML.set(null);
        }
    }

    createIndex(nodes: any[]) {
        let newNodeIndexer: any = {}

        nodes.forEach((node, i) => {
            newNodeIndexer[node.id] = i
        });

        return newNodeIndexer
    }

    async save() {
        this.updateReadme()
        await this.handler.save(this);
        setWindowLocation(this.handler.getLocation(this.getTitle()))
    }

    getFiles(): {[path: string]: string} {
        let out: {[path: string]: string} = {}
        get(this.nodes).forEach((node) => {
            if (node.type == 'folder') return

            let path = "/"
            let parent = node.parent && get(this.nodes)[get(this.nodeIndexer)[node.parent]]
            while (parent != null && parent.id != '__root__') {
                path += parent.text + '/'
                parent = parent.parent && get(this.nodes)[get(this.nodeIndexer)[parent.parent]]
            }
            path += node.text

            out[path] = get(this.nodeContents)[node.id]
        })
        return out
    }

    async exportFiles(): Promise<{[path: string]: string}> {

        let files = this.getFiles()

        if (this.baseLocation) {
            if (!this.baseFiles) {
                let handler = getHandler(this.baseLocation)
                let baseConfig = await handler.getConfig()
                let base = await handler.getSandbox(baseConfig)
                this.baseFiles = await base.exportFiles()
            }

            return {...this.baseFiles, ...files}
        } else {
            return files
        }
    }
}

export function getHandler(location: SandboxLocation): AbstractSandboxHandler {
    let Handler = (() => {
        switch (location.method) {
            case "local":
                return LocalSandboxHandler
            case "fetch":
                return FetchSandboxHandler
            default:
                throw new Error("Unknown method")
    }})()

    return new Handler(<any>location.params)
}
