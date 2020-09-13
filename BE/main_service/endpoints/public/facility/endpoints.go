package facility

import (
	"main_service/model"
	"main_service/repository"
)

type Endpoints struct {
	GetFacilityType     model.Endpoint
	GetFacilitiesByType model.Endpoint
	GetFacilityByID     model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		GetFacilityType:     MakeGetFacilityTypeEndpoint(repo),
		GetFacilitiesByType: MakeFacilitiesByTypeEndpoint(repo),
		GetFacilityByID:     MakeGetFacilityByIDEndpoint(repo),
	}
}
