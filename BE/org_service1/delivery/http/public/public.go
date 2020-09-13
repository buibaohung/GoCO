package public

import (
	"org_service/endpoints/public"
	"org_service/model"
	"org_service/util"

	"github.com/gin-gonic/gin"
)

// SetupRouter .
func SetupRouter(parrentRoute gin.IRouter, path string, endpoints public.Endpoints) {
	route := parrentRoute.Group(path)
	route.GET("/products", util.ServeHTTPForGin(
		DecodeGetProducts,
		endpoints.GetProducts,
	))
	route.GET("/products/:id", util.ServeHTTPForGin(
		DecodeGetProduct,
		endpoints.GetProduct,
	))
	route.GET("/products/:id/ratings", util.ServeHTTPForGin(
		DecodeGetProductRating,
		endpoints.GetProductRating,
	))

	route.GET("/product-items/:id", util.ServeHTTPForGin(
		DecodeGetProductItem,
		endpoints.GetProduct,
	))

	route.GET("/facility-type", util.ServeHttpForGin(endpoints.Facility.GetFacilityType, &model.Facility{}))
	route.GET("/facility/info", util.ServeHttpForGin(endpoints.Facility.GetMyFacility, &model.Facility{}))
	route.GET("/event-type", util.ServeHttpForGin(endpoints.Event.GetEventType, &model.Event{}))
}
