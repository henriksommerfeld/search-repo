#!/usr/bin/env zx
import { chalk } from 'zx';
import { filePath } from './shared.mjs';

$.verbose = false;
const repo = argv._[1];
console.log('What do you want to do?');
console.log(` (${chalk.blue('b')}) Browse repo on github.com `);
console.log(` (${chalk.blue('c')}) Clone (using ssh)`);
console.log(` (${chalk.blue('n')}) Nothing`);
let choice = await question(
  `(${chalk.blue('b')}/${chalk.blue('c')}/${chalk.blue('N')}) `
);
if (['b', 'B'].includes(choice)) {
  const htmlUrl = await getRepoProperty('html_url').then(
    x => new URL(x.stdout)
  );
  await $`open ${htmlUrl.href}`;
}
if (['c', 'C'].includes(choice)) {
  const sshUrl = await getRepoProperty('ssh_url').then(x => x.stdout.trim());
  await $`git clone ${sshUrl}`;
}

async function getRepoProperty(prop) {
  return await $`jq '.[] | select(.name == \"${repo}\") | .${prop}'< ${filePath} | tr -d '"'`;
}
