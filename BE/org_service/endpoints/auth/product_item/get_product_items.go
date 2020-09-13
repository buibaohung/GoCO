package product_item

import (
	"context"
	"net/http"

	"org_service/model"
	"org_service/repository"
	"org_service/util"
)

type GetProductItemsRequest struct {
	Pagination model.Pagination
	QueryOrder model.QueryOrder
	Filter     model.ProductItemFilter
}

type GetProductItemsResponse struct {
	ProductItems []model.ProductItemDisplay `json:"product_items"`
	Pagination   model.Pagination           `json:"pagination,omitempty"`
}

func MakeGetProductItemsEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*GetProductItemsRequest)
		if req == nil {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		productItems, err := repo.ProductItem.GetWithFilter(c, &req.Filter, &req.QueryOrder, &req.Pagination)
		if err != nil {
			return nil, util.NewError(nil, http.StatusInternalServerError, 1020, "Error get product items")
		}

		displays := []model.ProductItemDisplay{}
		for _, productItem := range productItems {
			product, err := repo.Product.GetByID(c, productItem.ProductID)
			if err != nil {
				return nil, util.NewError(nil, http.StatusInternalServerError, 1030, "Error get product")
			}

			display := model.ProductItemDisplay{
				ProductItem: productItem,
				ProductName: product.Name,
			}

			displays = append(displays, display)
		}

		resp := GetProductItemsResponse{
			ProductItems: displays,
			Pagination:   req.Pagination,
		}

		return resp, nil
	}
}
