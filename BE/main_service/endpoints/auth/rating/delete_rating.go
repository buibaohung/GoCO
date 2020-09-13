package rating

import (
	"context"
	"net/http"

	"main_service/model"
	"main_service/repository"
	"main_service/util"
)

type DeleteRatingRequest struct {
	RatingID string `json:"rating_id,omitempty"`
}

func MakeDeleteRatingEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*DeleteRatingRequest)
		if req == nil || req != nil && req.RatingID == "" {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		tokenPayload := util.GetTokenPayloadFromContext(c)
		_, err := repo.User.GetByID(tokenPayload.ID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error get user")
		}

		rating, err := repo.Rating.GetByID(req.RatingID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error get rating")
		}

		if tokenPayload.ID != rating.UserID {
			return nil, util.NewError(err, http.StatusInternalServerError, 1040, "Permission deny")
		}

		err = repo.Rating.Delete(req.RatingID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1050, "Error delete rating")
		}

		return rating, nil
	}
}
