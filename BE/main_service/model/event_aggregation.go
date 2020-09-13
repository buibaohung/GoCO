package model

import "time"

type EventAggregation struct {
	ID            string     `json:"id,omitempty"`
	ProductItemID string     `json:"product_item_id,omitempty"`
	EventID       string     `json:"event_id,omitempty"`
	CreatedAt     time.Time  `json:"created_at,omitempty"`
	UpdatedAt     time.Time  `json:"updated_at,omitempty"`
	DeletedAt     *time.Time `json:"deleted_at,omitempty"`
}
