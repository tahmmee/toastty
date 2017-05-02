#!/bin/bash
CLIENT=$1

cleanup_session() {
	session=$1

	# kill session
	tmux kill-session -t $session 2>/dev/null || true

	# get testrunner id
	testrunner_id=$(docker logs $session | grep  exec | awk '{print $6}' | head -1)

	# cleanup toastty
	docker rm -fv $session 2>/dev/null

	if [ -z "$testrunner_id" ]; then
		echo "no testrunner tty"
		exit 0
	fi

	# cleanup linked containers
	docker -H $CLIENT inspect $testrunner_id | jq .[0].HostConfig.Links | grep couchbase | awk -F ":" '{print $1}' | sed 's/.*"\///' | xargs -I '{}' docker -H $CLIENT rm -fv  '{}'

	# cleanup testrunner
	docker -H $CLIENT rm -fv $testrunner_id
}

# clean up by ports that no longet have established connections 
ports=$(grep "running for client" /tmp/gotty.log  | sed 's/.*\]://' | awk '{print $1}')
for port in $( echo $ports ); do

	is_connected=$(netstat -n | grep 7021 | grep $port)

	if [ -z "$is_connected" ]; then # may be dangling connection

		# get session
		pid=$(grep $port /tmp/gotty.log  | grep PID | sed 's/.*PID//' | awk '{print $1}')
		session=$(cat /tmp/$pid)

		# cleanup if tmux session exists
		tmux ls | grep $session && cleanup_session $session
	fi

done


# clean up by ports that are in close state
ports=$( netstat -n | grep 7021 | grep CLOSE_WAIT | awk '{print $5}' | sed 's/.*\.//')
for port in $( echo $ports ); do

	pid=$(grep $port /tmp/gotty.log  | grep PID | sed 's/.*PID//' | awk '{print $1}')
	session=$(cat /tmp/$pid)
	cleanup_session $session

	# look for in logs 
	#session=$(grep $port /tmp/gotty.log | grep session | head -1 | sed 's/.*session://' | sed 's/".*//')
	#if [ -z "$session" ]; then
	#	exit 0 # no session
	#fi
done


# cleanup any remaining session in detached mode 
sessions=$(tmux ls | grep -v attached | awk '{print $1}' | sed 's/://')
for session in $( echo $sessions ); do
	 cleanup_session $session
done 
