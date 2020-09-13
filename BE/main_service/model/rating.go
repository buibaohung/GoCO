package model

import "time"

type Rating struct {
	ID            string     `json:"id,omitempty"`
	ProductID     string     `json:"product_id,omitempty"`
	UserID        string     `json:"user_id,omitempty"`
	Star          int        `json:"star,omitempty"`
	Stake         int        `json:"stake"`
	Content       string     `json:"content,omitempty"`
	TransactionID string     `json:"transaction_id,omitempty"`
	DeletedAt     *time.Time `json:"deleted_at,omitempty"`
}

type RatingDisplay struct {
	Rating
	UserName     string `json:"user_name,omitempty"`
	Like         int    `json:"like,omitempty"`
	StakeLike    int    `json:"stake_like,omitempty"`
	Dislike      int    `json:"dislike,omitempty"`
	StakeDislike int    `json:"stake_dislike,omitempty"`
}
