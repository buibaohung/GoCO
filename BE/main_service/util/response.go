package util

import (
	"log"

	"github.com/gin-gonic/gin"
)

type response struct {
}

var Response response

func (response) Success(c *gin.Context, data interface{}) {
	c.JSON(200, data)
}

func (response) Error(c *gin.Context, err MyError) {
	log.Println(err.Raw)
	c.JSON(err.HttpCode, gin.H{
		"code":    err.ErrorCode,
		"message": err.Message,
	})
}

func (response) Abort(c *gin.Context, err MyError) {
	log.Println(err.Raw)
	c.AbortWithStatusJSON(err.HttpCode, gin.H{
		"code":    err.ErrorCode,
		"message": err.Message,
	})
}
