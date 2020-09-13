package interaction

import (
	"github.com/jinzhu/gorm"

	"main_service/model"
)

type pgInteractionRepository struct {
	db *gorm.DB
}

// NewPGInteractionRepository .
func NewPGInteractionRepository(db *gorm.DB) InteractionRepository {
	return pgInteractionRepository{db}
}

func (r pgInteractionRepository) Create(interaction *model.Interaction) (*model.Interaction, error) {
	err := r.db.Create(interaction).Error
	return interaction, err
}

func (r pgInteractionRepository) GetByUserIDAndProductID(userID string, productID string) (*model.Interaction, error) {
	interaction := model.Interaction{}
	err := r.db.Where("user_id = ? AND product_id = ?", userID, productID).Find(&interaction).Error
	return &interaction, err
}

func (r pgInteractionRepository) Update(interaction model.Interaction) (*model.Interaction, error) {
	err := r.db.Model(&interaction).Updates(interaction).Error
	return &interaction, err
}
