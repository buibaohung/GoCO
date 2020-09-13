package facility

import (
	"context"

	"org_service/model"
	"org_service/repository"
)

type GetFacilityTypeResponse struct {
	FacilityTypes []model.FacilityType `json:"facility_types,omitempty"`
}

func MakeGetFacilityTypeEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		resp := GetFacilityTypeResponse{
			FacilityTypes: []model.FacilityType{
				model.GROWER,
				model.MANUFACTURER_OF_GOODS,
				model.POINT_OF_SALE,
				model.TRANSPORTATION_CARRIER,
				model.WAREHOUSE_KEEPER,
			},
		}

		return resp, nil
	}
}
