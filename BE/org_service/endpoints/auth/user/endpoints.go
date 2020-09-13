package user

import (
	"org_service/model"
	"org_service/repository"
)

type Endpoints struct {
	CreateUser  model.Endpoint
	GetUserByID model.Endpoint
	GetUsers    model.Endpoint
	UpdateUser  model.Endpoint
	DeleteUser  model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		CreateUser:  MakeCreateUserEndpoint(repo),
		GetUserByID: MakeGetUserByIDEndpoint(repo),
		GetUsers:    MakeGetUsersEndpoint(repo),
		UpdateUser:  MakeUpdateUserEndpoint(repo),
		DeleteUser:  MakeDeleteUserEndpoint(repo),
	}
}
