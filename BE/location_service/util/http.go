package util

import (
	"location_service/model"
	"net/http"
	"reflect"

	"github.com/gin-gonic/gin"
)

// ServeHttpForGin .
func ServeHttpForGin(e model.Endpoint, requestType interface{}) func(c *gin.Context) {
	return func(c *gin.Context) {
		// get request type
		typ := reflect.TypeOf(requestType)
		req := reflect.New(typ.Elem()).Interface()

		err := c.ShouldBind(req)
		if err != nil {
			Response.Error(c, NewError(err, http.StatusNotAcceptable, 1000, "Invalid input"))
			return
		}

		resp, err := e(c, req)
		if err != nil {
			Response.Error(c, err.(MyError))
			return
		}

		Response.Success(c, resp)
	}
}

// ServeHTTPForGin .
func ServeHTTPForGin(decode model.Decode, endpoint model.Endpoint) func(c *gin.Context) {
	return func(c *gin.Context) {
		req, err := decode(c)
		if err != nil {
			Response.Error(c, err.(MyError))
			return
		}

		resp, err := endpoint(c, req)
		if err != nil {
			Response.Error(c, err.(MyError))
			return
		}

		Response.Success(c, resp)
	}
}
