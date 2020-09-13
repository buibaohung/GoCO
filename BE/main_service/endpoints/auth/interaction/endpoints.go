package interaction

import (
	"main_service/model"
	"main_service/repository"
)

type Endpoints struct {
	TrackViews    model.Endpoint
	TrackTimeView model.Endpoint
}

func NewEndpoints(repo repository.Repository) Endpoints {
	return Endpoints{
		TrackViews:    MakeTrackViewsEndpoint(repo),
		TrackTimeView: MakeTrackTimeViewEndpoint(repo),
	}
}
