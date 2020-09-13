package location

import (
	"github.com/gin-gonic/gin"

	"location_service/endpoints/location"
)

func DecodeGetLocations(c *gin.Context) (interface{}, error) {
	req := &location.GetLocationsRequest{}
	req.ParentCode = c.Query("parent_code")

	return req, nil
}

func DecodeGetLocationByCode(c *gin.Context) (interface{}, error) {
	req := &location.GetLocationByCodeRequest{}
	req.Code = c.Param("code")

	return req, nil
}
