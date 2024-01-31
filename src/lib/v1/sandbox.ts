import { v4 as uuidv4 } from "uuid"
import { sandboxLocationToURLParams, type SandboxLocation } from "../location"
import { get, writable, type Writable } from "svelte/store"

interface ISandboxHandler {
    getConfig(): Promise<any>
    getLocation(): Promise<SandboxLocation>
    getSandbox(sandbox: Sandbox): Promise<Sandbox>
    save(sandbox: Sandbox): Promise<void>
}

// export class LocalSandboxHandler implements ISandboxHandler {
//     constructor(public params: {[key: string]: string}) {
//         this.params.key = this.params.key || uuidv4()
//     }

//     async get(): Promise<Sandbox> {
//         let data = JSON.parse(<any>localStorage.getItem(this.params.key))
//         let sandbox = new Sandbox(this, data.files, data.title, data.readmeHTML)
//         return sandbox
//     }

//     async getFiles(sandbox: Sandbox): Promise<{[path: string]: string}> {
//         return <{[path: string]: string}>sandbox.fileMetadata;
//     }

//     async getLocation(): Promise<SandboxLocation> {
//         return {
//             version: 'v1',
//             method: 'local',
//             params: this.params
//         }
//     }

//     async save(sandbox: Sandbox): Promise<void> {
//         let repository: {[id: string]: null} = JSON.parse(<any>localStorage.getItem('repository') ?? "{}")

//         let serialized = JSON.stringify({
//             baseLocation: sandbox.baseLocation,
//             files: sandbox.files,
//             title: sandbox.title,
//             readmeHTML: sandbox.readmeHTML,
//         })

//         console.log(serialized);

//         localStorage.setItem(this.params.key, serialized)
//         repository[this.params.key] = null;
//         localStorage.setItem('repository', JSON.stringify(repository))
//     }
// }

// http://localhost:5173/?key=32fb95a2-517e-4487-bc1e-c411b437a77a&version=v1&method=local
// http://localhost:5173/?path=%2Fv1%2Fv1example&version=v1&method=fetch

export class FetchSandboxHandler implements ISandboxHandler {
    constructor(public params: {[url: string]: string}) {}

    async getConfig(): Promise<any> {
        let data = await (await fetch(this.params.url + "/sandbox.json")).json()
        // let sandbox = new Sandbox(this, data.files, data.title, data.baseLocation, data.readmeHTML)
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
            config.readmeHTML,
            config.baseLocation
        )
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
    private baseFiles?: {[path: string]: string}
    public nodeIndexer: Writable<{[path: string]: number}>

    constructor(
        public handler: ISandboxHandler,
        public nodes: Writable<any[]>,
        public openNodes: Writable<any[]>,
        public viewNode: Writable<string | null>,
        public nodeContents: Writable<{[path: string]: string}>,
        public readmeHTML?: string,
        public baseLocation?: SandboxLocation,
    ) {
        this.nodeIndexer = writable(this.createIndex(get(this.nodes)))

        nodes.subscribe((nodes) => {
            this.nodeIndexer.set(this.createIndex(nodes))
        })
        // this.updateIndex(get(this.nodes))
    }

    createIndex(nodes: any[]) {
        let newNodeIndexer: any = {}

        nodes.forEach((node, i) => {
            newNodeIndexer[node.id] = i
        });

        return newNodeIndexer
    }

    async save() {
        await this.handler.save(this)
        let sandboxLocation = await this.handler.getLocation();
        let href = location.origin + sandboxLocationToURLParams(sandboxLocation)
        window.history.pushState(null, '', href);
        return
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

    // static async getConfig(location: SandboxLocation): Promise<any> {

    //     let handler = 
        
    //     return handler.getConfig()
    // }
}

export function getHandler(location: SandboxLocation): ISandboxHandler {
    let Handler = (() => {
        switch (location.method) {
            // case "local":
            //     return LocalSandboxHandler
            case "fetch":
                return FetchSandboxHandler
            default:
                throw new Error("Unknown method")
    }})()

    return new Handler(location.params)
}