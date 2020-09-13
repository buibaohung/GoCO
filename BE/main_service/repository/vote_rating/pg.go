package vote_rating

import (
	"main_service/model"

	"github.com/jinzhu/gorm"
)

type pgVoteRatingRepository struct {
	db *gorm.DB
}

// NewPGVoteRatingRepository .
func NewPGVoteRatingRepository(db *gorm.DB) VoteRatingRepository {
	return pgVoteRatingRepository{db}
}

func (r pgVoteRatingRepository) GetByRatingID(ratingID string) ([]model.VoteRating, error) {
	vote_ratings := []model.VoteRating{}
	err := r.db.Where("rating_id = ?", ratingID).Find(&vote_ratings).Error
	return vote_ratings, err
}
