package product

import (
	"context"
	"net/http"

	"org_service/model"
	"org_service/repository"
	"org_service/util"
)

type GetProductsRequest struct {
	Pagination model.Pagination
	QueryOrder model.QueryOrder
	FacilityID string `json:"facility_id,omitempty"`
}

type GetProductsResponse struct {
	Products   []model.Product  `json:"products"`
	Pagination model.Pagination `json:"pagination,omitempty"`
}

func MakeGetProductsEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*GetProductsRequest)
		if req == nil || req != nil && (req.FacilityID == "") {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		products, count, err := repo.Product.GetByFacilityID(c, req.FacilityID, &req.QueryOrder, req.Pagination)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error get products")
		}

		resp := GetProductsResponse{
			Products:   products,
			Pagination: req.Pagination,
		}
		resp.Pagination.Size = count

		return resp, nil
	}
}
