import mime from "mime";

export let iconMap: any = {
    "error": "codicon codicon-error",
    "loading": "codicon codicon-loading",
    "noData": "codicon codicon-noData",
    "expanderExpanded": "codicon codicon-chevron-down",
    "expanderCollapsed": "codicon codicon-chevron-right",
    "expanderLazy": "codicon codicon-expanderLazy",
    "checkChecked": "codicon codicon-checkChecked",
    "checkUnchecked": "codicon codicon-checkUnchecked",
    "checkUnknown": "codicon codicon-checkUnknown",
    "radioChecked": "codicon codicon-radioChecked",
    "radioUnchecked": "codicon codicon-radioUnchecked",
    "radioUnknown": "codicon codicon-radioUnknown",
    "folder": "codicon codicon-folder",
    "folderOpen": "codicon codicon-folder-opened",
    "folderLazy": "codicon codicon-folder",
    
    // languages
    "plaintext": "codicon codicon-list-flat",
    "javascript": "codicon codicon-json icon-blue",
    "html": "codicon codicon-code icon-orange",
    "css": "codicon codicon-symbol-numeric icon-blue",
    "json": "codicon codicon-json icon-yellow",
    "markdown": "codicon codicon-markdown icon-blue",

    "project": "codicon codicon-chevron-down",
}

export function getPathFilename(path: string) {
    let pathSplit = path.split('/')
    let title = pathSplit[pathSplit.length-1]
    return title
}

export function getFilenameLanguage(filename: string) {
    let language = mime.getType(filename)?.split('/')[1]
    if (!language || !iconMap[language]) language = 'plaintext'
    return language
}
