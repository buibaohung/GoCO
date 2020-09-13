package event

import (
	"main_service/model"

	"github.com/jinzhu/gorm"
)

type pgEventRepository struct {
	db *gorm.DB
}

// NewPGEventRepository .
func NewPGEventRepository(db *gorm.DB) EventRepository {
	return pgEventRepository{db}
}

func (r pgEventRepository) Create(event *model.Event) (*model.Event, error) {
	err := r.db.Create(event).Error
	return event, err
}

func (r pgEventRepository) GetByID(id string) (*model.Event, error) {
	event := model.Event{}
	err := r.db.Where("id = ?", id).Find(&event).Error
	return &event, err
}

func (r pgEventRepository) GetByProductItemID(productItemID string) ([]model.Event, error) {
	events := []model.Event{}
	err := r.db.Where("product_item_id = ?", productItemID).Find(&events).Error
	return events, err
}

func (r pgEventRepository) GetByToProductItemID(toProductItemID string) (*model.Event, error) {
	event := model.Event{}
	err := r.db.Where("to_product_item_id = ?", toProductItemID).Find(&event).Error
	return &event, err
}

func (r pgEventRepository) GetAggregationByProductItemID(productItemID string) (*model.Event, error) {
	db := r.db
	event := model.Event{}

	subQuery := db.New().Table("event_aggregations").Select("event_id").Where("product_item_id = ? AND deleted_at IS NULL", productItemID).QueryExpr()
	err := db.Where("id IN (?)", subQuery).Find(&event).Error

	return &event, err
}

func (r pgEventRepository) GetByNameAndProductItemID(name model.EventType, productItemID string) ([]model.Event, error) {
	events := []model.Event{}
	err := r.db.Where("name = ? AND product_item_id = ?", name, productItemID).Find(&events).Error
	return events, err
}
