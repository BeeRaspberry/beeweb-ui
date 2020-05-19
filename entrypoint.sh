set -x
echo "Replace Template settings"

if test -z "$PRODUCTION"; then
  PRODUCTION="true"
fi
export PRODUCTION=$PRODUCTION

if test -z "$DEBUG"; then
  DEBUG="false"
fi

if test -z "$PORT"; then
  PORT="80"
fi
export PORT=$PORT

if test -z "$DOMAIN_NAME"; then
  DOMAIN_NAME="localhost"
fi
export DOMAIN_NAME=$DOMAIN_NAME

if test -z "$SERVICE_NAME"; then
  echo "EXITING ... SERVICE_NAME variable not set"
  exit 6
fi

export DEBUG
export SERVICE_NAME=$SERVICE_NAME

REPLACE_VARS='$SERVICE_NAME:$DOMAIN_NAME:$PORT'

echo "Replace VARS"
envsubst '${SERVICE_NAME},${DOMAIN_NAME},${PORT}' < ./nginx-template.conf > /etc/nginx/conf.d/default.conf

cat /etc/nginx/conf.d/default.conf

echo "entrypoint done"