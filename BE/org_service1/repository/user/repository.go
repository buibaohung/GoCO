package user

import (
	"org_service/model"
)

type UserRepository interface {
	CheckExistByPhone(string) (bool, error)
	Create(*model.User) (*model.User, error)
	GetByPhone(string) (*model.User, error)
	GetByID(id string) (*model.User, error)
	GetAll(pagination model.Pagination) ([]model.User, int, error)
	Update(user model.User) (*model.User, error)
	Delete(userID string) error
}
