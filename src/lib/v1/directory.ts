import { writable } from "svelte/store";
import { compareSandboxLocations, type SandboxLocation } from "../location";
import { AbstractSandboxHandler, Sandbox } from './sandbox'

type DirectoryEntry = SandboxLocation & {title: string | null}

export function getDirectory(): DirectoryEntry[] {
    return JSON.parse(<any>localStorage.getItem('directory') ?? "[]")
}

export function setDirectory(newDirectory: DirectoryEntry[]) {
    localStorage.setItem('directory', JSON.stringify(newDirectory))
}

export function directoryContainsHandler(handler: AbstractSandboxHandler) {
    let directory = getDirectory()
    let sandboxLocation = handler.getLocation()
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
    let location = handler.getLocation()
    
    directory = directory.filter((loc) => !(compareSandboxLocations(loc, location)))
    
    setDirectory(directory)
}

export function directoryAdd(handler: AbstractSandboxHandler, title: string | null) {
    let directory = getDirectory()
    let location = handler.getLocation()
    
    directory = [
        ...directory.filter((loc) => !(compareSandboxLocations(loc, location))),
        {
            ...location,
            title: title,
        },
    ]

    setDirectory(directory)
}