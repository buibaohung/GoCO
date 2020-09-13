package model

type Rating struct {
	ID        string `json:"id,omitempty"`
	ProductID string `json:"product_id,omitempty"`
	UserID    string `json:"user_id,omitempty"`
	Star      int    `json:"star,omitempty"`
	Stake     int    `json:"stake,omitempty"`
	Content   string `json:"content,omitempty"`
}
