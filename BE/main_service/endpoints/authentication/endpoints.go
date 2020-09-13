package authentication

import (
	"main_service/model"
	"main_service/repository"
)

type Endpoints struct {
	SignUp             model.Endpoint
	SignIn             model.Endpoint
	SignInByPrivateKey model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		SignUp:             MakeSignUpEndpoint(repo),
		SignIn:             MakeSignInEndpoint(repo),
		SignInByPrivateKey: MakeSignInByPrivateKeyEndpoint(repo),
	}
}
