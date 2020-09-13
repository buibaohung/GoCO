package user

import (
	"context"
	"net/http"

	"org_service/model"
	"org_service/repository"
	"org_service/util"
)

type UpdateUserRequest struct {
	User model.User `json:"user,omitempty"`
}

func MakeUpdateUserEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*UpdateUserRequest)
		if req == nil || req != nil && req.User.ID == "" {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		tokenPayload := util.GetTokenPayloadFromContext(c)
		if !tokenPayload.User.HasPermission(model.USER_U) {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1020, "Permission deny")
		}

		req.User.DeletedAt = nil
		user, err := repo.User.Update(req.User)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error update user")
		}

		return user, nil
	}
}
