package system

import (
	"context"
)

type SystemRepository interface {
	NextID(context.Context, string) (string, error)
}
