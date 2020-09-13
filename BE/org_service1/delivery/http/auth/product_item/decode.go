package product_item

import (
	"org_service/endpoints/auth/product_item"

	"github.com/gin-gonic/gin"
)

// DecodeGetProductItems .
func DecodeGetProductItems(c *gin.Context) (interface{}, error) {
	req := &product_item.GetProductItemsRequest{}
	c.BindQuery(&req.Filter)
	c.BindQuery(&req.Pagination)
	c.BindQuery(&req.QueryOrder)

	return req, nil
}

// DecodeDeleteProductItem .
func DecodeDeleteProductItem(c *gin.Context) (interface{}, error) {
	productItemID := c.Param("id")

	req := &product_item.DeleteProductItemRequest{
		ProductItemID: productItemID,
	}

	return req, nil
}
