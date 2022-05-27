# Search Repository

This repository contains glue code for finding repositories on GitHub that you or your organisation owns. In short, it does the following:

1. Downloads metadata of all the repositories on GitHub associated with your account and saves a subset of the properties into ~/repos.json
2. Provies a way of searching that local file to quickly find a repo for cloning or opening the asociated web page.

## Dependencies

- [BASH](<https://en.wikipedia.org/wiki/Bash_(Unix_shell)>)
- [🐚 zx](https://github.com/google/zx)
- [GitHub CLI](https://cli.github.com/)
- [fzf](https://github.com/junegunn/fzf)
- [jq](https://stedolan.github.io/jq/)

## Installation

1. `npm install`
2. Add aliases for invoking the npm scripts in this repo. I have the following in my `~/.zshrc`:

```
alias repo="npm run search --prefix ~/code/search-repo"
alias refresh-repo="npm run refresh --prefix ~/code/search-repo"
```

## Usage

There are two commands to run, one that fetches the repos' metadata and one that does the search. Having the aliases above loaded:

### Refreshing the local index

`$ refresh-repo`

### Searching

`$ repo`