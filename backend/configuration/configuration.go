package configuration

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type GlobalConfiguration struct {
	Ip      string `json:"ip"`
	Port    string `json:"port"`
	Mongo   string `json:"database"`
	GinMode string `json:"gin_mode"`
}

var Params GlobalConfiguration

func Init() {

	err := godotenv.Load(ENV_PATH)

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	var configuration = GlobalConfiguration{
		Ip:      os.Getenv("IP"),
		Port:    os.Getenv("PORT"),
		Mongo:   os.Getenv("MONGO"),
		GinMode: os.Getenv("GIN_MODE"),
	}

	Params = configuration
}
