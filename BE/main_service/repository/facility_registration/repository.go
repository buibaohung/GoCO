package facility_registration

import (
	"main_service/model"
)

type FacilityRegistrationRepository interface {
	Create(*model.FacilityRegistration) (*model.FacilityRegistration, error)
	GetByID(id string) (*model.FacilityRegistration, error)
	GetAll() ([]model.FacilityRegistration, error)
	CheckExistByFacilityName(name string) (bool, error)
	Update(*model.FacilityRegistration) error
}
