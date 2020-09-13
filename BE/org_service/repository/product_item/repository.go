package product_item

import (
	"context"
	"org_service/model"
)

type ProductItemRepository interface {
	Create(ctx context.Context, productItem *model.ProductItem) (*model.ProductItem, error)
	GetByID(ctx context.Context, id string) (*model.ProductItem, error)
	GetWithFilter(ctx context.Context, filter *model.ProductItemFilter, order *model.QueryOrder, pagination *model.Pagination) (productItems []model.ProductItem, err error)
	Delete(ctx context.Context, productItemID string) error
}
