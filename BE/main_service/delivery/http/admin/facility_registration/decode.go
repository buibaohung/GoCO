package facility_registration

import (
	"github.com/gin-gonic/gin"

	"main_service/endpoints/admin/facility_registration"
)

func DecodeRejectFacilityRegistration(c *gin.Context) (interface{}, error) {
	req := &facility_registration.RejectRequest{}
	req.FacilityRegistrationID = c.Param("id")

	return req, nil
}

func DecodeAcceptFacilityRegistration(c *gin.Context) (interface{}, error) {
	req := &facility_registration.AcceptRequest{}
	req.FacilityRegistrationID = c.Param("id")

	return req, nil
}
