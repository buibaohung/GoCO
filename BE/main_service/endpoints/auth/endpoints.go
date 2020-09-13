package auth

import (
	"main_service/endpoints/auth/event"
	"main_service/endpoints/auth/interaction"
	"main_service/endpoints/auth/product"
	"main_service/endpoints/auth/product_item"
	"main_service/endpoints/auth/profile"
	"main_service/endpoints/auth/rating"
	"main_service/repository"
)

type Endpoints struct {
	Product     product.Endpoints
	ProductItem product_item.Endpoints
	Event       event.Endpoints
	Rating      rating.Endpoints
	Profile     profile.Endpoints
	Interaction interaction.Endpoints
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		Product:     product.NewEndpoints(repo),
		ProductItem: product_item.NewEndpoints(repo),
		Event:       event.NewEndpoints(repo),
		Rating:      rating.NewEndpoints(repo),
		Profile:     profile.NewEndpoints(repo),
		Interaction: interaction.NewEndpoints(repo),
	}
}
