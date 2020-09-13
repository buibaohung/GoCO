package product

import (
	"context"
	"org_service/model"
)

type ProductRepository interface {
	Create(ctx context.Context, product *model.Product) (*model.Product, error)
	GetByID(ctx context.Context, id string) (*model.Product, error)
	GetByFacilityID(ctx context.Context, facilityID string, order *model.QueryOrder, pagination model.Pagination) (products []model.Product, count int, err error)
	Delete(ctx context.Context, productID string) error
	Update(ctx context.Context, product model.Product) (*model.Product, error)
}
