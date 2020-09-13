package public

import (
	"main_service/endpoints/auth/product"
	"main_service/endpoints/public/event"
	"main_service/endpoints/public/facility"
	"main_service/endpoints/public/facility_registration"
	"main_service/model"
	"main_service/repository"
)

type Endpoints struct {
	GetProduct           model.Endpoint
	GetProducts          model.Endpoint
	GetRecommendProducts model.Endpoint
	GetProductRating     model.Endpoint
	FacilityRegistration facility_registration.Endpoints
	Facility             facility.Endpoints
	Event                event.Endpoints
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		GetProduct:           MakeGetProductEndpoint(repo),
		GetProducts:          product.MakeGetProductsEndpoint(repo),
		GetRecommendProducts: MakeGetRecommendProductsEndpoint(repo),
		GetProductRating:     MakeGetProductRatingEndpoint(repo),
		FacilityRegistration: facility_registration.NewEndpoints(repo),
		Facility:             facility.NewEndpoints(repo),
		Event:                event.NewEndpoints(repo),
	}
}
