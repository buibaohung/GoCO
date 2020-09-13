package product

import (
	"context"
	"fmt"

	"github.com/jinzhu/gorm"

	"org_service/config/ipfs"
	"org_service/model"
)

type pgProductRepository struct {
	db *gorm.DB
}

// NewPGProductRepository .
func NewPGProductRepository(db *gorm.DB) ProductRepository {
	return pgProductRepository{db}
}

func (r pgProductRepository) Create(ctx context.Context, product *model.Product) (*model.Product, error) {
	err := r.db.Create(product).Error
	return product, err
}

func (r pgProductRepository) GetByID(ctx context.Context, id string) (*model.Product, error) {
	product := model.Product{}
	err := r.db.Where("id = ?", id).Find(&product).Error
	product.Avatar = ipfs.IPFSBaseURL + "/" + product.Avatar
	return &product, err
}

func (r pgProductRepository) GetByFacilityID(ctx context.Context, facilityID string, order *model.QueryOrder, pagination model.Pagination) ([]model.Product, int, error) {
	products := []model.Product{}
	count := 0
	db := r.db.Where("facility_id = ?", facilityID)

	if order != nil {
		if order.OrderField == "" {
			order.OrderField = "created_at"
		}

		if order.OrderBy == "" {
			order.OrderBy = "desc"
		}

		db = db.Order(fmt.Sprintf("%s %s", order.OrderField, order.OrderBy))
	}

	err := db.Offset(pagination.Offset).
		Limit(pagination.Limit).
		Find(&products).
		Offset(0).
		Limit(-1).
		Count(&count).Error

	for i := 0; i < len(products); i++ {
		if products[i].Avatar != "" {
			products[i].Avatar = ipfs.IPFSBaseURL + "/" + products[i].Avatar
		}
	}
	return products, count, err
}

func (r pgProductRepository) Delete(ctx context.Context, productID string) error {
	err := r.db.Where("id = ?", productID).
		Delete(&model.Product{}).Error

	return err
}

func (r pgProductRepository) Update(ctx context.Context, product model.Product) (*model.Product, error) {
	err := r.db.Model(&product).Updates(product).Error
	return &product, err
}
