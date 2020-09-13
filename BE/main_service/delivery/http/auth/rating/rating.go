package rating

import (
	"main_service/endpoints/auth/rating"
	"main_service/util"

	"github.com/gin-gonic/gin"
)

// SetupRouter .
func SetupRouter(parrentRoute gin.IRouter, path string, endpoints rating.Endpoints) {
	route := parrentRoute.Group(path)

	route.POST("", util.ServeHTTPForGin(
		DecodeCreateRating,
		endpoints.CreateRating,
	))
	route.DELETE("/:id", util.ServeHTTPForGin(
		DecodeDeleteRating,
		endpoints.DeleteRating,
	))
}
