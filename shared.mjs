#!/usr/bin/env zx

export const filePath = `${os.homedir()}/repos.json`

const getProp = (repo, prop) =>
  $`jq '.[] | select(.name == \"${repo}\") | .${prop}'< ${filePath} | tr -d '"'`

export const getRepoProperty = (repo, prop) =>
  getProp(repo, prop).then((x) => x.stdout.trim())
