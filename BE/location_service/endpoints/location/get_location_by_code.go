package location

import (
	"context"
	"location_service/model"
	"location_service/repository"
	"location_service/util"
	"net/http"

	"github.com/jinzhu/gorm"
	"gopkg.in/validator.v2"
)

type GetLocationByCodeRequest struct {
	Code string `json:"code,omitempty" validate:"nonzero"`
}

type GetLocationByCodeResponse struct {
	Location *model.Location `json:"location,omitempty"`
}

func MakeGetLocationByCodeEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*GetLocationByCodeRequest)
		if err := validator.Validate(*req); err != nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		location, err := repo.Location.GetByCode(req.Code)
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1020, "Location is not exist")
			}
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error get location")
		}

		res := GetLocationByCodeResponse{
			Location: location,
		}

		return res, nil
	}
}
