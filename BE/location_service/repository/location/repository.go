package location

import (
	"location_service/model"
)

type LocationRepository interface {
	GetByCode(code string) (*model.Location, error)
	GetByParentCode(parentCode string) ([]model.Location, error)
}
