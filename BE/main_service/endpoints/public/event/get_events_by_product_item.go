package event

import (
	"context"
	"net/http"

	"github.com/jinzhu/gorm"
	"gopkg.in/validator.v2"

	"main_service/model"
	"main_service/repository"
	"main_service/util"
)

type GetEventsByProductItemResquest struct {
	ProductItemID string `json:"product_item_id,omitempty" validate:"nonzero"`
}

type GetEventsByProductItemResponse struct {
	Events []model.EventDisplay `json:"events"`
}

func MakeGetEventsByProductItemEndpoint(repo repository.Repository) model.Endpoint {
	return func(c context.Context, request interface{}) (interface{}, error) {
		req := request.(*GetEventsByProductItemResquest)
		if err := validator.Validate(*req); err != nil {
			return err, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
		}

		events, err := repo.Event.GetByProductItemID(req.ProductItemID)
		if err != nil {
			return err, util.NewError(err, http.StatusInternalServerError, 1020, "Error get event")
		}

		eventPrev, err := repo.Event.GetByToProductItemID(req.ProductItemID)
		if err != nil && err != gorm.ErrRecordNotFound {
			return err, util.NewError(err, http.StatusInternalServerError, 1030, "Error get event")
		}
		if err == nil {
			events = append([]model.Event{*eventPrev}, events...)
		}

		eventAggregation, err := repo.Event.GetAggregationByProductItemID(req.ProductItemID)
		if err != nil && err != gorm.ErrRecordNotFound {
			return err, util.NewError(err, http.StatusInternalServerError, 1035, "Error get event")
		}
		if err == nil {
			// check if not exist -> append
			exist := false
			for i := 0; i < len(events); i++ {
				if eventAggregation.ID == events[i].ID {
					exist = true
				}
			}

			if !exist {
				events = append(events, *eventAggregation)
			}
		}

		resp := GetEventsByProductItemResponse{}

		for i := 0; i < len(events); i++ {
			event := events[i]

			eventDisplay := model.EventDisplay{
				Event: event,
			}

			if event.FromFacilityID != "" {
				fromFac, err := repo.Facility.GetByID(event.FromFacilityID)
				if err != nil {
					return nil, util.NewError(err, http.StatusInternalServerError, 1040, "Error get from facility for event")
				}
				eventDisplay.FromFacilityName = fromFac.Name
			}

			if event.ToFacilityID != "" {
				toFac, err := repo.Facility.GetByID(event.ToFacilityID)
				if err != nil {
					return nil, util.NewError(err, http.StatusInternalServerError, 1050, "Error get to facility for event")
				}
				eventDisplay.ToFacilityName = toFac.Name
			}

			if event.DeliveredByFacilityID != "" {
				byFac, err := repo.Facility.GetByID(event.DeliveredByFacilityID)
				if err != nil {
					return nil, util.NewError(err, http.StatusInternalServerError, 1050, "Error get by facility for event")
				}
				eventDisplay.DeliveredByFacilityName = byFac.Name
			}

			switch event.Name {
			case model.AGGREGATION:
				productItemIDs, err := repo.ProductItem.GetByAggregationID(event.ID)
				if err != nil {
					return nil, util.NewError(err, http.StatusInternalServerError, 1040, "Error get event")
				}

				// get display for children
				for _, productItemID := range productItemIDs {
					itemDisplay := model.ProductItemDisplay{}
					pItem, err := repo.ProductItem.GetByID(productItemID)
					if err != nil {
						continue
					}
					itemDisplay.ProductItem.ID = pItem.ID
					itemDisplay.ProductItem.ProductID = pItem.ProductID

					product, err := repo.Product.GetByID(pItem.ProductID)
					if err != nil {
						continue
					}
					itemDisplay.ProductName = product.Name
					itemDisplay.Avatar = product.Avatar

					eventDisplay.Childrens = append(eventDisplay.Childrens, itemDisplay)
				}

				// get DISAGGREGATION event
				// get group ID
				es, err := repo.Event.GetByProductItemID(event.ToProductItemID)
				if err != nil {
					return nil, util.NewError(err, http.StatusInternalServerError, 1050, "Error get DISAGGREGATION event")
				}

				for _, e := range es {
					if e.Name == model.DISAGGREGATION {
						// check if not exist -> append
						exist := false
						for i := 0; i < len(events); i++ {
							if e.ID == events[i].ID {
								exist = true
							}
						}

						if !exist {
							// add `e` to `events`
							tmp := make([]model.Event, i+1)
							copy(tmp, events[:i+1])
							tmp = append(tmp, e)
							tmp = append(tmp, events[i+1:]...)
							events = tmp
						}
						break
					}
				}
			}

			resp.Events = append(resp.Events, eventDisplay)
		}

		return resp, nil
	}
}
