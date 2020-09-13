package model

var DefaultLimit = 10

type Pagination struct {
	Offset int `json:"offset" form:"offset"`
	Limit  int `json:"limit" form:"limit"`
	Size   int `json:"size" form:"size"`
}
