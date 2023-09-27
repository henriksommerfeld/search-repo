#!/usr/bin/env zx
import { filePath } from './shared.mjs'
import open from 'open'

$.verbose = false
const repo = argv._[0]
if (!repo) {
  process.exit()
}

const htmlUrlString = await getRepoProperty('html_url').then((x) =>
  x.stdout.trim(),
)
if (!htmlUrlString) {
  process.exit()
}
const url = new URL(htmlUrlString)
await open(url.href)

async function getRepoProperty(prop) {
  return await $`jq '.[] | select(.name == \"${repo}\") | .${prop}'< ${filePath} | tr -d '"'`
}
