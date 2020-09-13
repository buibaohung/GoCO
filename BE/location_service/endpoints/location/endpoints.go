package location

import (
	"location_service/model"
	"location_service/repository"
)

type Endpoints struct {
	GetLocationByCode model.Endpoint
	GetLocations      model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		GetLocationByCode: MakeGetLocationByCodeEndpoint(repo),
		GetLocations:      MakeGetLocationsEndpoint(repo),
	}
}
