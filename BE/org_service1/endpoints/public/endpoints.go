package public

import (
	"org_service/endpoints/auth/product"
	"org_service/endpoints/public/event"
	"org_service/endpoints/public/facility"
	"org_service/model"
	"org_service/repository"
)

type Endpoints struct {
	GetProduct       model.Endpoint
	GetProducts      model.Endpoint
	GetProductRating model.Endpoint
	Facility         facility.Endpoints
	Event            event.Endpoints
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		GetProduct:       MakeGetProductEndpoint(repo),
		GetProducts:      product.MakeGetProductsEndpoint(repo),
		GetProductRating: MakeGetProductRatingEndpoint(repo),
		Facility:         facility.NewEndpoints(repo),
		Event:            event.NewEndpoints(repo),
	}
}
