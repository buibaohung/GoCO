package product

import (
	"org_service/model"
	"org_service/repository"
)

type Endpoints struct {
	GetProducts    model.Endpoint
	GetProductByID model.Endpoint
	CreateProduct  model.Endpoint
	DeleteProduct  model.Endpoint
	UpdateProduct  model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		GetProducts:    MakeGetProductsEndpoint(repo),
		GetProductByID: MakeGetProductByIDEndpoint(repo),
		CreateProduct:  MakeCreateProductEndpoint(repo),
		DeleteProduct:  MakeDeleteProductEndpoint(repo),
		UpdateProduct:  MakeUpdateProductEndpoint(repo),
	}
}
