package product_item

import (
	"context"
	"net/http"

	"org_service/model"
	"org_service/repository"
	"org_service/util"
)

type DeleteProductItemRequest struct {
	ProductItemID string `json:"product_item_id,omitempty"`
}

func MakeDeleteProductItemEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*DeleteProductItemRequest)
		if req == nil || req != nil && req.ProductItemID == "" {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		err = repo.ProductItem.Delete(c, req.ProductItemID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1060, "Error delete product item")
		}

		return true, nil
	}
}
