package interaction

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"main_service/endpoints/auth/interaction"
	"main_service/util"
)

// DecodeTrackViews .
func DecodeTrackViews(c *gin.Context) (interface{}, error) {
	req := &interaction.TrackViewsRequest{}
	err := c.ShouldBind(req)
	if err != nil {
		return nil, util.NewError(err, http.StatusNotAcceptable, 1000, "Invalid input")
	}

	return req, nil
}

// DecodeTrackTimeView .
func DecodeTrackTimeView(c *gin.Context) (interface{}, error) {
	req := &interaction.TrackTimeViewRequest{}
	err := c.ShouldBind(req)
	if err != nil {
		return nil, util.NewError(err, http.StatusNotAcceptable, 1000, "Invalid input")
	}

	return req, nil
}
