package product_item

import (
	"context"
	"fmt"
	"org_service/model"

	"github.com/jinzhu/gorm"
)

type pgProductItemRepository struct {
	db *gorm.DB
}

// NewPGProductItemRepository .
func NewPGProductItemRepository(db *gorm.DB) ProductItemRepository {
	return pgProductItemRepository{db}
}

func (r pgProductItemRepository) Create(ctx context.Context, productItem *model.ProductItem) (*model.ProductItem, error) {
	err := r.db.Create(productItem).Error
	return productItem, err
}

func (r pgProductItemRepository) GetByID(ctx context.Context, id string) (*model.ProductItem, error) {
	productItem := model.ProductItem{}
	err := r.db.Where("id = ?", id).Find(&productItem).Error
	return &productItem, err
}

func (r pgProductItemRepository) GetWithFilter(ctx context.Context, filter *model.ProductItemFilter, order *model.QueryOrder, pagination *model.Pagination) ([]model.ProductItem, error) {
	productItems := []model.ProductItem{}
	count := 0
	db := r.db.Debug()
	if filter != nil {
		if filter.ProductID != "" {
			db = db.Where("product_id = ?", filter.ProductID)
		}

		if filter.FacilityID != "" {
			subQuery := db.New().Table("products").Select("id").Where("facility_id = ? AND deleted_at IS NULL", filter.FacilityID).QueryExpr()
			db = db.Where("product_id IN (?)", subQuery)
		}
	}

	if order != nil && order.OrderField != "" && order.OrderBy != "" {
		db = db.Order(fmt.Sprintf("%s %s", order.OrderField, order.OrderBy))
	}

	if pagination != nil {
		db = db.
			Offset(pagination.Offset).
			Limit(pagination.Limit)
	}

	err := db.Find(&productItems).
		Offset(0).
		Limit(-1).
		Count(&count).Error

	pagination.Size = count

	return productItems, err
}

func (r pgProductItemRepository) Delete(ctx context.Context, productItemID string) error {
	err := r.db.Where("id = ?", productItemID).
		Delete(&model.ProductItem{}).Error

	return err
}
