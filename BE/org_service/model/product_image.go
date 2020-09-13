package model

type ProductImage struct {
	ID        string `json:"id,omitempty"`
	ProductID string `json:"product_id,omitempty"`
	ImageID   string `json:"image_id,omitempty"`
}
