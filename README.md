# tostty


```bash
go get github.com/yudai/gotty
go install github.com/yudai/gotty
docker build -t toastty .

# host via gotty
gotty -w -p 7021 --permit-arguments --title-format "TostTY - {{ .Command }} ({{ .Hostname }})" docker run -it tostty 172.34.17.339:2375
```

