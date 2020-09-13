package public

import (
	"context"
	"encoding/json"
	"net/http"

	"google.golang.org/grpc/status"

	"org_service/config/grpc/client"
	pbProduct "org_service/config/grpc/proto/service/main/product"
	"org_service/model"
	"org_service/repository"
	"org_service/util"
)

type GetProductRequest struct {
	ProductID string `json:"product_id,omitempty"`
	// OR
	ProductItemID string `json:"product_item_id,omitempty"`
}

type GetProductResponse struct {
	model.Product
	Rating    float32              `json:"rating,omitempty"`
	Images    []string             `json:"images,omitempty"`
	RawImages []model.ProductImage `json:"raw_images,omitempty"`
}

func MakeGetProductEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*GetProductRequest)
		if req == nil || req != nil && (req.ProductID == "" && req.ProductItemID == "") {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		resp, err := client.GetClient().Product.GetByID(c, &pbProduct.GetByIDRequest{
			ProductId:     req.ProductID,
			ProductItemId: req.ProductItemID,
		})
		if err != nil {
			code := 1020
			msg := "Error get product"
			s, ok := status.FromError(err)
			if ok {
				code = int(s.Code())
				msg = s.Message()
			}
			return nil, util.NewError(err, http.StatusInternalServerError, code, msg)
		}

		res := GetProductResponse{}
		res.Rating = resp.Rating
		res.Images = resp.Images

		b, err := json.Marshal(resp.Product)
		if err == nil {
			json.Unmarshal(b, &res.Product)
		}

		b, err = json.Marshal(resp.RawImages)
		if err == nil {
			json.Unmarshal(b, &res.RawImages)
		}

		return res, nil
	}
}
