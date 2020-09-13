package event

import (
	"org_service/model"
	"org_service/repository"
)

type Endpoints struct {
	GetEventType model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		GetEventType: MakeGetEventTypeEndpoint(repo),
	}
}
