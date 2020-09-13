package product

import (
	"context"
	"mime/multipart"
	"net/http"

	"org_service/config/ipfs"
	"org_service/model"
	"org_service/repository"
	"org_service/util"
)

type CreateProductRequest struct {
	Product model.Product           `json:"product,omitempty"`
	Avatar  *multipart.FileHeader   `json:"avatar,omitempty"`
	Images  []*multipart.FileHeader `json:"images,omitempty"`
}

func MakeCreateProductEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*CreateProductRequest)
		if req == nil || req != nil && (req.Product.Name == "" || req.Product.FacilityID == "") {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		// get id
		id, err := repo.System.NextID(c, "products")
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error get product id")
		}
		req.Product.ID = id

		// upload avatar to ipfs
		ipfsShell := ipfs.GetIpfsShell()
		f, err := req.Avatar.Open()
		if err != nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1050, "Error open avatar")
		}

		ipfsHash, err := ipfsShell.Add(f)
		if err != nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1060, "Error save avatar")
		}
		req.Product.Avatar = ipfsHash

		// upload images to ipfs
		images := []*model.ProductImage{}
		for _, file := range req.Images {
			f, err := file.Open()
			if err != nil {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1070, "Error open image")
			}

			ipfsHash, err := ipfsShell.Add(f)
			if err != nil {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1080, "Error save image")
			}

			// get image id
			id, err := repo.System.NextID(c, "product_images")
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1085, "Error get image id")
			}
			img := &model.ProductImage{
				ID:        id,
				ProductID: req.Product.ID,
				ImageID:   ipfsHash,
			}
			images = append(images, img)
		}

		// save db
		product, err := repo.Product.Create(c, &req.Product)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1090, "Error create product")
		}

		for _, image := range images {
			_, err = repo.ProductImage.Create(c, image)
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1100, "Error save file")
			}
		}

		return product, nil
	}
}
