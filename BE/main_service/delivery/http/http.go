package http

import (
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"main_service/delivery/http/admin"
	"main_service/delivery/http/auth"
	"main_service/delivery/http/authentication"
	"main_service/delivery/http/public"
	"main_service/delivery/http/system"
	"main_service/endpoints"
	"main_service/util"
)

// NewServer .
func NewServer(e endpoints.Endpoints) error {
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

	authentication.SetupRouter(r, "/authentication", e.Authentication)
	auth.SetupRouter(r, "/auth", e.Auth, e.AuthMiddlewares)
	admin.SetupRouter(r, "/admin", e.Admin, e.AdminMiddlewares)
	public.SetupRouter(r, "/public", e.Public)
	system.SetupRouter(r, "/system", e.System)

	port := util.GetEnv("HTTP_PORT", "3000")
	return r.Run(":" + port)
}
