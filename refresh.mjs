#!/usr/bin/env zx
import { filePath } from './shared.mjs';

$.verbose = false;

console.log(chalk.blue('Fetching repos...'));

const repos = new Array();

for (let i = 1; true; i++) {
  const reposInPage = await $`gh api '/user/repos?per_page=100&page=${i}'`
    .pipe($`jq .`)
    .then(JSON.parse);

  repos.push(reposInPage);

  if (reposInPage.length < 1) {
    break;
  }
}

const mappedRepos = repos.flat().map(x => ({
  id: x.id,
  name: x.name,
  html_url: x.html_url,
  description: x.description,
  ssh_url: x.ssh_url,
}));

fs.ensureFileSync(filePath);
fs.writeJsonSync(filePath, mappedRepos);
console.log(
  chalk.green(`${mappedRepos.length} repos now in index ${filePath}`)
);
