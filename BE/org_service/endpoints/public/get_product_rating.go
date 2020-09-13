package public

import (
	"context"
	"net/http"
	"org_service/model"
	"org_service/repository"
	"org_service/util"

	"github.com/jinzhu/gorm"
	"gopkg.in/validator.v2"
)

type GetProductRatingRequest struct {
	ProductID string `json:"product_id,omitempty" validate:"nonzero"`
}

type GetProductRatingResponse struct {
	Ratings []model.Rating `json:"ratings"`
}

func MakeGetProductRatingEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*GetProductRatingRequest)
		if err := validator.Validate(*req); err != nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		res := GetProductRatingResponse{}

		_, err = repo.Product.GetByID(c, req.ProductID)
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1020, "Product is not exist")
			}
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error get product")
		}

		ratings, _ := repo.Rating.GetByProductID(req.ProductID)
		res.Ratings = ratings

		return res, nil
	}
}
