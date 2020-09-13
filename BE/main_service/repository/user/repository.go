package user

import (
	"main_service/model"
)

type UserRepository interface {
	CheckExistByPhone(string) (bool, error)
	CreateEOSAccountForUser(userID string, eosUsername string, privateKey string) (*model.User, error)
	Create(*model.User) (*model.User, error)
	GetByPhone(string) (*model.User, error)
	GetByEOSAccount(string) (*model.User, error)
	GetByID(id string) (*model.User, error)
	UpdateByID(id string, user *model.User) (*model.User, error)
}
