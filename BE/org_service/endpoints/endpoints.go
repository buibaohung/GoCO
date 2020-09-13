package endpoints

import (
	"org_service/endpoints/auth"
	"org_service/endpoints/authentication"
	"org_service/endpoints/public"
	"org_service/repository"
)

// Endpoints .
type Endpoints struct {
	Authentication  authentication.Endpoints
	Auth            auth.Endpoints
	AuthMiddlewares auth.Middlewares
	Public          public.Endpoints
}

// New .
func New(repo repository.Repository) Endpoints {
	return Endpoints{
		Authentication:  authentication.NewEndpoints(repo),
		Auth:            auth.NewEndpoints(repo),
		AuthMiddlewares: auth.NewMiddlewares(repo),
		Public:          public.NewEndpoints(repo),
	}
}
