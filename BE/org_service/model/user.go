package model

import "time"

type User struct {
	ID           string         `json:"id,omitempty"`
	Name         string         `json:"name,omitempty"`
	PhoneNumber  string         `json:"phone_number,omitempty"`
	PasswordHash string         `json:"password_hash,omitempty"`
	Permission   UserPermission `json:"permission"`
	CreatedAt    time.Time      `json:"created_at,omitempty"`
	UpdatedAt    time.Time      `json:"updated_at,omitempty"`
	DeletedAt    *time.Time     `json:"deleted_at,omitempty"`
}

type UserPermission int

const (
	PRODUCT_C UserPermission = 1
	PRODUCT_R UserPermission = 2
	PRODUCT_U UserPermission = 4
	PRODUCT_D UserPermission = 8

	LOT_C UserPermission = 16
	LOT_R UserPermission = 32
	LOT_U UserPermission = 64
	LOT_D UserPermission = 128

	USER_C UserPermission = 256
	USER_R UserPermission = 512
	USER_U UserPermission = 1024
	USER_D UserPermission = 2048
)

func (u User) HasPermission(permission UserPermission) bool {
	return u.Permission&permission == permission
}
