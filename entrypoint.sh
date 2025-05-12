#!/bin/sh

envsubst '${REACT_APP_API_URL}' < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.html.temp
mv /usr/share/nginx/html/index.html.temp /usr/share/nginx/html/index.html

exec "$@"
