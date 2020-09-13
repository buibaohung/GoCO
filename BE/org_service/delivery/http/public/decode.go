package public

import (
	"org_service/endpoints/auth/product"
	"org_service/endpoints/public"

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

func DecodeGetProductRating(c *gin.Context) (interface{}, error) {
	req := &public.GetProductRatingRequest{}
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
