package user

import (
	"main_service/model"

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

func (r pgUserRepository) GetByEOSAccount(eosAccountName string) (*model.User, error) {
	user := model.User{}
	err := r.db.Where("eos_username = ?", eosAccountName).Find(&user).Error
	return &user, err
}

func (r pgUserRepository) GetByID(id string) (*model.User, error) {
	user := model.User{}
	err := r.db.Where("id = ?", id).Find(&user).Error
	return &user, err
}

func (r pgUserRepository) CreateEOSAccountForUser(userID string, eosUsername string, privateKey string) (*model.User, error) {
	user := &model.User{}
	err := r.db.Model(user).Where("id = ?", userID).Updates(map[string]interface{}{
		"eos_username": eosUsername,
		"private_key":  privateKey,
	}).Error
	return user, err
}

func (r pgUserRepository) UpdateByID(id string, user *model.User) (*model.User, error) {
	u := &model.User{}
	err := r.db.Model(u).Where("id = ?", id).Updates(*user).Error
	return u, err
}
