package event

import (
	"context"
	"net/http"

	"main_service/model"
	"main_service/repository"
	"main_service/util"
)

type GetByNameAndProductItemIDRequest struct {
	ProductItemID string          `json:"product_item_id,omitempty" validate:"nonzero"`
	Name          model.EventType `json:"name,omitempty" validate:"nonzero"`
}

func MakeGetByNameAndProductItemIDEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*GetByNameAndProductItemIDRequest)
		if req == nil || req != nil && (req.ProductItemID == "") {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		valid := req.Name.Valid()
		if !valid {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1020, "Event name is not supported")
		}

		events, err := repo.Event.GetByNameAndProductItemID(req.Name, req.ProductItemID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error get events")
		}

		return events, nil
	}
}
