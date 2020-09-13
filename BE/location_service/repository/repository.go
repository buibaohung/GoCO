package repository

import (
	"location_service/config/database"
	"location_service/repository/location"
)

type Repository struct {
	Location location.LocationRepository
}

func New() Repository {
	db := database.GetDB()
	return Repository{
		Location: location.NewPGLocationRepository(db),
	}
}
