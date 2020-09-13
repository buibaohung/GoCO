package public

import (
	"main_service/endpoints/auth/product"
	"main_service/endpoints/public"
	"main_service/endpoints/public/event"
	"main_service/endpoints/public/facility"

	"github.com/gin-gonic/gin"
)

func DecodeGetProduct(c *gin.Context) (interface{}, error) {
	req := &public.GetProductRequest{}
	req.ProductID = c.Param("id")

	return req, nil
}

func DecodeGetProductItem(c *gin.Context) (interface{}, error) {
	req := &public.GetProductRequest{}
	req.ProductItemID = c.Param("id")

	return req, nil
}

func DecodeGetEventsByProductItem(c *gin.Context) (interface{}, error) {
	req := &event.GetEventsByProductItemResquest{}
	req.ProductItemID = c.Param("id")

	return req, nil
}

func DecodeGetProductRating(c *gin.Context) (interface{}, error) {
	req := &public.GetProductRatingRequest{}
	req.ProductID = c.Param("id")

	return req, nil
}

// DecodeGetRecommendProducts .
func DecodeGetRecommendProducts(c *gin.Context) (interface{}, error) {
	req := &public.GetRecommendProductsRequest{}
	req.ProductID = c.Param("id")

	return req, nil
}

// DecodeGetProducts .
func DecodeGetProducts(c *gin.Context) (interface{}, error) {
	req := &product.GetProductsRequest{}
	c.BindQuery(&req.Pagination)
	c.BindQuery(&req.QueryOrder)

	facilityID := c.Query("facility_id")
	req.FacilityID = facilityID

	return req, nil
}

func DecodeGetFacilitiesByType(c *gin.Context) (interface{}, error) {
	req := &facility.GetFacilitiesByTypeResquest{}
	c.BindQuery(req)
	return req, nil
}

func DecodeGetFacilityByID(c *gin.Context) (interface{}, error) {
	req := &facility.GetFacilityByIDResquest{}
	req.FacilityID = c.Param("id")

	return req, nil
}
