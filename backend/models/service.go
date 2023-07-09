package models

type Service struct {
	Name     string `json:"name,omitempty"`
	Url      string `json:"url,omitempty"`
	Icon     string `json:"icon,omitempty"`
	IconType string `json:"iconType,omitempty"`
}
