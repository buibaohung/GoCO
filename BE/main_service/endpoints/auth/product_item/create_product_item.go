package product_item

import (
	"context"
	"net/http"

	"main_service/model"
	"main_service/repository"
	"main_service/util"
)

type CreateProductItemRequest struct {
	ProductItem model.ProductItem `json:"product_item,omitempty" validate:"nonzero"`
}

func MakeCreateProductItemEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*CreateProductItemRequest)
		if req == nil || req != nil && (req.ProductItem.ProductID == "") {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		tokenPayload := util.GetTokenPayloadFromContext(c)
		req.ProductItem.OwnerID = tokenPayload.Facility.ID

		product, err := repo.Product.GetByID(req.ProductItem.ProductID)
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

		productItem, err := repo.ProductItem.Create(&req.ProductItem)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1060, "Error create product item")
		}

		return productItem, nil
	}
}
