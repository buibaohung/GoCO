package facility_registration

import (
	"main_service/endpoints/admin/facility_registration"
	"main_service/model"
	"main_service/util"

	"github.com/gin-gonic/gin"
)

// SetupRouter .
func SetupRouter(parrentRoute gin.IRouter, path string, endpoints facility_registration.Endpoints) {
	route := parrentRoute.Group(path)
	route.GET("/", util.ServeHttpForGin(endpoints.GetAll, &model.FacilityRegistration{}))
	route.PUT("/:id/reject", util.ServeHTTPForGin(
		DecodeRejectFacilityRegistration,
		endpoints.Reject,
	))
	route.PUT("/:id/accept", util.ServeHTTPForGin(
		DecodeAcceptFacilityRegistration,
		endpoints.Accept,
	))
}
