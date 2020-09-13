package product

import (
	"context"
	"net/http"

	"main_service/model"
	"main_service/repository"
	"main_service/util"
)

type DeleteProductRequest struct {
	ProductID string `json:"product_id,omitempty"`
}

func MakeDeleteProductEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*DeleteProductRequest)
		if req == nil || req != nil && req.ProductID == "" {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		tokenPayload := util.GetTokenPayloadFromContext(c)

		product, err := repo.Product.GetByID(req.ProductID)
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

		err = repo.Product.Delete(req.ProductID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1060, "Error delete product")
		}

		return product, nil
	}
}
