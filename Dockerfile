FROM golang:1.7
RUN mkdir $HOME/opt
ENV GOPATH=$HOME/opt
RUN go get github.com/couchbaselabs/sequoia
WORKDIR $GOPATH/src/github.com/couchbaselabs/sequoia
RUN go build
EXPOSE 80
ENV PATH=$PATH:$GOPATH/bin

#Docker client
RUN apt-get update 
RUN apt-get install -y \
     apt-transport-https \
     ca-certificates \
     curl \
     software-properties-common
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
RUN add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"
RUN apt-get update 
RUN apt-get install -y docker-ce

COPY run.sh run.sh
ENTRYPOINT ["./run.sh"]
