package user

import (
	"context"
	"net/http"

	"org_service/model"
	"org_service/repository"
	"org_service/util"
)

type GetUsersRequest struct {
	Pagination model.Pagination
}

type GetUsersResponse struct {
	Users      []model.User     `json:"users"`
	Pagination model.Pagination `json:"pagination,omitempty"`
}

func MakeGetUsersEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*GetUsersRequest)
		if req == nil {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		tokenPayload := util.GetTokenPayloadFromContext(c)
		if !tokenPayload.User.HasPermission(model.USER_R) {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1020, "Permission deny")
		}

		users, count, err := repo.User.GetAll(req.Pagination)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error get users")
		}

		for i := 0; i < len(users); i++ {
			users[i].PasswordHash = ""
		}

		resp := GetUsersResponse{
			Users:      users,
			Pagination: req.Pagination,
		}
		resp.Pagination.Size = count

		return resp, nil
	}
}
