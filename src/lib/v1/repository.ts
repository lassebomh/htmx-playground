import type { SandboxLocation } from "../location";

let builtin: SandboxLocation[] = [
    {
        method: "fetch",
        version: 'v1',
        params: {
            url: "/v1/welcome"
        },
        title: "Welcome"
    },
    {
        method: "fetch",
        version: 'v1',
        params: {
            url: "/v1/minimal"
        },
        title: "Minimal"
    },
]

