package product

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"main_service/endpoints/auth/product"
	productEndpoint "main_service/endpoints/auth/product"
	"main_service/model"
	"main_service/util"
)

// DecodeGetProducts .
func DecodeGetProducts(c *gin.Context) (interface{}, error) {
	req := &product.GetProductsRequest{}
	c.BindQuery(&req.Pagination)
	c.BindQuery(&req.QueryOrder)

	facilityID := c.Query("facility_id")
	req.FacilityID = facilityID

	return req, nil
}

// DecodeGetProductByID .
func DecodeGetProductByID(c *gin.Context) (interface{}, error) {
	productID := c.Param("id")

	req := &product.GetProductByIDRequest{
		ProductID: productID,
	}

	return req, nil
}

// DecodeDeleteProduct .
func DecodeDeleteProduct(c *gin.Context) (interface{}, error) {
	productID := c.Param("id")

	req := &product.DeleteProductRequest{
		ProductID: productID,
	}

	return req, nil
}

// DecodeUpdateProduct .
func DecodeUpdateProduct(c *gin.Context) (interface{}, error) {
	productID := c.Param("id")

	product := model.Product{}
	err := c.ShouldBind(&product)
	if err != nil {
		return nil, util.NewError(err, http.StatusNotAcceptable, 1000, "Invalid input")
	}

	product.ID = productID

	req := &productEndpoint.UpdateProductRequest{
		Product: product,
	}

	return req, nil
}
