package facility

import (
	"context"
	"net/http"
	"org_service/config/grpc/client"
	"org_service/util"

	"org_service/model"
	"org_service/repository"
)

type GetMyFacilityResponse struct {
	Facility *model.Facility `json:"facility,omitempty"`
}

func MakeGetMyFacilityEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		facility, err := repo.Facility.GetByEOSName(c, client.EOSName)
		if err != nil {
			return nil, util.NewError(nil, http.StatusInternalServerError, 1010, "Error get facility")
		}

		resp := GetMyFacilityResponse{Facility: facility}

		return resp, nil
	}
}
