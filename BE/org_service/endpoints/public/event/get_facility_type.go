package event

import (
	"context"

	"org_service/model"
	"org_service/repository"
)

type GetEventTypeResponse struct {
	EventTypes []model.EventType `json:"event_types"`
}

func MakeGetEventTypeEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		resp := GetEventTypeResponse{
			EventTypes: []model.EventType{
				model.COMMISSION,
				model.DECOMMISSION,
				model.TRANSFORMATION,
				model.AGGREGATION,
				model.DISAGGREGATION,
				model.OBSERVATION,
				model.START_DELIVERY,
				model.FINISH_DELIVERY,
				model.SOLD,
			},
		}

		return resp, nil
	}
}
