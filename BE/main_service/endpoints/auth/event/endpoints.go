package event

import (
	"main_service/model"
	"main_service/repository"
)

type Endpoints struct {
	CreateEvent               model.Endpoint
	GetByNameAndProductItemID model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		CreateEvent:               MakeCreateEventEndpoint(repo),
		GetByNameAndProductItemID: MakeGetByNameAndProductItemIDEndpoint(repo),
	}
}
