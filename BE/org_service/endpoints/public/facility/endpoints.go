package facility

import (
	"org_service/model"
	"org_service/repository"
)

type Endpoints struct {
	GetFacilityType model.Endpoint
	GetMyFacility   model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		GetFacilityType: MakeGetFacilityTypeEndpoint(repo),
		GetMyFacility:   MakeGetMyFacilityEndpoint(repo),
	}
}
