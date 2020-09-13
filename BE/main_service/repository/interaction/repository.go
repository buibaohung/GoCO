package interaction

import (
	"main_service/model"
)

type InteractionRepository interface {
	Create(interaction *model.Interaction) (*model.Interaction, error)
	Update(interaction model.Interaction) (*model.Interaction, error)
	GetByUserIDAndProductID(userID string, productID string) (*model.Interaction, error)
}
