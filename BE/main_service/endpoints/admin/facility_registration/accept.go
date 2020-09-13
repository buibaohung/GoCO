package facility_registration

import (
	"context"
	"net/http"

	"github.com/jinzhu/gorm"

	"main_service/config/grpc/client"
	"main_service/config/grpc/proto/domain"
	"main_service/model"
	"main_service/repository"
	"main_service/util"
)

type AcceptRequest struct {
	FacilityRegistrationID string `json:"facility_registration_id"`
}

type AcceptResponse struct {
	Status string `json:"status,omitempty"`
}

func MakeAcceptEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*AcceptRequest)
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
			return nil, util.NewError(err, http.StatusNotAcceptable, 1040, "Only pending facility registration can be accepted")
		}

		// TODO: use transaction

		// create facility
		id, err := repo.System.NextID("facilities_id_seq")
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1090, "Error create facility")
		}

		fac := &domain.Facility{
			Id:          id,
			Name:        facilityRegistration.FacilityName,
			Type:        string(facilityRegistration.FacilityType),
			EosUsername: facilityRegistration.EosUsername,
			Email:       facilityRegistration.Email,
			PhoneNumber: facilityRegistration.PhoneNumber,
			Location:    facilityRegistration.Location,
			Website:     facilityRegistration.Website,
		}
		_, err = client.GetClient().EOS.NewFacility(c, fac)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1100, "Error create facility")
		}

		// update status
		facilityRegistration.Status = model.Accept
		err = repo.FacilityRegistration.Update(facilityRegistration)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1050, "Error update facility registrations")
		}

		return AcceptResponse{Status: "success"}, nil
	}
}
