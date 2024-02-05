import { v4 as uuidv4 } from "uuid"
import { sandboxLocationToURLParams, type SandboxLocation } from "../location"
import { get, writable, type Writable } from "svelte/store"

import DOMPurify from 'dompurify';
import { marked } from 'marked';

interface ISandboxHandler {
    getConfig(): Promise<any>
    getLocation(title: string | null): Promise<SandboxLocation>
    getSandbox(sandbox: Sandbox): Promise<Sandbox>
    save(sandbox: Sandbox): Promise<boolean>
}

export class LocalSandboxHandler implements ISandboxHandler {
    constructor(public params: {id: string}) {}

    async getConfig(): Promise<any> {
        let data = JSON.parse(<any>localStorage.getItem(this.params.id))
        // let sandbox = new Sandbox(this, data.files, data.title, data.readmeHTML)
        return data
    }

    async getSandbox(config: any): Promise<Sandbox> {
        // return <{[path: string]: string}>sandbox.fileMetadata;

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

    async getLocation(title: string | null): Promise<SandboxLocation> {
        return {
            version: 'v1',
            method: 'local',
            params: this.params,
            title: title,
        }
    }

    async save(sandbox: Sandbox): Promise<boolean> {
        let repository: SandboxLocation[] = JSON.parse(<any>localStorage.getItem('repository') ?? "[]")

        // let existingIndex = repository.findIndex((loc) => )

        repository = repository.filter((loc) => !(loc.method == 'local' && loc.params.id == this.params.id))

        // if (existingIndex !== -1) {
        //     console.log(repository);
            
        //     delete repository[existingIndex]
         
        //     console.log(repository);
        // }

        let title = sandbox.getTitle()

        let serialized = JSON.stringify({
            baseLocation: sandbox.baseLocation,
            nodes: get(sandbox.nodes),
            viewNode: get(sandbox.viewNode),
            openNodes: get(sandbox.openNodes),
            nodeContents: get(sandbox.nodeContents),
            readmeHTML: sandbox.readmeHTML,
            // title: title,
        })

        localStorage.setItem(this.params.id, serialized)
        repository.push(await this.getLocation(title))
        localStorage.setItem('repository', JSON.stringify(repository))

        return true
    }
}

// http://localhost:4321/v1/?id=5d9bb788-0a20-4ee3-ba2a-cae5dca38be5&method=local

export class FetchSandboxHandler implements ISandboxHandler {
    constructor(public params: {[url: string]: string}) {}

    async getConfig(): Promise<any> {
        let data = await (await fetch(this.params.url + "/sandbox.json")).json()
        return data
    }

    async getSandbox(config: any): Promise<Sandbox> {

        let fileNodes = config.nodes.filter((node: any) => node.type != 'folder')

        let nodeContents = Object.fromEntries(await Promise.all(fileNodes.map(async (node: any) =>
            [node.id, await (await fetch(this.params.url + config.nodePaths[node.id])).text()]
        )))

        return new Sandbox(
            this,
            writable(config.nodes),
            writable(config.openNodes),
            writable(config.viewNode),
            writable(nodeContents),
            writable(config.readmeHTML ?? null),
            config.baseLocation
        )
    }

    async getLocation(title: string | null): Promise<SandboxLocation> {
        return {
            version: 'v1',
            method: 'fetch',
            params: this.params,
            title: title,
        }
    }

    async save(sandbox: Sandbox): Promise<boolean> {
        return false;
    }
}

export class Sandbox {
    private baseFiles?: {[path: string]: string}
    public nodeIndexer: Writable<{[path: string]: number}>

    constructor(
        public handler: ISandboxHandler,
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
        // this.updateIndex(get(this.nodes))
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

    async setWindowLocation() {
        let title = this.getTitle()
        let sandboxLocation = await this.handler.getLocation(title);
        let href = location.origin + sandboxLocationToURLParams(sandboxLocation)
        window.history.pushState(null, '', href);
    }

    async save() {
        let title = this.getTitle()
        this.updateReadme()
        let saved = await this.handler.save(this);
        if (!saved) {
            this.handler = getHandler({
                method: "local",
                version: "v1",
                params: {
                    id: uuidv4()
                },
                title: title
            })
            await this.handler.save(this);
        }
        await this.setWindowLocation()
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

export function getHandler(location: SandboxLocation): ISandboxHandler {
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