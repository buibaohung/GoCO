package profile

import (
	"main_service/endpoints/auth/profile"
	"main_service/util"

	"github.com/gin-gonic/gin"
)

// SetupRouter .
func SetupRouter(parrentRoute gin.IRouter, path string, endpoints profile.Endpoints) {
	route := parrentRoute.Group(path)

	route.GET("", util.ServeHTTPForGin(
		DecodeGetProfile,
		endpoints.GetProfile,
	))
	route.PUT("", util.ServeHTTPForGin(
		DecodeUpdateProfile,
		endpoints.UpdateProfile,
	))
}
