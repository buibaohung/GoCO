package model

import (
	"context"

	"github.com/gin-gonic/gin"
)

type Endpoint func(ctx context.Context, request interface{}) (response interface{}, err error)
type Decode func(ctx *gin.Context) (response interface{}, err error)
