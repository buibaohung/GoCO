package product

import (
	"main_service/model"
)

type ProductRepository interface {
	Create(product *model.Product) (*model.Product, error)
	GetByID(id string) (*model.Product, error)
	GetByFacilityID(facilityID string, order *model.QueryOrder, pagination model.Pagination) (products []model.Product, count int, err error)
	Delete(productID string) error
	Update(product model.Product) (*model.Product, error)
}
