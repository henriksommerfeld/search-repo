#!/usr/bin/env bash

REPO_PATH=~/repos.json
jq '.[].name' <$REPO_PATH |
	tr -d '"' | fzf --preview "jq -r '.[] | select(.name == \"{}\") | to_entries|map(\"\(.key)=\(.value|tostring)\")|.[]' < $REPO_PATH | bat --style=plain --color=always --language=DotEnv"
