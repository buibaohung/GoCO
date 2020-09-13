package facility_registration

import (
	"main_service/model"
	"main_service/repository"
)

type Endpoints struct {
	CreateFacilityRegistration model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		CreateFacilityRegistration: MakeCreateFacilityRegistrationEndpoint(repo),
	}
}
