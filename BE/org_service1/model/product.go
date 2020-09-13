package model

import "time"

type Product struct {
	ID          string     `json:"id,omitempty"`
	Name        string     `json:"name,omitempty"`
	Avatar      string     `json:"avatar,omitempty"`
	FacilityID  string     `json:"facility_id,omitempty"`
	Description string     `json:"description,omitempty"`
	CreatedAt   time.Time  `json:"created_at,omitempty"`
	UpdatedAt   time.Time  `json:"updated_at,omitempty"`
	DeletedAt   *time.Time `json:"deleted_at,omitempty"`
}
