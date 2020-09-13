package product_item

import (
	"main_service/model"
)

type ProductItemRepository interface {
	Create(productItem *model.ProductItem) (*model.ProductItem, error)
	GetByID(id string) (*model.ProductItem, error)
	GetWithFilter(filter *model.ProductItemFilter, order *model.QueryOrder, pagination *model.Pagination) (productItems []model.ProductItem, err error)
	Delete(productItemID string) error
	GetByAggregationID(eventID string) ([]string, error)
}
