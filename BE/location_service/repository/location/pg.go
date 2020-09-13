package location

import (
	"location_service/model"

	"github.com/jinzhu/gorm"
)

type pgLocationRepository struct {
	db *gorm.DB
}

// NewPGLocationRepository .
func NewPGLocationRepository(db *gorm.DB) LocationRepository {
	return pgLocationRepository{db}
}

func (r pgLocationRepository) GetByCode(code string) (*model.Location, error) {
	location := model.Location{}
	err := r.db.Where("code = ?", code).Find(&location).Error
	return &location, err
}

func (r pgLocationRepository) GetByParentCode(parentCode string) ([]model.Location, error) {
	locations := []model.Location{}
	err := r.db.Where("parent_code = ?", parentCode).Find(&locations).Error
	return locations, err
}
