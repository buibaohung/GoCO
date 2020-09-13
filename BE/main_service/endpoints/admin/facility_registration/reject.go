package facility_registration

import (
	"context"
	"main_service/model"
	"main_service/repository"
	"main_service/util"
	"net/http"

	"github.com/jinzhu/gorm"
)

type RejectRequest struct {
	FacilityRegistrationID string `json:"facility_registration_id"`
}

type RejectResponse struct {
	Status string `json:"status,omitempty"`
}

func MakeRejectEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*RejectRequest)
		if req == nil || req != nil && (req.FacilityRegistrationID == "") {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		facilityRegistration, err := repo.FacilityRegistration.GetByID(req.FacilityRegistrationID)
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1020, "Facility registration not exist")
			}
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error get facility registration")
		}

		if facilityRegistration.Status != model.Pending {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1040, "Only pending facility registration can be rejected")
		}

		facilityRegistration.Status = model.Reject
		err = repo.FacilityRegistration.Update(facilityRegistration)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1050, "Error update facility registrations")
		}

		return RejectResponse{Status: "success"}, nil
	}
}
