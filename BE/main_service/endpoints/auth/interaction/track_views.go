package interaction

import (
	"context"
	"net/http"

	"main_service/model"
	"main_service/repository"
	"main_service/util"

	"gopkg.in/validator.v2"
)

type TrackViewsRequest struct {
	ProductID string `validate:"nonzero" json:"product_id,omitempty"`
}

type TrackViewsResponse struct {
	Message string `json:"message,omitempty"`
}

func MakeTrackViewsEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*TrackViewsRequest)
		if err := validator.Validate(*req); err != nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		tokenPayload := util.GetTokenPayloadFromContext(c)
		user, err := repo.User.GetByID(tokenPayload.ID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1011, "Error get user")
		}

		// create if not exist
		inter, err := repo.Interaction.GetByUserIDAndProductID(user.ID, req.ProductID)
		if err != nil {
			inter = &model.Interaction{
				ProductID: req.ProductID,
				UserID:    user.ID,
			}
			inter, err = repo.Interaction.Create(inter)
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1012, "Error create interaction")
			}
		}

		// increase
		inter.Views++
		inter, err = repo.Interaction.Update(*inter)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1015, "Error update views")
		}

		resp := TrackViewsResponse{Message: "Success"}

		return resp, nil
	}
}
