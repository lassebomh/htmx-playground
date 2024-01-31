import { v4 as uuidv4 } from "uuid"
import { sandboxLocationToURLParams, type SandboxLocation } from "../location"

interface ISandboxHandler {
    get(): Promise<Sandbox>
    getLocation(): Promise<SandboxLocation>
    getFiles(sandbox: Sandbox): Promise<{[key: string]: string}>
    save(sandbox: Sandbox): Promise<void>
}

type FileMetadata = {
    type: string,
    droppable: boolean,
    text: string,
    id: string,
    parent: string,
    view: any,
    open: boolean,
}

export class LocalSandboxHandler implements ISandboxHandler {
    constructor(public params: {[key: string]: string}) {
        this.params.key = this.params.key || uuidv4()
    }

    async get(): Promise<Sandbox> {
        let data = JSON.parse(<any>localStorage.getItem(this.params.key))
        let sandbox = new Sandbox(this, data.files, data.title, data.readmeHTML)
        return sandbox
    }

    async getFiles(sandbox: Sandbox): Promise<{[path: string]: string}> {
        return <{[path: string]: string}>sandbox.fileMetadata;
    }

    async getLocation(): Promise<SandboxLocation> {
        return {
            version: 'v1',
            method: 'local',
            params: this.params
        }
    }

    async save(sandbox: Sandbox): Promise<void> {
        let repository: {[id: string]: null} = JSON.parse(<any>localStorage.getItem('repository') ?? "{}")

        let serialized = JSON.stringify({
            baseLocation: sandbox.baseLocation,
            files: sandbox.files,
            title: sandbox.title,
            readmeHTML: sandbox.readmeHTML,
        })

        console.log(serialized);

        localStorage.setItem(this.params.key, serialized)
        repository[this.params.key] = null;
        localStorage.setItem('repository', JSON.stringify(repository))
    }
}

// http://localhost:5173/?key=32fb95a2-517e-4487-bc1e-c411b437a77a&version=v1&method=local
// http://localhost:5173/?path=%2Fv1%2Fv1example&version=v1&method=fetch

export class FetchSandboxHandler implements ISandboxHandler {
    constructor(public params: {[url: string]: string}) {}

    async get(): Promise<Sandbox> {
        let data = await (await fetch(this.params.url + "/_sandbox.json")).json()
        let sandbox = new Sandbox(this, data.files, data.title, data.baseLocation, data.readmeHTML)
        return sandbox
    }

    async getFiles(sandbox: Sandbox): Promise<{[path: string]: string}> {
        return Object.fromEntries(await Promise.all(Object.keys(sandbox.fileMetadata).map(async url =>
            [url, await (await fetch(this.params.url + url)).text()]
        )))
    }

    async getLocation(): Promise<SandboxLocation> {
        return {
            version: 'v1',
            method: 'fetch',
            params: this.params
        }
    }

    async save(sandbox: Sandbox): Promise<void> {
        // let repository: {[id: string]: null} = JSON.parse(<any>localStorage.getItem('repository') ?? "{}")

        // let serialized = JSON.stringify({
        //     baseLocation: sandbox.baseLocation,
        //     files: sandbox.files,
        //     title: sandbox.title,
        //     readmeHTML: sandbox.readmeHTML,
        // })

        // console.log(serialized);

        // localStorage.setItem(this.params.key, serialized)
        // repository[this.params.key] = null;
        // localStorage.setItem('repository', JSON.stringify(repository))
    }
}

export class Sandbox {
    private baseFiles: {[path: string]: string} = {}
    public files?: {[path: string]: string}
    private loaded: boolean = false

    constructor(
        public handler: ISandboxHandler,
        public fileMetadata: {[path: string]: string | null},
        public title: string,
        public baseLocation?: SandboxLocation,
        public readmeHTML?: string
    ) {}

    async save() {
        await this.handler.save(this)
        let sandboxLocation = await this.handler.getLocation();
        let href = location.origin + sandboxLocationToURLParams(sandboxLocation)
        window.history.pushState(null, '', href);
        return
    }

    async loadFiles(): Promise<void> {
        if (this.loaded) return

        this.files = await this.handler.getFiles(this)

        if (this.baseLocation) {
            let base = await Sandbox.load(this.baseLocation)
            await base.loadFiles()
            this.baseFiles = base.exportFiles()
        }

        this.loaded = true
    }

    exportFiles(): {[path: string]: string} {
        return {...this.files, ...this.baseFiles}
    }

    static async load(location: SandboxLocation): Promise<Sandbox> {
        let Handler = (() => {
            switch (location.method) {
                case "local":
                    return LocalSandboxHandler
                case "fetch":
                    return FetchSandboxHandler
                default:
                    throw new Error("Unknown method")
        }})()

        let handler = new Handler(location.params)
        
        return handler.get()
    }
}

