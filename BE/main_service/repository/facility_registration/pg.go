package facility_registration

import (
	"main_service/model"

	"github.com/jinzhu/gorm"
)

type pgFacilityRegistrationRepository struct {
	db *gorm.DB
}

// NewPGFacilityRegistrationRepository .
func NewPGFacilityRegistrationRepository(db *gorm.DB) FacilityRegistrationRepository {
	return pgFacilityRegistrationRepository{db}
}

func (r pgFacilityRegistrationRepository) Create(f *model.FacilityRegistration) (*model.FacilityRegistration, error) {
	f.Status = model.Pending
	err := r.db.Create(f).Error
	return f, err
}

func (r pgFacilityRegistrationRepository) GetAll() ([]model.FacilityRegistration, error) {
	f := []model.FacilityRegistration{}
	err := r.db.Order("created_at desc").Find(&f).Error
	return f, err
}

func (r pgFacilityRegistrationRepository) GetByID(id string) (*model.FacilityRegistration, error) {
	f := model.FacilityRegistration{}
	err := r.db.Where("id = ?", id).Find(&f).Error
	return &f, err
}

func (r pgFacilityRegistrationRepository) CheckExistByFacilityName(name string) (bool, error) {
	f := model.FacilityRegistration{}
	err := r.db.Where("facility_name = ? AND status != ?", name, model.Reject).Find(&f).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return false, nil
		}

		return false, err
	}

	return true, nil
}

func (r pgFacilityRegistrationRepository) Update(f *model.FacilityRegistration) error {
	return r.db.Model(f).Update(*f).Error
}
