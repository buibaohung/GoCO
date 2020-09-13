package event

import (
	"context"
	"net/http"

	"main_service/model"
	"main_service/repository"
	"main_service/util"
)

type CreateEventRequest struct {
	Event model.Event `json:"event,omitempty" validate:"nonzero"`
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

		switch req.Event.Name {
		case model.START_DELIVERY:
			if req.Event.FromFacilityID == "" || req.Event.ToFacilityID == "" {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1030, "Event 'delivery' must have 'from_facility_id' and 'to_facility_id'")
			}
			_, err = repo.Facility.GetByID(req.Event.FromFacilityID)
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1033, "Error get facility 'from_facility_id'")
			}
			_, err = repo.Facility.GetByID(req.Event.ToFacilityID)
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1036, "Error get facility 'to_facility_id'")
			}
		case model.SOLD:
			if req.Event.SoldAt.Unix() <= 0 {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1040, "Event 'sold' must have 'sold_at'")
			}
		case model.TRANSFORMATION:
			if req.Event.FromProductItemID == "" || req.Event.ToProductItemID == "" {
				return nil, util.NewError(err, http.StatusNotAcceptable, 1050, "Event 'process' must have 'from_product_item_id' and 'to_product_item_id'")
			}
			_, err = repo.ProductItem.GetByID(req.Event.FromProductItemID)
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1053, "Error get product item 'from_product_item_id'")
			}
			_, err = repo.ProductItem.GetByID(req.Event.ToProductItemID)
			if err != nil {
				return nil, util.NewError(err, http.StatusInternalServerError, 1056, "Error get product item 'to_product_item_id'")
			}
		}

		tokenPayload := util.GetTokenPayloadFromContext(c)
		_, err = repo.User.GetByID(tokenPayload.ID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1060, "Error get user")
		}

		productItem, err := repo.ProductItem.GetByID(req.Event.ProductItemID)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1070, "Error get product item")
		}

		if tokenPayload.ID != productItem.OwnerID {
			return nil, util.NewError(err, http.StatusInternalServerError, 1080, "Permission deny")
		}

		event, err := repo.Event.Create(&req.Event)
		if err != nil {
			return nil, util.NewError(err, http.StatusInternalServerError, 1090, "Error create event")
		}

		// go func() {
		// 	e := &eos.NewEventRequest{
		// 		Event: &domain.Event{
		// 			Id:                event.ID,
		// 			Name:              string(event.Name),
		// 			ProductItemId:     event.ProductItemID,
		// 			CreatedAt:         event.CreatedAt.Unix(),
		// 			FromFacilityId:    event.FromFacilityID,
		// 			ToFacilityId:      event.ToFacilityID,
		// 			SoldAt:            event.SoldAt.Unix(),
		// 			FromProductItemId: event.FromProductItemID,
		// 			ToProductItemId:   event.ToProductItemID,
		// 		},
		// 		EosAccount: &domain.EosAccount{
		// 			Name:       user.EosUsername,
		// 			PrivateKey: user.PrivateKey,
		// 		},
		// 	}
		// 	_, err = client.GetClient().EOS.NewEvent(c, e)
		// 	if err != nil {
		// 		log.Println(err)
		// 	}
		// }()

		return event, nil
	}
}
