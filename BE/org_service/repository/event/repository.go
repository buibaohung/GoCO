package event

import (
	"context"

	"org_service/model"
)

type EventRepository interface {
	Create(ctx context.Context, event *model.Event) (*model.Event, error)
}
