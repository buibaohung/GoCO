package product_item

import (
	"org_service/model"
	"org_service/repository"
)

type Endpoints struct {
	CreateProductItem model.Endpoint
	GetProductItems   model.Endpoint
	DeleteProductItem model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		CreateProductItem: MakeCreateProductItemEndpoint(repo),
		GetProductItems:   MakeGetProductItemsEndpoint(repo),
		DeleteProductItem: MakeDeleteProductItemEndpoint(repo),
	}
}
