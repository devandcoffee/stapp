FROM golang

ENV GO111MODULE=on

WORKDIR /go/src/github.com/devandcoffee/stapp/server

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build