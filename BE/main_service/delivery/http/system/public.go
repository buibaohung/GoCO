package system

import (
	"main_service/endpoints/system"
	"main_service/util"

	"github.com/gin-gonic/gin"
)

// SetupRouter .
func SetupRouter(parrentRoute gin.IRouter, path string, endpoints system.Endpoints) {
	route := parrentRoute.Group(path)
	route.POST("/id", util.ServeHttpForGin(endpoints.NextID, &system.NextIDRequest{}))
}
