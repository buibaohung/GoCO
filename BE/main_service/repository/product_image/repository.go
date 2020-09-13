package product_image

import (
	"main_service/model"
)

type ProductImageRepository interface {
	Create(productImage *model.ProductImage) (*model.ProductImage, error)
	GetByProductID(productID string) ([]model.ProductImage, error)
}
