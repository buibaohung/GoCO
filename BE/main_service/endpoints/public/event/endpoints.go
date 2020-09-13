package event

import (
	"main_service/model"
	"main_service/repository"
)

type Endpoints struct {
	GetEventType           model.Endpoint
	GetEventsByProductItem model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		GetEventType:           MakeGetEventTypeEndpoint(repo),
		GetEventsByProductItem: MakeGetEventsByProductItemEndpoint(repo),
	}
}
