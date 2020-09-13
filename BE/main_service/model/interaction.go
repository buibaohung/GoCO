package model

type Interaction struct {
	ID        string `json:"id,omitempty"`
	UserID    string `json:"user_id,omitempty"`
	ProductID string `json:"product_id,omitempty"`
	Views     int    `json:"views,omitempty"`
	TimeView  int    `json:"time_view,omitempty"`
}
