CLIENT=$1
if [ -z $CLIENT ]; then
  echo "usage: ./gotty.sh <docker_host:port>"
  exit -1
fi
gotty -w -p 7021 --timeout 0 --permit-arguments --title-format "ToastTY - {{ .Command }} ({{ .Hostname }})"  ./scripts/session.sh $CLIENT 2>&1 | tee /tmp/gotty.log
