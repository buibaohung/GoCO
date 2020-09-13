package endpoints

import (
	"location_service/endpoints/location"
	"location_service/repository"
)

// Endpoints .
type Endpoints struct {
	Location location.Endpoints
}

// New .
func New(repo repository.Repository) Endpoints {
	return Endpoints{
		Location: location.NewEndpoints(repo),
	}
}
