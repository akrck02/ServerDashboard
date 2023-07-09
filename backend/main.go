package main

import (
	"runtime"
	"strings"

	"github.com/akrck02/serverdashboard/configuration"
	"github.com/akrck02/serverdashboard/services"
	"github.com/gin-gonic/gin"
)

func main() {

	var _, current_execution_dir, _, _ = runtime.Caller(0)
	var BASE_PATH = current_execution_dir
	configuration.SetBasePath(BASE_PATH)

	// substract the last 1 directories
	BASE_PATH = BASE_PATH[:strings.LastIndex(BASE_PATH, "/")] + "/"

	configuration.SetBasePath(BASE_PATH)
	configuration.Init()

	gin.SetMode(configuration.Params.GinMode)
	services.Start()

}
