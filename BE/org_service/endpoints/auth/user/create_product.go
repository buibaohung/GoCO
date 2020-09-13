package user

import (
	"context"
	"net/http"

	"org_service/model"
	"org_service/repository"
	"org_service/util"
)

type CreateUserRequest struct {
	User     model.User `json:"user,omitempty"`
	Password string     `json:"password,omitempty"`
}

func MakeCreateUserEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		var err error
		req := request.(*CreateUserRequest)
		if req == nil || req != nil && (req.User.PhoneNumber == "" || req.Password == "") {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		tokenPayload := util.GetTokenPayloadFromContext(c)
		if !tokenPayload.User.HasPermission(model.USER_C) {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1020, "Permission deny")
		}

		req.User.PasswordHash, err = util.HashPassword(req.Password)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error hash password")
		}

		// save db
		user, err := repo.User.Create(&req.User)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error create product")
		}

		return user, nil
	}
}
