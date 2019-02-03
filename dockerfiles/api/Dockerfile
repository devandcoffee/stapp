FROM golang

ENV GO111MODULE=on

WORKDIR /go/src/github.com/devandcoffee/stapp

COPY . .

ENV CGO_ENABLED=0

RUN go mod download