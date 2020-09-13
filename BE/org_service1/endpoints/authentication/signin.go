package authentication

import (
	"context"
	"net/http"

	"org_service/model"
	"org_service/repository"
	"org_service/util"

	"github.com/jinzhu/gorm"
	"gopkg.in/validator.v2"
)

type SigninRequest struct {
	PhoneNumber string `json:"phone_number,omitempty" validate:"nonzero"`
	Password    string `json:"password,omitempty" validate:"nonzero"`
}

type SigninResponse struct {
	User  *model.User `json:"user,omitempty"`
	Token string      `json:"token,omitempty"`
}

// MakeSignInEndpoint .
func MakeSignInEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*SigninRequest)
		if err := validator.Validate(*req); err != nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		user, err := repo.User.GetByPhone(req.PhoneNumber)
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1020, "Phonenumber has not registed yet")
			}
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error get user")
		}

		match := util.CheckPasswordHash(req.Password, user.PasswordHash)
		if !match {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1040, "Wrong password")
		}
		user.PasswordHash = ""

		token, err := util.GenerateToken(user.ID, user.Name, user.PhoneNumber, user.Permission)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1060, "Can't generate token")
		}

		resp := SigninResponse{
			Token: token,
			User:  user,
		}

		return resp, nil
	}
}
