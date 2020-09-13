package rating

import (
	"main_service/model"

	"github.com/jinzhu/gorm"
)

type pgRatingRepository struct {
	db *gorm.DB
}

// NewPGRatingRepository .
func NewPGRatingRepository(db *gorm.DB) RatingRepository {
	return pgRatingRepository{db}
}

func (r pgRatingRepository) Create(rating *model.Rating) (*model.Rating, error) {
	err := r.db.Create(rating).Error
	return rating, err
}

func (r pgRatingRepository) GetByID(id string) (*model.Rating, error) {
	rating := model.Rating{}
	err := r.db.Where("id = ?", id).Find(&rating).Error
	return &rating, err
}

func (r pgRatingRepository) GetByProductID(productID string) ([]model.Rating, error) {
	ratings := []model.Rating{}
	err := r.db.Where("product_id = ?", productID).Find(&ratings).Error
	return ratings, err
}

func (r pgRatingRepository) GetAverageByProductID(productID string) (float32, error) {
	var result = struct {
		Avg float32 `json:"avg,omitempty"`
	}{}
	err := r.db.Model(model.Rating{}).Where("product_id = ?", productID).Select("avg(star) as avg").Scan(&result).Error
	return result.Avg, err
}

func (r pgRatingRepository) Delete(ratingID string) error {
	err := r.db.Where("id = ?", ratingID).
		Delete(&model.Rating{}).Error

	return err
}
