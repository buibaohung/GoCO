package auth

import (
	"github.com/gin-gonic/gin"

	"org_service/delivery/http/auth/product"
	"org_service/delivery/http/auth/product_item"
	"org_service/delivery/http/auth/user"
	"org_service/endpoints/auth"
	"org_service/endpoints/auth/event"
	"org_service/util"
)

// SetupRouter .
func SetupRouter(parrentRoute gin.IRouter, path string, endpoints auth.Endpoints, middlewares auth.Middlewares) {
	route := parrentRoute.Group(path)
	route.Use(middlewares.Auth)

	product.SetupRouter(route, "/products", endpoints.Product)
	user.SetupRouter(route, "/users", endpoints.User)
	product_item.SetupRouter(route, "/product_items", endpoints.ProductItem)
	route.POST("/events", util.ServeHttpForGin(endpoints.Event.CreateEvent, &event.CreateEventRequest{}))
}
