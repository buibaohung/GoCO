package facility

import (
	"context"
	"org_service/model"
)

type FacilityRepository interface {
	Create(ctx context.Context, facility *model.Facility) (*model.Facility, error)
	GetByID(ctx context.Context, id string) (*model.Facility, error)
	GetByEOSName(ctx context.Context, name string) (*model.Facility, error)
}
