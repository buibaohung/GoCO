package auth

import (
	"main_service/delivery/http/auth/interaction"
	"main_service/delivery/http/auth/product"
	"main_service/delivery/http/auth/product_item"
	"main_service/delivery/http/auth/profile"
	"main_service/delivery/http/auth/rating"
	"main_service/endpoints/auth"
	"main_service/endpoints/auth/event"

	"main_service/util"

	"github.com/gin-gonic/gin"
)

// SetupRouter .
func SetupRouter(parrentRoute gin.IRouter, path string, endpoints auth.Endpoints, middlewares auth.Middlewares) {
	route := parrentRoute.Group(path)
	route.Use(middlewares.Auth)

	product.SetupRouter(route, "/products", endpoints.Product)
	product_item.SetupRouter(route, "/product_items", endpoints.ProductItem)
	rating.SetupRouter(route, "/ratings", endpoints.Rating)
	profile.SetupRouter(route, "/profile", endpoints.Profile)
	interaction.SetupRouter(route, "/interactions", endpoints.Interaction)
	route.POST("/events", util.ServeHttpForGin(endpoints.Event.CreateEvent, &event.CreateEventRequest{}))
}
