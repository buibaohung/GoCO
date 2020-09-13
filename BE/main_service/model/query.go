package model

type QueryOrder struct {
	OrderField string `json:"order_field,omitempty" form:"order_field"`
	OrderBy    string `json:"order_by,omitempty" form:"order_by"`
}
