CLIENT=$1

if [ -z $CLIENT ]; then

  # fall back to json file 
  CONFIG="prod.json"
   if [ -z $PRODUCTION ]; then
      CONFIG="dev.json"
  fi
  CLIENT=$(cat "configs/$CONFIG" | grep dockerHost | awk '{print $2}' | sed -e 's/,//' -e 's/"//g')
fi

echo "Starting with docker host: $CLIENT"
echo "=========================="
gotty -w -p 7021 --timeout 0 --permit-arguments --title-format "ToastTY - {{ .Command }} ({{ .Hostname }})"  ./scripts/session.sh $CLIENT 2>&1 | tee /tmp/gotty.log
