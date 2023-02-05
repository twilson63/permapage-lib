import { test } from 'uvu'
import * as assert from 'uvu/assert'
import fs from 'fs'
import Pages from '../src/index.js'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const _page = JSON.parse(fs.readFileSync(__dirname + '/page.json', 'utf-8'))

const pages = Pages.init({})

test('generate html', async () => {
  const html = await pages.generateHTML(_page)
  const output = await pages.extractModel(html)

  assert.equal(output.title, 'Permapage format v3')

})

test.run()