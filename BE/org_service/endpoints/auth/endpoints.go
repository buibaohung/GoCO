package auth

import (
	"org_service/endpoints/auth/event"
	"org_service/endpoints/auth/product"
	"org_service/endpoints/auth/product_item"
	"org_service/endpoints/auth/user"
	"org_service/repository"
)

type Endpoints struct {
	Product     product.Endpoints
	ProductItem product_item.Endpoints
	Event       event.Endpoints
	User        user.Endpoints
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		Product:     product.NewEndpoints(repo),
		ProductItem: product_item.NewEndpoints(repo),
		Event:       event.NewEndpoints(repo),
		User:        user.NewEndpoints(repo),
	}
}
