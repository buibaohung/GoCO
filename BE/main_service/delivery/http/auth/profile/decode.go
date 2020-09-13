package profile

import (
	"main_service/endpoints/auth/profile"
	"main_service/util"
	"net/http"

	"github.com/gin-gonic/gin"
)

// DecodeGetProfile .
func DecodeGetProfile(c *gin.Context) (interface{}, error) {
	return nil, nil
}

// DecodeUpdateProfile .
func DecodeUpdateProfile(c *gin.Context) (interface{}, error) {
	req := &profile.UpdateProfileRequest{}
	err := c.ShouldBind(&req)
	if err != nil {
		return nil, util.NewError(err, http.StatusNotAcceptable, 1000, "Invalid input")
	}

	return req, nil
}
