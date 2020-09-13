package authentication

import (
	"context"
	"net/http"

	"gopkg.in/validator.v2"

	"org_service/model"
	"org_service/repository"
	"org_service/util"
)

type SignupRequest struct {
	Name        string `json:"name,omitempty" validate:"nonzero"`
	Password    string `json:"password,omitempty" validate:"nonzero"`
	PhoneNumber string `json:"phone_number,omitempty" validate:"nonzero"`
}

// MakeSignUpEndpoint .
func MakeSignUpEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*SignupRequest)
		if err := validator.Validate(*req); err != nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		exist, err := repo.User.CheckExistByPhone(req.PhoneNumber)
		if err != nil {
			return nil, err
		}

		if exist {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1020, "Phone number is exist")
		}

		// hash password
		passwordHash, err := util.HashPassword(req.Password)
		if err != nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1030, "Password in valid")
		}

		user := &model.User{
			Name:         req.Name,
			PasswordHash: passwordHash,
			PhoneNumber:  req.PhoneNumber,
		}
		_, err = repo.User.Create(user)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1040, "Error create user")
		}
		user.PasswordHash = ""

		return user, nil
	}
}
