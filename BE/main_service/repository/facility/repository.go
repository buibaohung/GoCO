package facility

import (
	"main_service/model"
)

type FacilityRepository interface {
	Create(facility *model.Facility) (*model.Facility, error)
	GetByID(id string) (*model.Facility, error)
	GetByPublicKey(publicKey string) (*model.Facility, error)
	GetByType(t model.FacilityType) ([]model.Facility, error)
}
