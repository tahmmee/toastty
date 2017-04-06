# toastty

```bash
go get github.com/yudai/gotty
go install github.com/yudai/gotty
docker build -t toastty .

# host via gotty
gotty -w -p 7021 --permit-arguments --title-format "ToastTY - {{ .Command }} ({{ .Hostname }})" docker run -it toastty 172.34.17.339:2375
```

