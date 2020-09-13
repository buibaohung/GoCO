package event

import (
	"org_service/model"
	"org_service/repository"
)

type Endpoints struct {
	CreateEvent model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		CreateEvent: MakeCreateEventEndpoint(repo),
	}
}
