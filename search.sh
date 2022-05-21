#!/usr/bin/env bash

REPO_PATH=~/repos.json
jq '.[].name' < $REPO_PATH | \
  tr -d '"'|fzf --preview "jq '.[] | select(.name == \"{}\")' < $REPO_PATH"
