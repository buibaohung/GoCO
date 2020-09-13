package endpoints

import (
	"main_service/endpoints/admin"
	"main_service/endpoints/auth"
	"main_service/endpoints/authentication"
	"main_service/endpoints/public"
	"main_service/endpoints/system"
	"main_service/repository"
)

// Endpoints .
type Endpoints struct {
	Authentication   authentication.Endpoints
	Auth             auth.Endpoints
	AuthMiddlewares  auth.Middlewares
	Admin            admin.Endpoints
	AdminMiddlewares admin.Middlewares
	Public           public.Endpoints
	System           system.Endpoints
}

// New .
func New(repo repository.Repository) Endpoints {
	return Endpoints{
		Authentication:   authentication.NewEndpoints(repo),
		Auth:             auth.NewEndpoints(repo),
		AuthMiddlewares:  auth.NewMiddlewares(repo),
		Admin:            admin.NewEndpoints(repo),
		AdminMiddlewares: admin.NewMiddlewares(repo),
		Public:           public.NewEndpoints(repo),
		System:           system.NewEndpoints(repo),
	}
}
