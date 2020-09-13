package rating

import (
	"main_service/model"
	"main_service/repository"
)

type Endpoints struct {
	CreateRating model.Endpoint
	DeleteRating model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		CreateRating: MakeCreateRatingEndpoint(repo),
		DeleteRating: MakeDeleteRatingEndpoint(repo),
	}
}
