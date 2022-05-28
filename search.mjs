#!/usr/bin/env zx
import { filePath } from './shared.mjs'

$.verbose = false
const repo = argv._[1]
const currentFolder = argv._[2]
if (!repo) {
  process.exit()
}
console.log('What do you want to do?')
console.log(` (${chalk.blue('b')}) Browse repo`)
console.log(` (${chalk.blue('c')}) Clone (using ssh)`)
console.log(` (${chalk.blue('n')}) Nothing`)
let choice = await question(
  `(${chalk.blue('b')}/${chalk.blue('c')}/${chalk.blue('N')}) `,
)
if (['b', 'B'].includes(choice)) {
  const htmlUrl = await getRepoProperty('html_url').then(
    (x) => new URL(x.stdout),
  )
  try {
    await $`open ${htmlUrl.href}`
  } catch (err) {
    console.log(htmlUrl.href)
  }
}
if (['c', 'C'].includes(choice)) {
  const sshUrl = await getRepoProperty('ssh_url').then((x) => x.stdout.trim())
  console.log(`Cloning ${sshUrl}...`)
  await $`cd ${currentFolder};  git clone ${sshUrl}`
}

async function getRepoProperty(prop) {
  return await $`jq '.[] | select(.name == \"${repo}\") | .${prop}'< ${filePath} | tr -d '"'`
}
