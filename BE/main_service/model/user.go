package model

import "time"

type User struct {
	ID           string     `json:"id,omitempty"`
	Name         string     `json:"name,omitempty"`
	PhoneNumber  string     `json:"phone_number,omitempty"`
	PasswordHash string     `json:"password_hash,omitempty"`
	EosUsername  string     `json:"eos_username,omitempty" sql:"default:null"`
	CreatedAt    time.Time  `json:"created_at,omitempty"`
	UpdatedAt    time.Time  `json:"updated_at,omitempty"`
	DeletedAt    *time.Time `json:"deleted_at,omitempty"`
}
