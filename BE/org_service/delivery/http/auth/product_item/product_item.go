package product_item

import (
	"org_service/endpoints/auth/product_item"
	"org_service/util"

	"github.com/gin-gonic/gin"
)

// SetupRouter .
func SetupRouter(parrentRoute gin.IRouter, path string, endpoints product_item.Endpoints) {
	route := parrentRoute.Group(path)

	route.GET("", util.ServeHTTPForGin(
		DecodeGetProductItems,
		endpoints.GetProductItems,
	))
	route.DELETE("/:id", util.ServeHTTPForGin(
		DecodeDeleteProductItem,
		endpoints.DeleteProductItem,
	))
	route.POST("", util.ServeHttpForGin(endpoints.CreateProductItem, &product_item.CreateProductItemRequest{}))
}
