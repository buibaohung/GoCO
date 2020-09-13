package facility

import (
	"context"
	"errors"
	"org_service/model"

	"github.com/jinzhu/gorm"
)

type pgFacilityRepository struct {
	db *gorm.DB
}

// NewPGFacilityRepository .
func NewPGFacilityRepository(db *gorm.DB) FacilityRepository {
	return pgFacilityRepository{db}
}

func (r pgFacilityRepository) Create(ctx context.Context, facility *model.Facility) (*model.Facility, error) {
	err := r.db.Create(facility).Error
	return facility, err
}

func (r pgFacilityRepository) GetByID(ctx context.Context, id string) (*model.Facility, error) {
	facility := model.Facility{}
	err := r.db.Where("id = ?", id).Find(&facility).Error
	return &facility, err
}

func (r pgFacilityRepository) GetByEOSName(ctx context.Context, name string) (*model.Facility, error) {
	return nil, errors.New("Not implement")
}
