package facility

import (
	"context"
	"net/http"

	"main_service/model"
	"main_service/repository"
	"main_service/util"
)

type GetFacilitiesByTypeResquest struct {
	Type model.FacilityType `json:"type,omitempty" form:"type"`
}

type GetFacilitiesByTypeResponse struct {
	Facilities []model.Facility `json:"facilities"`
}

func MakeFacilitiesByTypeEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*GetFacilitiesByTypeResquest)
		if req == nil {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		facilities, err := repo.Facility.GetByType(req.Type)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error get facilities")
		}

		resp := GetFacilitiesByTypeResponse{
			Facilities: facilities,
		}

		return resp, nil
	}
}
