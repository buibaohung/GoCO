package event

import (
	"main_service/model"
)

type EventRepository interface {
	Create(event *model.Event) (*model.Event, error)
	GetByID(id string) (*model.Event, error)
	GetByProductItemID(productItemID string) ([]model.Event, error)
	GetByToProductItemID(toProductItemID string) (*model.Event, error)
	GetAggregationByProductItemID(productItemID string) (*model.Event, error)
	GetByNameAndProductItemID(name model.EventType, productItemID string) ([]model.Event, error)
}
