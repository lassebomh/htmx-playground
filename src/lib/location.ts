
export type SandboxLocation = {
    version: string,
    method: string,
    params: {[name: string]: string}
}

export function sandboxLocationToURLParams(sl: SandboxLocation) {
    let urlparams = new URLSearchParams(Object.entries(sl.params))
    urlparams.set('method', sl.method)
    return `/${sl.version}/?` + urlparams.toString()
}

export function parseSandboxLocationFromHref(href: string): SandboxLocation | null {
    let url = new URL(href)

    let version = url.pathname.split('/')[1]

    let method = url.searchParams.get('method')
    url.searchParams.delete('method')
    
    if (!version || !method) {
        return null
    }

    let params = Object.fromEntries(url.searchParams.entries())

    let location: SandboxLocation = {
        version,
        method,
        params,            
    }

    return location
}
