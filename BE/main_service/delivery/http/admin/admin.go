package admin

import (
	"main_service/delivery/http/admin/facility_registration"
	"main_service/endpoints/admin"

	"github.com/gin-gonic/gin"
)

// SetupRouter .
func SetupRouter(parrentRoute gin.IRouter, path string, endpoints admin.Endpoints, middlewares admin.Middlewares) {
	route := parrentRoute.Group(path)
	route.Use(middlewares.Auth)

	facility_registration.SetupRouter(route, "/facility-registration", endpoints.FacilityRegistration)
}
