package product

import (
	"context"
	"net/http"

	"main_service/model"
	"main_service/repository"
	"main_service/util"
)

type UpdateProductRequest struct {
	Product model.Product `json:"product,omitempty"`
}

func MakeUpdateProductEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*UpdateProductRequest)
		if req == nil || req != nil && req.Product.ID == "" {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		tokenPayload := util.GetTokenPayloadFromContext(c)

		product, err := repo.Product.GetByID(req.Product.ID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error get product")
		}

		facility, err := repo.Facility.GetByID(product.FacilityID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1040, "Error get facility")
		}

		if tokenPayload.Facility.ID != facility.ID {
			return nil, util.NewError(err, http.StatusInternalServerError, 1050, "Permission deny")
		}

		_, err = repo.Product.Update(req.Product)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1060, "Error update facility")
		}

		return product, nil
	}
}
