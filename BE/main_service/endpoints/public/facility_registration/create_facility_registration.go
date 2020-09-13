package facility_registration

import (
	"context"
	"net/http"

	"main_service/model"
	"main_service/repository"
	"main_service/util"
)

type CreateFacilityRegistrationRequest struct {
	model.FacilityRegistration
}

func MakeCreateFacilityRegistrationEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*CreateFacilityRegistrationRequest)
		if req == nil || req != nil &&
			(req.FacilityName == "" ||
				req.FacilityType == "" ||
				req.PhoneNumber == "" ||
				req.EosUsername == "" ||
				req.Email == "" ||
				req.Location == "" ||
				req.Website == "") {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		valid := req.FacilityType.Valid()
		if !valid {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1020, "Facility type is not supported")
		}

		exist, err := repo.FacilityRegistration.CheckExistByFacilityName(req.FacilityName)
		if err != nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1030, "Error create facility registration")
		}
		if exist {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1040, "Facility name has exist")
		}

		req.FacilityRegistration.Status = model.Pending
		facilityRegistration, err := repo.FacilityRegistration.Create(&req.FacilityRegistration)
		if err != nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1070, "Error create facility registration")
		}

		return facilityRegistration, nil
	}
}
