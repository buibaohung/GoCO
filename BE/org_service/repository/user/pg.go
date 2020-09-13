package user

import (
	"org_service/model"

	"github.com/jinzhu/gorm"
)

type pgUserRepository struct {
	db *gorm.DB
}

// NewPGUserRepository .
func NewPGUserRepository(db *gorm.DB) UserRepository {
	return pgUserRepository{db}
}

func (r pgUserRepository) CheckExistByPhone(phoneNumber string) (bool, error) {
	user := model.User{}
	err := r.db.Where("phone_number = ?", phoneNumber).Find(&user).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return false, nil
		}
		return false, err
	}

	return true, nil
}

func (r pgUserRepository) Create(user *model.User) (*model.User, error) {
	err := r.db.Create(user).Error
	return user, err
}

func (r pgUserRepository) GetByPhone(phoneNumber string) (*model.User, error) {
	user := model.User{}
	err := r.db.Where("phone_number = ?", phoneNumber).Find(&user).Error
	return &user, err
}

func (r pgUserRepository) GetByID(id string) (*model.User, error) {
	user := model.User{}
	err := r.db.Where("id = ?", id).Find(&user).Error
	return &user, err
}

func (r pgUserRepository) GetAll(pagination model.Pagination) ([]model.User, int, error) {
	users := []model.User{}
	count := 0
	db := r.db

	err := db.Offset(pagination.Offset).
		Limit(pagination.Limit).
		Find(&users).
		Offset(0).
		Limit(-1).
		Count(&count).Error

	return users, count, err
}

func (r pgUserRepository) Update(user model.User) (*model.User, error) {
	err := r.db.Model(&user).Updates(user).Error
	return &user, err
}

func (r pgUserRepository) Delete(userID string) error {
	err := r.db.Where("id = ?", userID).
		Delete(&model.User{}).Error

	return err
}
