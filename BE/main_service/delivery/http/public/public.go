package public

import (
	"main_service/endpoints/public"
	"main_service/endpoints/public/facility_registration"
	"main_service/model"
	"main_service/util"

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
	route.GET("/products/:id/recommend", util.ServeHTTPForGin(
		DecodeGetRecommendProducts,
		endpoints.GetRecommendProducts,
	))

	route.GET("/product-items/:id", util.ServeHTTPForGin(
		DecodeGetProductItem,
		endpoints.GetProduct,
	))
	route.GET("/product-items/:id/events", util.ServeHTTPForGin(
		DecodeGetEventsByProductItem,
		endpoints.Event.GetEventsByProductItem,
	))

	route.POST("/facility-registration", util.ServeHttpForGin(endpoints.FacilityRegistration.CreateFacilityRegistration, &facility_registration.CreateFacilityRegistrationRequest{}))
	route.GET("/facility-type", util.ServeHttpForGin(endpoints.Facility.GetFacilityType, &model.Facility{}))
	route.GET("/facilities", util.ServeHTTPForGin(
		DecodeGetFacilitiesByType,
		endpoints.Facility.GetFacilitiesByType,
	))
	route.GET("/facilities/:id", util.ServeHTTPForGin(
		DecodeGetFacilityByID,
		endpoints.Facility.GetFacilityByID,
	))

	route.GET("/event-type", util.ServeHttpForGin(endpoints.Event.GetEventType, &model.Event{}))
}
