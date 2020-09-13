package rating

import (
	"main_service/model"
)

type RatingRepository interface {
	Create(*model.Rating) (*model.Rating, error)
	GetByID(id string) (*model.Rating, error)
	GetByProductID(productID string) ([]model.Rating, error)
	GetAverageByProductID(productID string) (float32, error)
	Delete(ratingID string) error
}
