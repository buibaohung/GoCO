package product_image

import (
	"context"
	"org_service/model"
)

type ProductImageRepository interface {
	Create(ctx context.Context, productImage *model.ProductImage) (*model.ProductImage, error)
	DeleteByProductID(ctx context.Context, productID string) error
	DeleteByID(ctx context.Context, id string) error
}
