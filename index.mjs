#!/usr/bin/env zx

$.verbose = false;
const batchSize = 2;
let moreToFetch = true;
let page = 1;
const repos = new Array();

// await Promise.all([$`sleep 1; echo 1`, $`sleep 2; echo 2`, $`sleep 3; echo 3`]);
// await $`echo ''>~/repos.json`;
// const repos = await $`gh api '/user/repos?per_page=1&page=1' | jq '.[]'`;
// console.log(repos);
// const branch = await $`git branch --show-current`;
// console.log(`Current branch: ${branch.stdout}`);

// const promise = $`gh api '/user/repos?per_page=2&page=1'`
//   .pipe($`jq .`)
//   .then(JSON.parse);
//
// const promise2 = $`gh api '/user/repos?per_page=2&page=2'`
//   .pipe($`jq .`)
//   .then(JSON.parse);
//
// const repos = await Promise.all([promise, promise2]);
// console.log(repos);
//
// const mappedRepos = repos.flat().map((x) => ({
//   id: x.id,
//   name: x.name,
//   html_url: x.html_url,
//   description: x.description,
//   ssh_url: x.ssh_url,
// }));
//
// console.log(mappedRepos);
