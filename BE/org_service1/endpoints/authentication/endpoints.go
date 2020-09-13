package authentication

import (
	"org_service/model"
	"org_service/repository"
)

type Endpoints struct {
	SignUp model.Endpoint
	SignIn model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		SignUp: MakeSignUpEndpoint(repo),
		SignIn: MakeSignInEndpoint(repo),
	}
}
