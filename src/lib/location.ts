
export type SandboxLocation = {
    version: string,
    method: string,
    title: string | null,
    params: {[name: string]: string}
}

export function sandboxLocationToURLParams(sl: SandboxLocation) {
    let urlparams = new URLSearchParams(Object.entries(sl.params))
    urlparams.set('m', sl.method)
    urlparams.set('p', Object.keys(sl.params).join(','))
    if (sl.title) {
        urlparams.set('t', sl.title)
    }
    return `/${sl.version}/?` + urlparams.toString()
}

export function parseSandboxLocationFromHref(href: string): SandboxLocation | null {
    let url = new URL(href)

    let version = url.pathname.split('/')[1]
    let method = url.searchParams.get('m')
    
    if (!version || !method) {
        return null
    }

    let title = url.searchParams.get('t')
    
    let params: {[key: string]: string} = {}

    let paramKeysString = url.searchParams.get('p')
    
    if (!paramKeysString) {
        return null
    }
    
    let paramKeys = paramKeysString.split(',')

    paramKeys.forEach(key => {
        params[key] = url.searchParams.get(key)!
    })

    let location: SandboxLocation = {
        version,
        method,
        params,
        title: title ?? null,
    }

    return location
}

export function compareSandboxLocations(a: SandboxLocation, b: SandboxLocation): boolean {
    if (a === b) return true

    if (a.method !== b.method) return false
    if (a.version !== b.version) return false
    
    let keys = Object.keys(a.params)

    if (keys.length !== Object.keys(b.params).length) return false

    for (let i = 0; i < keys.length; i++) {
        if (a.params[keys[i]] !== b.params[keys[i]]) return false
    }

    return true
}

export let defaultLocation: SandboxLocation = {
    method: "fetch",
    version: 'v1',
    params: {
        url: "/v1/examples/Django.json"
    },
    title: "Welcome"
}


export function setWindowLocation(sandboxLocation: SandboxLocation) {
    let href = location.origin + sandboxLocationToURLParams(sandboxLocation)
    if (sandboxLocation.title) {
        document.title = sandboxLocation.title.trim() + ' - HTMX Playground';
    }
    window.history.pushState(null, '', href);
}