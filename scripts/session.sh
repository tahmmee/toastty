#!/bin/bash


DEFAULT_SESSION=$(openssl rand -hex 12)
EX_ARGS=""
SESSION_ARG=`echo $* | grep "session:"  |  sed 's/.*session://' |  sed 's/-/_tty_/'`
if [ -z "$SESSION_ARG" ]; then
  EX_ARGS=" session:$DEFAULT_SESSION"
fi

SESSION=${SESSION_ARG:-$DEFAULT_SESSION}

echo $SESSION > /tmp/$$
tmux detach -s $SESSION 2> /dev/null || true
tmux new -A -s $SESSION docker run --name $SESSION -it toastty 52.207.212.163:2375  $*" $EX_ARGS"
