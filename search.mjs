#!/usr/bin/env zx
import { filePath } from './shared.mjs'
import open from 'open'

$.verbose = false
const repo = argv._[1]
const currentFolder = argv._[2]
if (!repo) {
  process.exit()
}
console.log('What do you want to do?')
console.log(` (${chalk.blue('o')}) Open repo in web browser`)
console.log(` (${chalk.blue('c')}) Clone (using ssh)`)
console.log(` (${chalk.blue('n')}) Nothing`)
let choice = await question(
  `(${chalk.blue('o')}/${chalk.blue('c')}/${chalk.blue('N')}) `,
)
if (['o', 'O'].includes(choice)) {
  const htmlUrl = await getRepoProperty('html_url').then(
    (x) => new URL(x.stdout),
  )
  await open(htmlUrl.href)
}
if (['c', 'C'].includes(choice)) {
  const sshUrl = await getRepoProperty('ssh_url').then((x) => x.stdout.trim())
  console.log(`Cloning ${sshUrl}...`)
  await $`cd ${currentFolder};  git clone ${sshUrl}`
}

async function getRepoProperty(prop) {
  return await $`jq '.[] | select(.name == \"${repo}\") | .${prop}'< ${filePath} | tr -d '"'`
}
