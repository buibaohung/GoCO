package location

import (
	"context"
	"location_service/model"
	"location_service/repository"
	"location_service/util"
	"net/http"

	"gopkg.in/validator.v2"
)

type GetLocationsRequest struct {
	ParentCode string `json:"parent_code,omitempty" validate:"nonzero"`
}

type GetLocationsResponse struct {
	Locations []model.Location `json:"locations"`
}

func MakeGetLocationsEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*GetLocationsRequest)
		if err := validator.Validate(*req); err != nil {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		locations, err := repo.Location.GetByParentCode(req.ParentCode)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error get locations")
		}

		res := GetLocationsResponse{
			Locations: locations,
		}

		return res, nil
	}
}
