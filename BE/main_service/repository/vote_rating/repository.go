package vote_rating

import (
	"main_service/model"
)

type VoteRatingRepository interface {
	GetByRatingID(ratingID string) ([]model.VoteRating, error)
}
