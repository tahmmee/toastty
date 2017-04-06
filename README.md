## Start a host
```bash
go get github.com/yudai/gotty
go install github.com/yudai/gotty
docker build -t toastty .

# host via gotty on port 7021
gotty -w -p 7021 --permit-arguments --title-format "ToastTY - {{ .Command }} ({{ .Hostname }})" docker run -it toastty 172.34.17.339:2375
```

## Start a client session

```bash
# defaults
http://localhost:7021/

# 6 servers with build 5.0.0-2449
http://localhost:7021/?arg=servers:6&arg=build:5.0.0-2449

# when presented with a tty - run a test!
./testrunner -i b/resources/2-nodes-template.ini  -t epengine.basic_ops.basic_ops.do_basic_ops
```

