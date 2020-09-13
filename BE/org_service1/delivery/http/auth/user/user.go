package user

import (
	"org_service/endpoints/auth/user"
	"org_service/util"

	"github.com/gin-gonic/gin"
)

// SetupRouter .
func SetupRouter(parrentRoute gin.IRouter, path string, endpoints user.Endpoints) {
	route := parrentRoute.Group(path)

	route.POST("", util.ServeHTTPForGin(
		DecodeCreateUser,
		endpoints.CreateUser,
	))
	route.GET("", util.ServeHTTPForGin(
		DecodeGetUsers,
		endpoints.GetUsers,
	))
	route.GET("/:id", util.ServeHTTPForGin(
		DecodeGetUserByID,
		endpoints.GetUserByID,
	))
	route.PUT("/:id", util.ServeHTTPForGin(
		DecodeUpdateUser,
		endpoints.UpdateUser,
	))
	route.DELETE("/:id", util.ServeHTTPForGin(
		DecodeDeleteUser,
		endpoints.DeleteUser,
	))
}
