
## Build
```
git clone http://github.com/tahmmee/toastty
cd docker
docker build --no-cache -t toastty .
go get github.com/yudai/gotty
go install github.com/yudai/gotty
```

## Start a host
```bash
# host via gotty on port 7021
gotty -w -p 7021 --permit-arguments --title-format "ToastTY - {{ .Command }} ({{ .Hostname }})" docker run -it toastty 172.34.17.339:2375
```

## Start a client session

```bash
# open browser to the hosted url
http://localhost:7021/

# you can provide arguments... ie, 6 servers with build 5.0.0-2449
http://localhost:7021/?arg=servers:6&arg=build:5.0.0-2449

# when presented with a tty - run a test!
./testrunner -i b/resources/2-nodes-template.ini  -t epengine.basic_ops.basic_ops.do_basic_ops
```

