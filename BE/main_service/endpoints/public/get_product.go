package public

import (
	"context"
	"log"
	"main_service/config/ipfs"
	"main_service/model"
	"main_service/repository"
	"main_service/util"
	"net/http"

	"github.com/jinzhu/gorm"
)

type GetProductRequest struct {
	ProductID string `json:"product_id,omitempty"`
	// OR
	ProductItemID string `json:"product_item_id,omitempty"`
}

type GetProductResponse struct {
	model.Product
	Price     int                  `json:"price,omitempty"`
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

		// get product id if miss
		price := 0
		if req.ProductItemID != "" {
			productItem, err := repo.ProductItem.GetByID(req.ProductItemID)
			if err != nil {
				if err == gorm.ErrRecordNotFound {
					return nil, util.NewError(err, http.StatusNotAcceptable, 1013, "Product item is not exist")
				}
				return nil, util.NewError(err, http.StatusInternalServerError, 1016, "Error get product item")
			}

			req.ProductID = productItem.ProductID
			price = productItem.Price
		}

		res := GetProductResponse{}

		product, err := repo.Product.GetByID(req.ProductID)
		if err != nil {
			if err == gorm.ErrRecordNotFound {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1020, "Product is not exist")
			}
			log.Println("---HieuBD---22", err)
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error get product")
		}
		res.Product = *product
		res.Price = price

		imgs, _ := repo.ProductImage.GetByProductID(product.ID)
		for _, img := range imgs {
			res.Images = append(res.Images, ipfs.IPFSBaseURL+"/"+img.ImageID)
		}
		res.RawImages = imgs

		res.Rating, _ = repo.Rating.GetAverageByProductID(product.ID)

		return res, nil
	}
}
