package model

import "time"

type Event struct {
	ID                    string    `json:"id,omitempty"`
	ProductItemID         string    `json:"product_item_id,omitempty"`
	Name                  EventType `json:"name,omitempty"`
	CreatedAt             time.Time `json:"created_at,omitempty"`
	FromFacilityID        string    `json:"from_facility_id,omitempty" sql:"default:null"`
	ToFacilityID          string    `json:"to_facility_id,omitempty" sql:"default:null"`
	DeliveredByFacilityID string    `json:"delivered_by_facility_id,omitempty" sql:"default:null"`
	SoldAt                time.Time `json:"sold_at,omitempty"`
	FromProductItemID     string    `json:"from_product_item_id,omitempty" sql:"default:null"`
	ToProductItemID       string    `json:"to_product_item_id,omitempty" sql:"default:null"`
	TransactionID         string    `json:"transaction_id,omitempty"`
}

type EventType string

const (
	// An event signifying the creation of an object. When you pick your apples from the farm.
	COMMISSION EventType = "COMMISSION"

	// An event signifying deletion of an object.
	DECOMMISSION EventType = "DECOMMISSION"

	// An event signifying an irreversible transformation of an object. An example would be making the puree out of your apples. You can’t reverse it. You can’t make apples out of apple puree.
	TRANSFORMATION EventType = "TRANSFORMATION"

	// An event signifying grouping of objects. For example, aggregating 10 apples as a case of apples and loading them.
	AGGREGATION EventType = "AGGREGATION"

	// Ungrouping objects to a smaller group. For example, disaggregating a pallet of apple to boxes of apples, boxes of apples to individual apples.
	DISAGGREGATION EventType = "DISAGGREGATION"

	// An event signifying an observation, such as scanning at the store.
	OBSERVATION EventType = "OBSERVATION"

	// START_DELIVERY .
	START_DELIVERY EventType = "START_DELIVERY"

	// FINISH_DELIVERY .
	FINISH_DELIVERY EventType = "FINISH_DELIVERY"

	// SOLD .
	SOLD EventType = "SOLD"
)

// Valid .
func (e EventType) Valid() bool {
	if e == COMMISSION ||
		e == DECOMMISSION ||
		e == TRANSFORMATION ||
		e == AGGREGATION ||
		e == DISAGGREGATION ||
		e == OBSERVATION ||
		e == START_DELIVERY ||
		e == FINISH_DELIVERY ||
		e == SOLD {
		return true
	}

	return false
}

type EventDisplay struct {
	Event
	FromFacilityName        string               `json:"from_facility_name,omitempty"`
	ToFacilityName          string               `json:"to_facility_name,omitempty"`
	DeliveredByFacilityName string               `json:"delivered_by_facility_name,omitempty"`
	Childrens               []ProductItemDisplay `json:"childrens,omitempty"`
}
