package product

import (
	"context"
	"net/http"

	"org_service/model"
	"org_service/repository"
	"org_service/util"
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

		product, err := repo.Product.GetByID(c, req.ProductID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error get product")
		}

		err = repo.Product.Delete(c, req.ProductID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1060, "Error delete product")
		}

		return product, nil
	}
}
