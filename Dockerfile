FROM golang:1.7
RUN mkdir $HOME/opt
ENV GOPATH=$HOME/opt
RUN go get github.com/couchbaselabs/sequoia
RUN go get github.com/yudai/gotty
RUN go install github.com/yudai/gotty
WORKDIR $GOPATH/src/github.com/couchbaselabs/sequoia
RUN go build
COPY run.sh run.sh
EXPOSE 80
ENV PATH=$PATH:$GOPATH/bin
ENTRYPOINT ["gotty", "-w", "-p", "80", "--permit-arguments", "--title-format", "ToastTY - {{ .Command }} ({{ .Hostname }})", "./run.sh"]
