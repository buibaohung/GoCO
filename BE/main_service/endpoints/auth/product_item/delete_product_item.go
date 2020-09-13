package product_item

import (
	"context"
	"net/http"

	"main_service/model"
	"main_service/repository"
	"main_service/util"
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

		tokenPayload := util.GetTokenPayloadFromContext(c)

		productItem, err := repo.ProductItem.GetByID(req.ProductItemID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1025, "Error get product item")
		}

		product, err := repo.Product.GetByID(productItem.ProductID)
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

		err = repo.ProductItem.Delete(productItem.ID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1060, "Error delete product item")
		}

		return product, nil
	}
}
