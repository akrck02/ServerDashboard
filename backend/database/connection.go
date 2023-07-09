package database

import (
	"context"
	"time"

	"github.com/akrck02/serverdashboard/configuration"
	"github.com/akrck02/serverdashboard/log"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const MONGO_URL = "mongodb://"
const MONGO_USER = "admin"
const MONGO_PASSWORD = "p4ssw0rd"
const MONGO_PORT = "27017"

var CurrentDatabase = "editor"

func Connect() *mongo.Client {

	var host = configuration.Params.Mongo

	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	if ctx.Err() != nil {
		log.Error("Error connecting to database")
	}

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(MONGO_URL+MONGO_USER+":"+MONGO_PASSWORD+"@"+host+":"+MONGO_PORT))

	if err != nil {
		log.Fatal(err.Error())
	}

	log.FormattedInfo("Database (${0}) connected on mongodb [${1}:${2}]", CurrentDatabase, configuration.Params.Mongo, MONGO_PORT)

	return client
}

func Disconnect(client mongo.Client, ctx context.Context) {
	defer client.Disconnect(ctx)
}
