package interaction

import (
	"main_service/endpoints/auth/interaction"
	"main_service/util"

	"github.com/gin-gonic/gin"
)

// SetupRouter .
func SetupRouter(parrentRoute gin.IRouter, path string, endpoints interaction.Endpoints) {
	route := parrentRoute.Group(path)

	route.POST("/views", util.ServeHTTPForGin(
		DecodeTrackViews,
		endpoints.TrackViews,
	))
	route.POST("/time-view", util.ServeHTTPForGin(
		DecodeTrackTimeView,
		endpoints.TrackTimeView,
	))
}
