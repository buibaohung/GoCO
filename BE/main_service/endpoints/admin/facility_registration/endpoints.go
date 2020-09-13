package facility_registration

import (
	"main_service/model"
	"main_service/repository"
)

type Endpoints struct {
	GetAll model.Endpoint
	Reject model.Endpoint
	Accept model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		GetAll: MakeGetAllEndpoint(repo),
		Reject: MakeRejectEndpoint(repo),
		Accept: MakeAcceptEndpoint(repo),
	}
}
