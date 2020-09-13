package user

import (
	"context"
	"net/http"

	"org_service/model"
	"org_service/repository"
	"org_service/util"
)

type DeleteUserRequest struct {
	UserID string `json:"user_id,omitempty"`
}

func MakeDeleteUserEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*DeleteUserRequest)
		if req == nil || req != nil && req.UserID == "" {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		tokenPayload := util.GetTokenPayloadFromContext(c)
		if !tokenPayload.User.HasPermission(model.USER_D) {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1020, "Permission deny")
		}

		if tokenPayload.User.ID == req.UserID {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1030, "Can't delete yourself")
		}

		err := repo.User.Delete(req.UserID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1060, "Error delete user")
		}

		return tokenPayload.User, nil
	}
}
