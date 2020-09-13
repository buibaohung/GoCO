package user

import (
	"context"
	"net/http"

	"org_service/model"
	"org_service/repository"
	"org_service/util"
)

type GetUserByIDRequest struct {
	UserID string `json:"user_id,omitempty"`
}

func MakeGetUserByIDEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*GetUserByIDRequest)
		if req == nil || req != nil && req.UserID == "" {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		tokenPayload := util.GetTokenPayloadFromContext(c)
		if !tokenPayload.User.HasPermission(model.USER_R) {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1020, "Permission deny")
		}

		user, err := repo.User.GetByID(req.UserID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error get user")
		}
		user.PasswordHash = ""

		return user, nil
	}
}
