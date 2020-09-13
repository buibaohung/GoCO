package product

import (
	"context"
	"net/http"

	"org_service/model"
	"org_service/repository"
	"org_service/util"
)

type GetProductByIDRequest struct {
	ProductID string `json:"product_id,omitempty"`
}

func MakeGetProductByIDEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*GetProductByIDRequest)
		if req == nil || req != nil && req.ProductID == "" {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		product, err := repo.Product.GetByID(c, req.ProductID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error get product")
		}

		return product, nil
	}
}
