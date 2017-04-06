#!/bin/bash

# parse num servers
DEFAULT_NUM_SERVERS=4
NUM_SERVERS_ARG=`echo $* | grep "servers:" | sed 's/.*servers:\([0-9]*\).*/\1/'`
NUM_SERVERS=${NUM_SERVERS_ARG:-$DEFAULT_NUM_SERVERS}

# parse build 
DEFAULT_BUILD=5.0.0-2488
BUILD_ARG=`echo $* | grep "build:"  |  sed 's/.*build:\(.*\?\)/\1/' | awk '{print $1}'`
BUILD=${BUILD_ARG:-$DEFAULT_BUILD}

echo Servers: $NUM_SERVERS, Build: $BUILD
echo "=================================="

TEMPLATE="$NUM_SERVERS-nodes-template.ini"
if [ "$NUM_SERVERS" -le "1" ]; then
  TEMPLATE="1-node-template.ini"
fi
if [ "$NUM_SERVERS" -gt "8" ]; then
  echo "WARNING: Max servers is 8"
  TEMPLATE="8-nodes-template.ini"
fi

sed -i "s/build:.*/build: $BUILD/" providers/docker/options.yml
sed -i -e "s/memory:.*/memory: 8000000000/" providers/docker/options.yml

./sequoia testrunner -client $1 -command  "-i b/resources/$TEMPLATE -t tty" --exec
