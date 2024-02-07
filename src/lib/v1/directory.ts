import { writable } from "svelte/store";
import { compareSandboxLocations, type SandboxLocation } from "../location";
import { AbstractSandboxHandler, Sandbox } from './sandbox'

export function getDirectory(): SandboxLocation[] {
    return JSON.parse(<any>localStorage.getItem('directory') ?? "[]")
}

export function setDirectory(newDirectory: SandboxLocation[]) {
    localStorage.setItem('directory', JSON.stringify(newDirectory))
}

export function directoryContainsHandler(handler: AbstractSandboxHandler) {
    let directory = getDirectory()
    let sandboxLocation = handler.getLocation(null)
    directory.forEach(loc => {
        if (compareSandboxLocations(loc, sandboxLocation))
            return true
    })
    return false
}

// export function directoryContainsLocation(location: SandboxLocation) {
//     let directory = getDirectory()
//     directory.forEach(loc => {
//         if (compareSandboxLocations(loc, location))
//             return true
//     })
//     return false
// }

export function directoryDelete(handler: AbstractSandboxHandler) {
    let directory = getDirectory()
    let location = handler.getLocation(null)
    
    directory = directory.filter((loc) => !(compareSandboxLocations(loc, location)))
    
    setDirectory(directory)
}

export function directoryAdd(handler: AbstractSandboxHandler, title: string | null) {
    let directory = getDirectory()
    let location = handler.getLocation(title)
    
    directory = [
        ...directory.filter((loc) => !(compareSandboxLocations(loc, location))),
        location,
    ]

    setDirectory(directory)
}