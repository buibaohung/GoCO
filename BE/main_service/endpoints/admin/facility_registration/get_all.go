package facility_registration

import (
	"context"
	"main_service/model"
	"main_service/repository"
	"main_service/util"
	"net/http"
)

type GetAllResponse struct {
	FacilityRegistrations []model.FacilityRegistration `json:"facility_registrations"`
}

func MakeGetAllEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		resp := GetAllResponse{}
		f, err := repo.FacilityRegistration.GetAll()
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1010, "Error get facility registrations")
		}
		resp.FacilityRegistrations = f

		return resp, nil
	}
}
