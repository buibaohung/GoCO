package location

import (
	"github.com/gin-gonic/gin"

	"location_service/endpoints/location"
	"location_service/util"
)

// SetupRouter .
func SetupRouter(parrentRoute gin.IRouter, path string, endpoints location.Endpoints) {
	route := parrentRoute.Group(path)
	route.GET("", util.ServeHTTPForGin(
		DecodeGetLocations,
		endpoints.GetLocations,
	))

	route.GET("/:code", util.ServeHTTPForGin(
		DecodeGetLocationByCode,
		endpoints.GetLocationByCode,
	))
}
