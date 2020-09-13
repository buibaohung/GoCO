package model

import "time"

// FacilityRegistration .
type FacilityRegistration struct {
	ID           string                     `json:"id,omitempty"`
	FacilityName string                     `json:"facility_name,omitempty"`
	FacilityType FacilityType               `json:"facility_type,omitempty"`
	PhoneNumber  string                     `json:"phone_number,omitempty"`
	Email        string                     `json:"email,omitempty"`
	EosUsername  string                     `json:"eos_username,omitempty"`
	Location     string                     `json:"location,omitempty"`
	Website      string                     `json:"website,omitempty"`
	Status       FacilityRegistrationStatus `json:"status,omitempty"`
	CreatedAt    time.Time                  `json:"created_at,omitempty"`
	DeletedAt    *time.Time                 `json:"deleted_at,omitempty"`
}

type FacilityRegistrationStatus int

const (
	Pending FacilityRegistrationStatus = 1
	Accept  FacilityRegistrationStatus = 2
	Reject  FacilityRegistrationStatus = 3
)
