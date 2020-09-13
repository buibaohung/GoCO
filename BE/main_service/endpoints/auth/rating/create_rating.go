package rating

import (
	"context"
	"net/http"

	"main_service/model"
	"main_service/repository"
	"main_service/util"

	"github.com/jinzhu/gorm"
)

type CreateRatingRequest struct {
	Rating model.Rating `json:"rating,omitempty" validate:"nonzero"`
}

func MakeCreateRatingEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*CreateRatingRequest)
		if req == nil || req != nil && (req.Rating.Star < 0 || req.Rating.ProductID == "") {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		tokenPayload := util.GetTokenPayloadFromContext(c)
		user, err := repo.User.GetByID(tokenPayload.ID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1015, "Error get user")
		}
		req.Rating.UserID = user.ID

		// check product exist
		_, err = repo.Product.GetByID(req.Rating.ProductID)
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1020, "Product is not exist")
			}
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error get product")
		}

		rating, err := repo.Rating.Create(&req.Rating)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1040, "Error create rating")
		}

		return rating, nil
	}
}
