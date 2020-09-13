package product

import (
	"encoding/json"
	"mime/multipart"
	"net/http"

	"github.com/gin-gonic/gin"

	"org_service/endpoints/auth/product"
	productEndpoint "org_service/endpoints/auth/product"
	"org_service/model"
	"org_service/util"
)

// DecodeCreateProduct .
func DecodeCreateProduct(c *gin.Context) (interface{}, error) {
	productForm := c.PostForm("product")
	product := model.Product{}
	err := json.Unmarshal([]byte(productForm), &product)
	if err != nil {
		return nil, util.NewError(err, http.StatusNotAcceptable, 1000, "Invalid input")
	}

	form, err := c.MultipartForm()
	if err != nil {
		return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
	}

	avatars := form.File["avatar"]
	var avatar *multipart.FileHeader
	if len(avatars) > 0 {
		avatar = avatars[0]
	}
	images := form.File["images"]

	req := &productEndpoint.CreateProductRequest{
		Product: product,
		Avatar:  avatar,
		Images:  images,
	}

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

	productForm := c.PostForm("product")
	product := model.Product{}
	err := json.Unmarshal([]byte(productForm), &product)
	if err != nil {
		return nil, util.NewError(err, http.StatusNotAcceptable, 1000, "Invalid input")
	}
	product.ID = productID

	deleteImageIdsForm := c.PostForm("delete_image_ids")
	deleteImageIds := []string{}
	if deleteImageIdsForm != "" {
		err = json.Unmarshal([]byte(deleteImageIdsForm), &deleteImageIds)
		if err != nil {
			return nil, util.NewError(err, http.StatusNotAcceptable, 1000, "Invalid input")
		}
	}

	form, err := c.MultipartForm()
	if err != nil {
		return nil, util.NewError(err, http.StatusNotAcceptable, 1010, "Invalid input")
	}

	avatars := form.File["avatar"]
	var avatar *multipart.FileHeader
	if len(avatars) > 0 {
		avatar = avatars[0]
	}
	images := form.File["images"]

	req := &productEndpoint.UpdateProductRequest{
		Product:        product,
		DeleteImageIds: deleteImageIds,
		Avatar:         avatar,
		Images:         images,
	}

	return req, nil
}
