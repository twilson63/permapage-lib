import base64 from 'base64-js'
import pako from 'pako'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeDocument from 'rehype-document'
import rehypeExtractMeta from 'rehype-extract-meta'
import rehypeParse from 'rehype-parse'
import { select } from 'hast-util-select'
import { toString } from 'hast-util-to-string'

import { path } from 'ramda'

export default Object.freeze({
  init: function () {
    return {
      /**
       * @param {any} page
       */
      generateHTML: async (page) => {
        const _src = base64.fromByteArray(pako.deflate(JSON.stringify(page)))
        return await unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkRehype)
          .use(rehypeDocument, { title: page.title, meta: [{ name: 'source', content: _src }] })
          .use(rehypeStringify)
          .process(page.content)
          .then(String)

      },
      /**
       * @param {string} html
       */
      extractModel: async (html) => {
        return await unified()
          .use(rehypeParse)
          .use(getSource)
          .use(rehypeStringify)
          .process(html)
          .then(path(['data', 'source']))
          .then(base64.toByteArray)
          .then(a => pako.inflate(a, { to: 'string' }))
          .then(JSON.parse)
      }
    }
  }
})

function getSource() {
  return function (tree, file) {
    const x = select('meta[name="source"]', tree)

    file.data.source = x.properties.content
  }
}
