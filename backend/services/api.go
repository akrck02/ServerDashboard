package services

import (
	"fmt"

	"github.com/akrck02/serverdashboard/configuration"
	"github.com/akrck02/serverdashboard/log"
	"github.com/akrck02/serverdashboard/utils"
	"github.com/gin-gonic/gin"
)

const API_PATH = "api"
const VERSION = "v1"
const API_COMPLETE = "/" + API_PATH + "/" + VERSION + "/"

type Endpoint struct {
	Path     string               `json:"path"`
	Method   int                  `json:"method"`
	Listener func(c *gin.Context) `json:"listener"`
	Secured  bool                 `json:"secured"`
}

var endpoints = []Endpoint{
	{"get/services", utils.HTTP_METHOD_GET, GetServicesHttp, false},
	{"add/service", utils.HTTP_METHOD_POST, AddServiceHttp, false},
	{"remove/service", utils.HTTP_METHOD_POST, RemoveServiceHttp, false},
	{"update/service", utils.HTTP_METHOD_POST, UpdateServiceHttp, false},
}

func Start() {

	router := gin.Default()
	router.Use(CORSMiddleware())
	registerEndpoints(router)
	state := router.Run(configuration.Params.Ip + ":" + configuration.Params.Port)
	fmt.Println(state)

}

func registerEndpoints(router *gin.Engine) {

	for _, endpoint := range endpoints {
		switch endpoint.Method {
		case utils.HTTP_METHOD_GET:
			router.GET(API_COMPLETE+endpoint.Path, endpoint.Listener)
		case utils.HTTP_METHOD_POST:
			router.POST(API_COMPLETE+endpoint.Path, endpoint.Listener)
		}

		log.FormattedInfo("Endpoint registered --> ${0} ", endpoint.Path)
	}
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
