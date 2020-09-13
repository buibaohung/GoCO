package authentication

import (
	"context"
	"main_service/config/grpc/client"
	"main_service/config/grpc/proto/domain"
	"main_service/model"
	"main_service/repository"
	"main_service/util"
	"net/http"

	"gopkg.in/validator.v2"
)

type SignupRequest struct {
	Name           string `json:"name,omitempty" validate:"nonzero"`
	Password       string `json:"password,omitempty" validate:"nonzero"`
	PhoneNumber    string `json:"phone_number,omitempty" validate:"nonzero"`
	WithEOSAccount bool   `json:"with_eos_account,omitempty"`
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

		eosAccount := &domain.EosAccount{}
		if req.WithEOSAccount {
			eosAccount, err = client.GetClient().EOS.NewEOSAccount(c, &domain.Nil{})
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1050, "Error generate eos account")
			}
		}

		user := &model.User{
			Name:         req.Name,
			PasswordHash: passwordHash,
			PhoneNumber:  req.PhoneNumber,
			EosUsername:  eosAccount.Name,
		}
		_, err = repo.User.Create(user)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1040, "Error create user")
		}
		user.PasswordHash = ""

		return user, nil
	}
}
