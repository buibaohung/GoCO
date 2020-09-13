package model

type VoteRating struct {
	ID            string `json:"id,omitempty"`
	RatingID      string `json:"rating_id,omitempty"`
	UserID        string `json:"user_id,omitempty"`
	Like          int    `json:"like,omitempty"`
	Stake         int    `json:"stake,omitempty"`
	TransactionID string `json:"transaction_id,omitempty"`
}
