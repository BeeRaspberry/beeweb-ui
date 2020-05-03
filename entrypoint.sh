#!/usr/bin/env sh

echo "Replace Template settings"

[[ -z $PRODUCTION ]] && export PRODUCTION="true"
[[ -z $DEBUG ]] && export DEBUG="false"
[[ -z $API_URL ]] && echo "EXITING ... API_URL variable not set"; exit 9

envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js
