package profile

import (
	"context"
	"net/http"

	"main_service/model"
	"main_service/repository"
	"main_service/util"
)

func MakeGetProfileEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		tokenPayload := util.GetTokenPayloadFromContext(c)
		user, err := repo.User.GetByID(tokenPayload.ID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error get user")
		}

		user.PasswordHash = ""

		return user, nil
	}
}
