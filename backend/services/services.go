package services

import (
	"github.com/akrck02/serverdashboard/database"
	"github.com/akrck02/serverdashboard/models"
	"github.com/gin-gonic/gin"
)

func GetServicesHttp(c *gin.Context) {

	services := []models.Service{}
	conn := database.Connect()
	collection := conn.Database(database.CurrentDatabase).Collection("services")
	cursor, err := collection.Find(c, gin.H{})

	if err != nil {
		c.JSON(500, gin.H{
			"message": "Error getting services: " + err.Error(),
		})
		return
	}

	for cursor.Next(c) {
		var service models.Service
		cursor.Decode(&service)
		services = append(services, service)
	}

	defer cursor.Close(c)
	defer database.Disconnect(*conn, c)

	c.JSON(200, gin.H{
		"services": services,
	})

}

func AddServiceHttp(c *gin.Context) {

	var service models.Service
	c.BindJSON(&service)

	conn := database.Connect()
	collection := conn.Database(database.CurrentDatabase).Collection("services")
	_, err := collection.InsertOne(c, service)

	if err != nil {
		c.JSON(500, gin.H{
			"message": "Error adding service: " + err.Error(),
		})
		return
	}

	defer database.Disconnect(*conn, c)

	c.JSON(200, gin.H{
		"message": "Service added",
	})

}

func RemoveServiceHttp(c *gin.Context) {

	var service models.Service
	c.BindJSON(&service)

	conn := database.Connect()
	collection := conn.Database(database.CurrentDatabase).Collection("services")
	_, err := collection.DeleteOne(c, service)

	if err != nil {
		c.JSON(500, gin.H{
			"message": "Error removing service: " + err.Error(),
		})
		return
	}

	defer database.Disconnect(*conn, c)

	c.JSON(200, gin.H{
		"message": "Service removed",
	})

}

func UpdateServiceHttp(c *gin.Context) {

	var service models.Service
	c.BindJSON(&service)

	conn := database.Connect()
	collection := conn.Database(database.CurrentDatabase).Collection("services")
	_, err := collection.UpdateOne(c, gin.H{"name": service.Name}, gin.H{"$set": service})

	if err != nil {
		c.JSON(500, gin.H{
			"message": "Error updating service: " + err.Error(),
		})
		return
	}

	defer database.Disconnect(*conn, c)

	c.JSON(200, gin.H{
		"message": "Service updated",
	})

}
