package public

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"main_service/config/recommend"
	"main_service/model"
	"main_service/repository"
	"main_service/util"
)

type GetRecommendProductsRequest struct {
	ProductID string `json:"product_id,omitempty"`
}

type GetRecommendProductsResponse struct {
	Products []model.ProductDisplay `json:"products"`
}

func MakeGetRecommendProductsEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*GetRecommendProductsRequest)

		if req == nil || req != nil && (req.ProductID == "") {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		httpReq, _ := http.NewRequest("GET", recommend.GetUrl()+fmt.Sprintf("/products/%s/recommend", req.ProductID), nil)

		res, _ := http.DefaultClient.Do(httpReq)

		defer func() {
			res.Body.Close()
		}()
		body, _ := ioutil.ReadAll(res.Body)

		products := []model.ProductDisplay{}
		productIDs := []int64{}
		err := json.Unmarshal(body, &productIDs)
		if err == nil {
			for _, productID := range productIDs {
				product, err := repo.Product.GetByID(strconv.FormatInt(productID, 10))
				if err != nil {
					continue
				}

				rating, _ := repo.Rating.GetAverageByProductID(product.ID)

				display := model.ProductDisplay{
					Product: *product,
					Rating:  rating,
				}

				products = append(products, display)
			}
		}

		resp := GetRecommendProductsResponse{Products: products}
		return resp, nil
	}
}
