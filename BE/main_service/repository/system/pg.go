package system

import (
	"github.com/jinzhu/gorm"
)

type pgSystemRepository struct {
	db *gorm.DB
}

// NewPGSystemRepository .
func NewPGSystemRepository(db *gorm.DB) SystemRepository {
	return pgSystemRepository{db}
}

func (r pgSystemRepository) NextID(tableName string) (string, error) {
	type Result struct {
		ID string `json:"id,omitempty"`
	}
	var result Result
	err := r.db.Raw("SELECT next_id_r(?) as id", tableName).Scan(&result).Error
	return result.ID, err
}
