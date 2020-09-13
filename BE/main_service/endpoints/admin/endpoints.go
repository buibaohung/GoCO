package admin

import (
	"main_service/endpoints/admin/facility_registration"
	"main_service/repository"
)

type Endpoints struct {
	FacilityRegistration facility_registration.Endpoints
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		FacilityRegistration: facility_registration.NewEndpoints(repo),
	}
}
