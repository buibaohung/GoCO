package product

import (
	"context"
	"mime/multipart"
	"net/http"
	"sync"

	"org_service/config/ipfs"
	"org_service/model"
	"org_service/repository"
	"org_service/util"
)

type UpdateProductRequest struct {
	Product        model.Product           `json:"product,omitempty"`
	DeleteImageIds []string                `json:"delete_image_ids,omitempty"`
	Avatar         *multipart.FileHeader   `json:"avatar,omitempty"`
	Images         []*multipart.FileHeader `json:"images,omitempty"`
}

func MakeUpdateProductEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*UpdateProductRequest)
		if req == nil || req != nil && req.Product.ID == "" {
			return nil, util.NewError(nil, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		product, err := repo.Product.GetByID(c, req.Product.ID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1030, "Error get product")
		}

		// upload avatar
		ipfsShell := ipfs.GetIpfsShell()
		req.Product.Avatar = ""
		if req.Avatar != nil {
			f, err := req.Avatar.Open()
			if err != nil {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1050, "Error open avatar")
			}

			ipfsHash, err := ipfsShell.Add(f)
			if err != nil {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1060, "Error save avatar")
			}
			req.Product.Avatar = ipfsHash
		}

		// upload images
		errs := []util.MyError{}
		mutex := sync.Mutex{}

		var wg sync.WaitGroup
		for _, file := range req.Images {
			wg.Add(1)
			go func(file *multipart.FileHeader, wg *sync.WaitGroup) {
				defer wg.Done()

				f, err := file.Open()
				if err != nil {
					mutex.Lock()
					errs = append(errs, util.NewError(err, http.StatusNotAcceptable, 1070, "Error open image"))
					mutex.Unlock()
					return
				}

				ipfsHash, err := ipfsShell.Add(f)
				if err != nil {
					mutex.Lock()
					errs = append(errs, util.NewError(err, http.StatusNotAcceptable, 1080, "Error save image"))
					mutex.Unlock()
					return
				}

				// get image id
				id, err := repo.System.NextID(c, "product_images")
				if err != nil {
					mutex.Lock()
					errs = append(errs, util.NewError(err, http.StatusInternalServerError, 1085, "Error get image id"))
					mutex.Unlock()
					return
				}
				img := &model.ProductImage{
					ID:        id,
					ProductID: req.Product.ID,
					ImageID:   ipfsHash,
				}
				_, err = repo.ProductImage.Create(c, img)
				if err != nil {
					mutex.Lock()
					errs = append(errs, util.NewError(err, http.StatusInternalServerError, 1100, "Error save file"))
					mutex.Unlock()
					return
				}
			}(file, &wg)
		}
		wg.Wait()
		if len(errs) > 0 {
			return nil, errs[0]
		}

		// delete old images
		for _, imageID := range req.DeleteImageIds {
			wg.Add(1)
			go func(id string) {
				defer wg.Done()
				repo.ProductImage.DeleteByID(c, id)
			}(imageID)
		}
		wg.Wait()

		req.Product.FacilityID = ""
		_, err = repo.Product.Update(c, req.Product)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1060, "Error update facility")
		}

		return product, nil
	}
}
