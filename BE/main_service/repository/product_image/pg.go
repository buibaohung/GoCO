package product_image

import (
	"main_service/model"

	"github.com/jinzhu/gorm"
)

type pgProductImageRepository struct {
	db *gorm.DB
}

// NewPGProductImageRepository .
func NewPGProductImageRepository(db *gorm.DB) ProductImageRepository {
	return pgProductImageRepository{db}
}

func (r pgProductImageRepository) Create(productImage *model.ProductImage) (*model.ProductImage, error) {
	err := r.db.Create(productImage).Error
	return productImage, err
}

func (r pgProductImageRepository) GetByProductID(productID string) ([]model.ProductImage, error) {
	productImages := []model.ProductImage{}
	err := r.db.Where("product_id = ?", productID).Find(&productImages).Error
	return productImages, err
}
