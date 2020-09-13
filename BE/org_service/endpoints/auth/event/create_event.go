package event

import (
	"context"
	"net/http"
	"time"

	"org_service/config/grpc/client"
	pbEvent "org_service/config/grpc/proto/service/main/event"
	"org_service/model"
	"org_service/repository"
	"org_service/util"

	"google.golang.org/grpc/status"
)

type CreateEventRequest struct {
	Event       model.Event `json:"event,omitempty" validate:"nonzero"`
	ToProductID string      `json:"to_product_id,omitempty"`
	Price       int         `json:"price,omitempty"`
	ExpiryDate  time.Time   `json:"expiry_date,omitempty"`
}

type CreateEventResponse struct {
	Event            *model.Event `json:"event,omitempty"`
	NewProductItemID string       `json:"new_product_item_id,omitempty"`
}

func MakeCreateEventEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (response interface{}, err error) {
		req := request.(*CreateEventRequest)
		if req == nil || req != nil && (req.Event.Name == "" || req.Event.ProductItemID == "") {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		valid := req.Event.Name.Valid()
		if !valid {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1020, "Event name is not supported")
		}

		productItem, err := repo.ProductItem.GetByID(c, req.Event.ProductItemID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1053, "Error get product item 'from_product_item_id'")
		}

		req.Event.CreatedAt = time.Now()
		var newProductItemID string
		switch req.Event.Name {
		case model.START_DELIVERY:
			if req.Event.FromFacilityID == "" || req.Event.ToFacilityID == "" || req.Event.DeliveredByFacilityID == "" {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1030, "Event 'delivery' must have 'from_facility_id' and 'to_facility_id'")
			}
			_, err = repo.Facility.GetByID(c, req.Event.FromFacilityID)
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1033, "Error get facility 'from_facility_id'")
			}
			_, err = repo.Facility.GetByID(c, req.Event.ToFacilityID)
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1036, "Error get facility 'to_facility_id'")
			}
			_, err = repo.Facility.GetByID(c, req.Event.DeliveredByFacilityID)
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1036, "Error get facility 'to_facility_id'")
			}
		case model.FINISH_DELIVERY:
			resp, err := client.GetClient().Event.GetByNameAndProductItemID(c, &pbEvent.GetByNameAndProductItemIDRequest{
				Name:          string(model.START_DELIVERY),
				ProductItemId: req.Event.ProductItemID,
			})
			if err != nil {
				code := 1038
				msg := "'FINISH_DELIVERY' must have 'START_DELIVERY' before"
				s, ok := status.FromError(err)
				if ok {
					code = int(s.Code())
					msg = s.Message()
				}
				return nil, util.NewError(err, http.StatusInternalServerError, code, msg)
			}

			if len(resp.Events) == 0 {
				return nil, util.NewError(nil, http.StatusInternalServerError, 1040, "'FINISH_DELIVERY' must have 'START_DELIVERY' before")
			}

			lastStartDeliveryEvent := resp.Events[len(resp.Events)-1]
			req.Event.FromFacilityID = lastStartDeliveryEvent.FromFacilityId
			req.Event.ToFacilityID = lastStartDeliveryEvent.ToFacilityId
			req.Event.DeliveredByFacilityID = lastStartDeliveryEvent.DeliveredByFacilityId

		case model.TRANSFORMATION:
			if req.Event.FromProductItemID == "" || req.ToProductID == "" {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1050, "Event 'process' must have 'from_product_item_id' and 'to_product_item_id'")
			}

			_, err = repo.ProductItem.GetByID(c, req.Event.FromProductItemID)
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1053, "Error get product item 'from_product_item_id'")
			}

			_, err = repo.Product.GetByID(c, req.ToProductID)
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1056, "Error get product 'to_product_item_id'")
			}
			// get id
			id, err := repo.System.NextID(c, "product_items")
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error get product id")
			}

			toProductItem := &model.ProductItem{
				ID:                id,
				ProductID:         req.ToProductID,
				FromProductItemID: req.Event.FromProductItemID,
				OwnerID:           productItem.OwnerID,
				ExpiryDate:        req.ExpiryDate,
				Price:             req.Price,
			}
			// save
			toProductItem, err = repo.ProductItem.Create(c, toProductItem)
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1060, "Error create product item")
			}
			req.Event.ToProductItemID = toProductItem.ID
			newProductItemID = toProductItem.ID
		case model.SOLD:
			req.Event.SoldAt = req.Event.CreatedAt
		case model.OBSERVATION:
			valid := req.Event.Quality.Valid()
			if !valid {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1040, "Event 'observation' must have 'quality'")
			}
		case model.AGGREGATION:
			if len(req.Event.ProductItemIds) == 0 || req.ToProductID == "" {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1050, "Event 'aggregation' must have 'from_product_item_id' and 'to_product_item_id'")
			}

			expiryDate := time.Unix(0, 0)
			price := 0
			for _, productItemId := range req.Event.ProductItemIds {
				productItem, err := repo.ProductItem.GetByID(c, productItemId)
				if err != nil {
					return nil, util.NewError(err, http.StatusNotAcceptable, 1055, "Error 'product_item_id' not exist")
				}

				if expiryDate.Unix() == 0 || productItem.ExpiryDate.Unix() <= expiryDate.Unix() {
					expiryDate = productItem.ExpiryDate
				}

				price += productItem.Price
			}

			// get id
			id, err := repo.System.NextID(c, "product_items")
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error get product id")
			}

			toProductItem := &model.ProductItem{
				ID:         id,
				ProductID:  req.ToProductID,
				OwnerID:    productItem.OwnerID,
				ExpiryDate: expiryDate,
				Price:      price,
			}
			// save
			toProductItem, err = repo.ProductItem.Create(c, toProductItem)
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1060, "Error create product item")
			}
			req.Event.ToProductItemID = toProductItem.ID
			newProductItemID = toProductItem.ID
		}

		// get id
		id, err := repo.System.NextID(c, "events")
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1020, "Error get product id")
		}
		req.Event.ID = id
		event, err := repo.Event.Create(c, &req.Event)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1090, "Error create event")
		}

		resp := CreateEventResponse{
			Event:            event,
			NewProductItemID: newProductItemID,
		}

		return resp, nil
	}
}
