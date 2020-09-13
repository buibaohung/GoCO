package http

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"location_service/delivery/http/location"
	"location_service/endpoints"
)

// Init .
func Init(e endpoints.Endpoints) *gin.Engine {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	corsConfig := cors.Config{
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Accept-Encoding", "Authorization", "Accept", "Cache-Control"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
		AllowOriginFunc: func(origin string) bool {
			return true
		},
	}
	r.Use(cors.New(corsConfig))

	r.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{
			"message": "Route not found huhu!",
		})
	})

	location.SetupRouter(r, "/locations", e.Location)

	return r
}
