package profile

import (
	"context"
	"net/http"

	"main_service/model"
	"main_service/repository"
	"main_service/util"
)

type UpdateProfileRequest struct {
	User model.User `json:"user,omitempty" validate:"nonzero"`
}

func MakeUpdateProfileEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*UpdateProfileRequest)
		if req == nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		tokenPayload := util.GetTokenPayloadFromContext(c)
		user, err := repo.User.UpdateByID(tokenPayload.ID, &req.User)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1015, "Error get user")
		}

		return user, nil
	}
}
