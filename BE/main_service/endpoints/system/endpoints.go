package system

import (
	"main_service/model"
	"main_service/repository"
)

type Endpoints struct {
	NextID model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		NextID: MakeNextIDEndpoint(repo),
	}
}
