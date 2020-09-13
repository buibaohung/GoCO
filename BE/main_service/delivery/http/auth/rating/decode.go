package rating

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"main_service/endpoints/auth/rating"
	"main_service/util"
)

// DecodeCreateRating .
func DecodeCreateRating(c *gin.Context) (interface{}, error) {
	req := &rating.CreateRatingRequest{}
	err := c.ShouldBind(req)
	if err != nil {
		return nil, util.NewError(err, http.StatusNotAcceptable, 1000, "Invalid input")
	}

	return req, nil
}

// DecodeDeleteRating .
func DecodeDeleteRating(c *gin.Context) (interface{}, error) {
	ratingID := c.Param("id")

	req := &rating.DeleteRatingRequest{
		RatingID: ratingID,
	}

	return req, nil
}
