package public

import (
	"context"
	"main_service/model"
	"main_service/repository"
	"main_service/util"
	"net/http"

	"github.com/jinzhu/gorm"
	"gopkg.in/validator.v2"
)

type GetProductRatingRequest struct {
	ProductID string `json:"product_id,omitempty" validate:"nonzero"`
}

type GetProductRatingResponse struct {
	Ratings []model.RatingDisplay `json:"ratings"`
}

func MakeGetProductRatingEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*GetProductRatingRequest)
		if err := validator.Validate(*req); err != nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		res := GetProductRatingResponse{
			Ratings: []model.RatingDisplay{},
		}

		_, err = repo.Product.GetByID(req.ProductID)
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1020, "Product is not exist")
			}
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error get product")
		}

		ratings, _ := repo.Rating.GetByProductID(req.ProductID)
		for _, rating := range ratings {
			user, err := repo.User.GetByID(rating.UserID)
			if err != nil {
				continue
			}

			voteRatings, err := repo.VoteRating.GetByRatingID(rating.ID)
			if err != nil {
				continue
			}
			like := 0
			dislike := 0
			stakeLike := 0
			stakeDislike := 0
			for _, voteRating := range voteRatings {
				if voteRating.Like == 1 {
					like++
					stakeLike += voteRating.Stake
				} else {
					dislike++
					stakeDislike += voteRating.Stake
				}
			}

			ratingDis := model.RatingDisplay{
				Rating:       rating,
				UserName:     user.Name,
				Like:         like,
				Dislike:      dislike,
				StakeLike:    stakeLike,
				StakeDislike: stakeDislike,
			}
			res.Ratings = append(res.Ratings, ratingDis)
		}

		return res, nil
	}
}
