package authentication

import (
	"context"
	"net/http"

	"main_service/model"
	"main_service/repository"
	"main_service/util"

	"github.com/jinzhu/gorm"
	"gopkg.in/validator.v2"
)

type SigninRequest struct {
	PhoneNumber string `json:"phone_number,omitempty"`
	Username    string `json:"username,omitempty"`
	Password    string `json:"password,omitempty" validate:"nonzero"`
	Role        string `json:"role,omitempty"`
}

type SigninResponse struct {
	User  *model.User `json:"user,omitempty"`
	Token string      `json:"token,omitempty"`
}

// MakeSignInEndpoint .
func MakeSignInEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*SigninRequest)
		if err := validator.Validate(*req); err != nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		if req.PhoneNumber == "" && req.Username == "" {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		var token string
		user := &model.User{
			ID:          "1111111111",
			Name:        "Admin",
			PhoneNumber: "0798565290",
		}
		var err error

		switch req.Role {
		case "admin":
			if req.Username != "admin" || req.Password != "admin" {
				return nil, util.NewError(nil, http.StatusNotAcceptable, 1020, "Wrong password")
			}

			token, err = util.GenerateToken(user.ID, user.Name, user.PhoneNumber, req.Role)
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1060, "Can't generate token")
			}
		default:
			user, err = repo.User.GetByPhone(req.PhoneNumber)
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

			token, err = util.GenerateToken(user.ID, user.Name, user.PhoneNumber, req.Role)
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1060, "Can't generate token")
			}
		}

		resp := SigninResponse{
			Token: token,
			User:  user,
		}

		return resp, nil
	}
}
