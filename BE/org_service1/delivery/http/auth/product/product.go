package product

import (
	"org_service/endpoints/auth/product"
	"org_service/util"

	"github.com/gin-gonic/gin"
)

// SetupRouter .
func SetupRouter(parrentRoute gin.IRouter, path string, endpoints product.Endpoints) {
	route := parrentRoute.Group(path)

	route.GET("", util.ServeHTTPForGin(
		DecodeGetProducts,
		endpoints.GetProducts,
	))
	route.POST("", util.ServeHTTPForGin(
		DecodeCreateProduct,
		endpoints.CreateProduct,
	))
	route.GET("/:id", util.ServeHTTPForGin(
		DecodeGetProductByID,
		endpoints.GetProductByID,
	))
	route.DELETE("/:id", util.ServeHTTPForGin(
		DecodeDeleteProduct,
		endpoints.DeleteProduct,
	))
	route.PUT("/:id", util.ServeHTTPForGin(
		DecodeUpdateProduct,
		endpoints.UpdateProduct,
	))
}
