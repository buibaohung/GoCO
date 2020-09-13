package model

type Location struct {
	Code         string `json:"code,omitempty"`
	ParentCode   string `json:"parent_code,omitempty"`
	Name         string `json:"name,omitempty"`
	Type         string `json:"type,omitempty"`
	Slug         string `json:"slug,omitempty"`
	NameWithType string `json:"name_with_type,omitempty"`
	Path         string `json:"path,omitempty"`
	PathWithType string `json:"path_with_type,omitempty"`
}
