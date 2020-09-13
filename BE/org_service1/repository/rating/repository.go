package rating

import (
	"org_service/model"
)

type RatingRepository interface {
	Create(*model.Rating) (*model.Rating, error)
	GetByID(id string) (*model.Rating, error)
	GetByProductID(productID string) ([]model.Rating, error)
	GetAverageByProductID(productID string) (float64, error)
	Delete(ratingID string) error
}
