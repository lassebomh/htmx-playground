<script lang="ts">
    import 'wunderbaum/dist/wunderbaum.css'

    import { onMount } from "svelte";
    import { Wunderbaum } from 'wunderbaum'
    import { getFilenameLanguage, iconMap } from '../files';
    import type { WunderbaumNode } from 'wb_node';
    import type { editor } from 'monaco-editor';

    export let initPaths: string[];
    export let rootName: string;

    let activeNode: string | null = null;
    let children: any[] = [];

    (() => {

        let childrenIdx: {[path: string]: number} = {}

        initPaths.forEach((path) => {
            path = '/' + rootName + path
            let matches = [...path.matchAll(/\//g), {index: path.length+1}]

            for (let i = 1; i < matches.length; i++) {
                let match = matches[i]
                let _path = path.substring(0, match.index!)
                
                if (childrenIdx[_path] !== undefined) continue
                
                let parentI = null;
                
                if (i > 1) {
                    let parentPath = path.substring(0, matches[i-1].index!)
                    parentI = childrenIdx[parentPath]
                }

                let title = path.substring(matches[i-1].index!+1, match.index!)
                
                let type = i == matches.length-1 ? getFilenameLanguage(title) : 'folder'

                let params: any = {
                    "title": title,
                    "type": type,
                    "icon": iconMap[type],
                }

                if (children.length == 0) {
                    params.key = '__project__'
                    params.icon = iconMap['project']
                }

                let child = [
                    parentI,
                    [],
                    params
                ]
                
                children.push(child)
                childrenIdx[_path] = children.length-1
            }
        })
    })()

    let source = {
        "_format": "flat",
        "children": children
    }

    let tree: Wunderbaum;
    let treeElement: HTMLDivElement;

    export let onPathUpdate: any;
    export let onFileActive: any;
    export let onFileDelete: any;
    export let onFileCreate: any;
    export let onProjectRename: any;

    export function activateFile(path: string) {
        let node = tree.findFirst((node: WunderbaumNode) => {
            return `${getNodeDirectory(node)}/${node.title}` == path
        })
        if (node != null) {
            node.setActive(true)
        } else {
            throw new Error("Couldn't find node!")
        }
    }

    function getNodeDirectory(node: WunderbaumNode): string {
        let parent = node.parent;
        let title = '';
        while (parent && parent.key !== '__root__' && parent.key !== '__project__') {
            title = "/" + parent.title + title;
            parent = parent.parent;
        }
        return title
    }

    function getChildPaths(children: WunderbaumNode[] | null, titlePrefix: string = ''): string[] {
        let childrenPaths: string[] = [];
        if (children == null || children.length == 0) {
            return childrenPaths
        }

        for (const child of children) {
            
            const childPath = `${titlePrefix}/${child.title}`;
            
            childrenPaths.push(childPath);
            
            if (child.children && child.children.length) {
                const subChildrenPaths = getChildPaths(child.children, childPath);
                childrenPaths = childrenPaths.concat(subChildrenPaths);
            }
        }
        return childrenPaths;
    }

    async function deleteNode(nodeKey: string) {
        let node = tree.findKey(nodeKey)!
        let path = `${getNodeDirectory(node)}/${node.title}`
        
        // tree.activeNode = null;
        activeNode = null;

        node.remove()

        if (node.type != 'folder') {
            onFileDelete(path)
        }
    }

    function createNode(folder: boolean) {
        let parent: WunderbaumNode;
        
        if (activeNode != null) {
            parent = tree.findKey(activeNode)!
            if (parent.type != 'folder') {
                parent = parent.parent;
            }
            parent.setExpanded(true)
        } else {
            parent = tree.findKey("__project__")!
        }

        let title;
        let type;

        if (folder) {
            title = 'New Folder'
            type = 'folder'
        } else {
            let parentDir = getNodeDirectory(parent)
            if (parent.key != '__root__') {
                parentDir += '/' + parent.title
            }
            [title, type] = onFileCreate(parentDir)
        }
        
        let node = parent.addNode({title, type, icon: iconMap[type]}, 'appendChild')
    }

    function clickOutside(e: any) {
        if (!e.target.classList.contains('wb-list-container')) {
            return
        }
        // tree.activeNode = null;
        if (activeNode != null) {
            let node = tree.findKey(activeNode)
            node?.setActive(false)
            activeNode = null;
        }
    }

    onMount(async () => {
        tree = new Wunderbaum({
            element: treeElement,
            source: <any>source,
            iconMap: iconMap,
            debugLevel: 2,
            edit: {
                trigger: ["F2", "clickActive"],
                trim: true,
                slowClickDelay: 600,
                apply: async (e: any) => {
                    if (e.node.key == '__project__') {
                        onProjectRename(e.oldValue, e.newValue)
                        return
                    }

                    if (e.node.type != 'folder') {
                        let type = getFilenameLanguage(e.newValue);
                        let icon = iconMap[type];
                        e.node.type = type;
                        e.node.icon = icon;
                    }

                    let nodeDir = getNodeDirectory(e.node)
                    let oldPath = `${nodeDir}/${e.oldValue}`
                    let newPath = `${nodeDir}/${e.newValue}`

                    let newPaths = getChildPaths(e.node.children, newPath)

                    let diffMap: {[path: string]: string} = {}
                    if (e.node.type != 'folder') {
                        diffMap[oldPath] = newPath
                    }

                    getChildPaths(e.node.children, oldPath).forEach((v,i) => {
                        diffMap[v] = newPaths[i]
                    });

                    onPathUpdate(diffMap)
                },
            },
            minExpandLevel: 1,
            beforeActivate: (e) => {
                if (e.node.type != 'folder' && e.node.key != '__project__') {
                    onFileActive(`${getNodeDirectory(e.node)}/${e.node.title}`)
                }
                activeNode = e.node.key;
            },
            dnd: {
                guessDropEffect: true,
                dragStart: (e) => {
                    return e.node.key != '__project__';
                },
                dragEnter: (e): any => {
                    if (e.node.key == '__project__') {
                        return ['over']
                    }
                    
                    return ["before", "over", "after"];
                },

                drop: (e) => {
                    let oldPath = `${getNodeDirectory(e.sourceNode)}/${e.sourceNode.title}`

                    let dropModeIsChild = e.suggestedDropMode == 'appendChild' || e.suggestedDropMode == 'prependChild'

                    let dropMode = e.node.type != 'folder' && dropModeIsChild ? 'before' : e.suggestedDropMode

                    e.sourceNode.moveTo(e.node, dropMode)
                    e.node.update()
                    e.sourceNode.update()

                    let newPath = `${getNodeDirectory(e.node)}/${e.node.type == 'folder' ? e.node.title + "/" : ""}${e.sourceNode.title}`

                    let newPaths = getChildPaths(e.sourceNode.children, newPath)

                    let diffMap: {[path: string]: string} = {}
                    
                    if (e.sourceNode.type != 'folder') {
                        diffMap[oldPath] = newPath
                    }

                    getChildPaths(e.sourceNode.children, oldPath).forEach((v,i) => {
                        diffMap[v] = newPaths[i]
                    })

                    onPathUpdate(diffMap)
                },
            },
        })
        
        await tree.ready
    })

</script>

<main>
    <div class="explorer-titlebar">
        <div class="explorer-buttons">
            <button class="icon-button" on:click={_ => createNode(false)}>
                <i class="codicon codicon-new-file"></i>
            </button>
            <button class="icon-button" on:click={_ => createNode(true)}>
                <i class="codicon codicon-new-folder"></i>
            </button>
            <button class="icon-button"
                    disabled={activeNode == null || activeNode == '__project__'}
                    on:click={() => {if (activeNode) deleteNode(activeNode)}}>
                <i class="codicon codicon-trash"></i>
            </button>
        </div>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div bind:this={treeElement} on:click={clickOutside} class="wunderbaum wb-skeleton wb-initializing">
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        background-color: #1e1e1e;
    }

    .explorer-titlebar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 8px;
        height: 38px;
        flex-shrink: 0;
        background-color: #252526;
    }

    .explorer-title {
        color: #888;
        font-size: 14px;
    }

    .explorer-buttons {
        display: flex;
        font-size: 18px;
        justify-content: center;
        gap: 4px;
    }

    div.wunderbaum:focus {
        --wb-active-color: #03395e;
        --wb-active-cell-color: #7dc6e9;
        --wb-active-border-color: #007fd4;
        --wb-active-hover-color: #03395e;
        --wb-active-hover-border-color: #007fd4;
        --wb-active-column-color: #f7fcfe;
        --wb-active-header-column-color: #c5c5c5;
        --wb-active-color-grayscale: #03395e;
        --wb-active-border-color-grayscale: #007fd4;
        --wb-active-hover-color-grayscale: #03395e;
        --wb-active-cell-color-grayscale: #b3b3b3;
    }

    div.wunderbaum {
        padding: 0 0;
        outline: none;
        border: none;
        overflow-y: hidden;
        overflow-x: hidden;
        flex-grow: 1;
        border-radius: 0;

        --wb-font-stack: inherit;
        --wb-error-color: #b5373b;
        --wb-node-text-color: #fffa;
        --wb-border-color: transparent;
        --wb-bg-highlight-color: #26a0da;
        --wb-header-color: #dedede;
        --wb-background-color: transparent;
        --wb-alternate-row-color: #f7f7f7;
        --wb-alternate-row-color-hover: #f3f3f3;
        --wb-focus-border-color: transparent;
        --wb-drop-source-color: #fff3;
        --wb-drop-target-color: #fff3;
        --wb-dim-color: #8c877c;
        --wb-error-background-color: #f5ddde;
        --wb-hover-color: #fff1;
        --wb-hover-border-color: #f7fcfe;
        --wb-grid-color: #dedede;
        
        --wb-active-color: #37373D;
        --wb-active-cell-color: #37373D;
        --wb-active-border-color: #37373D;
        --wb-active-hover-color: #37373D;
        --wb-active-hover-border-color: #37373D;
        --wb-active-column-color: #37373D;
        --wb-active-header-column-color: #37373D;
        --wb-active-color-grayscale: #37373D;
        --wb-active-border-color-grayscale: #37373D;
        --wb-active-hover-color-grayscale: #37373D;
        --wb-active-cell-color-grayscale: #37373D;

        --wb-grid-color-grayscale: #dedede;
        --wb-filter-dim-color: #dedede;
        --wb-filter-submatch-color: #868581;

        --wb-row-outer-height: 22px;
        --wb-row-inner-height: 22px;
        --wb-row-padding-y: 1px;
        --wb-col-padding-x: 2px;
        --wb-icon-outer-height: 22px;
        --wb-icon-outer-width: 22px;
        --wb-icon-height: 16px;
        --wb-icon-width: 16px;
        --wb-icon-padding-y: 2px;
        --wb-icon-padding-x: 2px;
        --wb-header-height: 22px;

    }
</style>