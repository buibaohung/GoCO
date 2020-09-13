package profile

import (
	"main_service/model"
	"main_service/repository"
)

type Endpoints struct {
	UpdateProfile model.Endpoint
	GetProfile    model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		UpdateProfile: MakeUpdateProfileEndpoint(repo),
		GetProfile:    MakeGetProfileEndpoint(repo),
	}
}
