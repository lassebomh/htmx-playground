
export type SandboxLocation = {
    version: string,
    method: string,
    title: string | null,
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
    
    let title = url.searchParams.get('title')
    url.searchParams.delete('title')
    
    if (!version || !method) {
        return null
    }

    let params = Object.fromEntries(url.searchParams.entries())

    let location: SandboxLocation = {
        version,
        method,
        params,
        title: title ?? null,
    }

    return location
}
