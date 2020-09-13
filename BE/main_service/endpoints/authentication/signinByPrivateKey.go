package authentication

import (
	"context"
	"net/http"

	"main_service/config/grpc/client"
	"main_service/config/grpc/proto/service/eos"
	"main_service/model"
	"main_service/repository"
	"main_service/util"

	"github.com/jinzhu/gorm"
	"gopkg.in/validator.v2"
)

type SignInByPrivateKeyRequest struct {
	PrivateKey string `json:"private_key,omitempty" validate:"nonzero"`
}

// SigninByPrivateKeyEndpoint .
func MakeSignInByPrivateKeyEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*SignInByPrivateKeyRequest)
		if err := validator.Validate(*req); err != nil {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		pub, err := client.GetClient().EOS.GetPubFromPriv(c, &eos.GetPubFromPrivRequest{
			PrivateKey: req.PrivateKey,
		})
		if err != nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1020, "Invalid key")
		}

		accountName, err := client.GetClient().EOS.GetNameFromPub(c, &eos.GetNameFromPubRequest{
			PublicKey: pub.GetPublicKey(),
		})
		if err != nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1030, "Invalid key")
		}

		user, err := repo.User.GetByEOSAccount(accountName.GetName())
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1020, "Phonenumber has not registed yet")
			}
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error get user")
		}

		user.PasswordHash = ""

		token, err := util.GenerateToken(user.ID, user.Name, user.PhoneNumber, "user")
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
