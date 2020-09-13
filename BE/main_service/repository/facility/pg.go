package facility

import (
	"main_service/model"

	"github.com/jinzhu/gorm"
)

type pgFacilityRepository struct {
	db *gorm.DB
}

// NewPGFacilityRepository .
func NewPGFacilityRepository(db *gorm.DB) FacilityRepository {
	return pgFacilityRepository{db}
}

func (r pgFacilityRepository) Create(facility *model.Facility) (*model.Facility, error) {
	err := r.db.Create(facility).Error
	return facility, err
}

func (r pgFacilityRepository) GetByID(id string) (*model.Facility, error) {
	facility := model.Facility{}
	err := r.db.Where("id = ?", id).Find(&facility).Error
	return &facility, err
}

func (r pgFacilityRepository) GetByPublicKey(publicKey string) (*model.Facility, error) {
	facility := model.Facility{}
	err := r.db.Where("public_key = ?", publicKey).Find(&facility).Error
	return &facility, err
}

func (r pgFacilityRepository) GetByType(t model.FacilityType) ([]model.Facility, error) {
	facilities := []model.Facility{}
	db := r.db
	if t != "" {
		db = db.Where("type = ?", t)
	}
	err := db.Find(&facilities).Error
	return facilities, err
}
