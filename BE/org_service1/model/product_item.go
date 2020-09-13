package model

import "time"

type ProductItem struct {
	ID                string     `json:"id,omitempty" form:"id"`
	ProductID         string     `json:"product_id,omitempty" form:"product_id"`
	Price             int        `json:"price,omitempty"`
	ExpiryDate        time.Time  `json:"expiry_date,omitempty" form:"expiry_date"`
	OwnerID           string     `json:"owner_id,omitempty" form:"owner_id"`
	FromProductItemID string     `json:"from_product_item_id,omitempty" sql:"default:null" form:"from_product_item_id"`
	CreatedAt         time.Time  `json:"created_at,omitempty" form:"created_at"`
	UpdatedAt         time.Time  `json:"updated_at,omitempty" form:"updated_at"`
	DeletedAt         *time.Time `json:"deleted_at,omitempty" form:"deleted_at"`
}

type ProductItemFilter struct {
	ProductItem
	FacilityID string `json:"facility_id,omitempty" form:"facility_id"`
}

type ProductItemDisplay struct {
	ProductItem
	ProductName string `json:"product_name,omitempty"`
}
