
import { Router } from 'https://www.unpkg.com/tiny-request-router@1.2.2/dist/router.browser.mjs';

export function sleep(delay) { return new Promise((resolve) => setTimeout(resolve, delay))}

function fixFilename(filename) {
    if (filename.startsWith('./')) {
        filename = filename.substring(1)
    } else if (filename.length > 0 && filename[0] != '/') {
        filename = '/' + filename
    }
    return filename
}

export function readFile(filename) {
    return window.files[fixFilename(filename)]
}

let TemplateLoader = {
    getSource: (filename) => {
        filename = fixFilename(filename)
        let contents = readFile(filename)

        if (contents === undefined) {
            let templatesFilename = '/templates' + filename
            let templatesContents = readFile(templatesFilename)

            if (templatesContents !== undefined) {
                filename = templatesFilename
                contents = templatesContents
            } else {
                throw new Error(`No template found in ${filename} or ${templatesFilename}.`)
            }
        }
        return {
            src: readFile(filename),
            path: filename
        }
    }
}

var templates = new nunjucks.Environment(TemplateLoader, {autoescape: false})

export function render(request, filename, context, headers) {
    
    let templateOutput = templates.render(filename, {
        request: request,
        ...context
    });
    
    return new Response(templateOutput, {
        status: 200,
        headers: {
            'Content-Type': mime.getType(filename),
            ...(headers || {})
        }
    })
}

export var router = new Router();

router.listen = () => {
    window.requestHandler = async (request) => {
        const url = new URL(request.url);
        const match = router.match(request.method, url.pathname)

        if (match == null) {

            let publicFileContents = readFile('/public' + url.pathname)

            if (publicFileContents !== undefined) {
                return new Response(publicFileContents, {
                    status: 200,
                    headers: {
                        'Content-Type': mime.getType(url.pathname),
                    }
                })
            }

            console.warn('No handler was found for', url.pathname)
            
            return new Response(null, {status: 404});
        }

        try {
            return await match.handler(request, match.params)
        } catch (error) {
            console.error(error)
            return new Response(null, {status: 500});
        }
    }
}