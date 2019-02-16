package main

import (
	"github.com/devandcoffee/stapp/server/app"
	"github.com/devandcoffee/stapp/server/config"
)

func main() {
	config := config.GetConfig()

	app := &app.App{}
	app.Initialize(config)
	app.Run(":8080")
}
