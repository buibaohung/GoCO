package authentication

import (
	"org_service/endpoints/authentication"
	"org_service/util"

	"github.com/gin-gonic/gin"
)

// SetupRouter .
func SetupRouter(parrentRoute gin.IRouter, path string, endpoints authentication.Endpoints) {
	route := parrentRoute.Group(path)
	route.POST("/signup", util.ServeHttpForGin(endpoints.SignUp, &authentication.SignupRequest{}))
	route.POST("/signin", util.ServeHttpForGin(endpoints.SignIn, &authentication.SigninRequest{}))
}
