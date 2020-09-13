package facility

import (
	"context"
	"net/http"

	"main_service/model"
	"main_service/repository"
	"main_service/util"
)

type GetFacilityByIDResquest struct {
	FacilityID string `json:"facility_id,omitempty"`
}

type GetFacilityByIDResponse struct {
	Facility *model.Facility `json:"facility,omitempty"`
}

func MakeGetFacilityByIDEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*GetFacilityByIDResquest)
		if req == nil {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		facility, err := repo.Facility.GetByID(req.FacilityID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error get facilities")
		}

		resp := GetFacilityByIDResponse{
			Facility: facility,
		}

		return resp, nil
	}
}
