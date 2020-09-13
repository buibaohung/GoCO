package product

import (
	"main_service/model"
	"main_service/repository"
)

type Endpoints struct {
	GetProducts    model.Endpoint
	GetProductByID model.Endpoint
	DeleteProduct  model.Endpoint
	UpdateProduct  model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		GetProducts:    MakeGetProductsEndpoint(repo),
		GetProductByID: MakeGetProductByIDEndpoint(repo),
		DeleteProduct:  MakeDeleteProductEndpoint(repo),
		UpdateProduct:  MakeUpdateProductEndpoint(repo),
	}
}
