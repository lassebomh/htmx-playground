import type { LayoutConfig } from "golden-layout";
import { writable } from "svelte/store";

type Sandbox = {
    "files": {[filename: string]: string},
    "layout": LayoutConfig,
    "type": string,
    "id": string,
}

export let sandbox = writable<Sandbox>({
    "files": {
        'main.js': 'console.log("something")',
        'index.html': '<html></html>',
    },
    "layout": {
        root: {
            type: 'stack',
            isClosable: false,
            content: [
                {
                    type: 'component',
                    title: "main.js",
                    componentType: 'Monaco',
                    componentState: {
                        "filename": "main.js"
                    },
                },
                {
                    type: 'component',
                    title: "index.html",
                    componentType: 'Monaco',
                    componentState: {
                        "filename": "index.html"
                    },
                },
                {
                    type: 'component',
                    title: "View",
                    componentType: 'Sandbox',
                    componentState: {},
                },
            ]
        }
    },
    "id": crypto.randomUUID(),
    "type": "local"
})