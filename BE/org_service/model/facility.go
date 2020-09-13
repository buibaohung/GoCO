package model

import "time"

type Facility struct {
	ID          string       `json:"id,omitempty"`
	Name        string       `json:"name,omitempty"`
	Type        FacilityType `json:"type,omitempty"`
	EosUsername string       `json:"eos_username,omitempty"`
	Email       string       `json:"email,omitempty"`
	PhoneNumber string       `json:"phone_number,omitempty"`
	Location    string       `json:"location,omitempty"`
	Website     string       `json:"website,omitempty"`
	CreatedAt   time.Time    `json:"created_at,omitempty"`
	UpdatedAt   time.Time    `json:"updated_at,omitempty"`
	DeletedAt   *time.Time   `json:"deleted_at,omitempty"`
}

// FacilityType http://apps.gs1.org/GDD/Pages/clDetails.aspx?semanticURN=urn:gs1:gdd:cl:PartyRoleCode&release=3
type FacilityType string

const (
	GROWER                 FacilityType = "GROWER"
	MANUFACTURER_OF_GOODS  FacilityType = "MANUFACTURER_OF_GOODS"
	POINT_OF_SALE          FacilityType = "POINT_OF_SALE"
	TRANSPORTATION_CARRIER FacilityType = "TRANSPORTATION_CARRIER"
	WAREHOUSE_KEEPER       FacilityType = "WAREHOUSE_KEEPER"
)

// Valid .
func (f FacilityType) Valid() bool {
	if f == GROWER ||
		f == MANUFACTURER_OF_GOODS ||
		f == POINT_OF_SALE ||
		f == TRANSPORTATION_CARRIER ||
		f == WAREHOUSE_KEEPER {
		return true
	}

	return false
}
