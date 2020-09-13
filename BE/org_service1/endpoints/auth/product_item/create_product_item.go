package product_item

import (
	"context"
	"net/http"
	"time"

	"org_service/model"
	"org_service/repository"
	"org_service/util"
)

type CreateProductItemRequest struct {
	ProductItem model.ProductItem `json:"product_item,omitempty" validate:"nonzero"`
}

func MakeCreateProductItemEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*CreateProductItemRequest)
		if req == nil || req != nil && (req.ProductItem.ProductID == "") {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		// get id
		id, err := repo.System.NextID(c, "product_items")
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error get product id")
		}
		req.ProductItem.ID = id

		// save
		productItem, err := repo.ProductItem.Create(c, &req.ProductItem)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1060, "Error create product item")
		}

		// create COMMISSION event
		// get id
		event := &model.Event{
			ProductItemID: productItem.ID,
			Name:          model.COMMISSION,
			CreatedAt:     time.Now(),
		}
		id, err = repo.System.NextID(c, "events")
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error get product id")
		}
		event.ID = id
		event, err = repo.Event.Create(c, event)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1090, "Error create event")
		}

		return productItem, nil
	}
}
