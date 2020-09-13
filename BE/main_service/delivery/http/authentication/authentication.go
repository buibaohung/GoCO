package authentication

import (
	"main_service/endpoints/authentication"
	"main_service/util"

	"github.com/gin-gonic/gin"
)

// SetupRouter .
func SetupRouter(parrentRoute gin.IRouter, path string, endpoints authentication.Endpoints) {
	route := parrentRoute.Group(path)
	route.POST("/signup", util.ServeHttpForGin(endpoints.SignUp, &authentication.SignupRequest{}))
	route.POST("/signin", util.ServeHttpForGin(endpoints.SignIn, &authentication.SigninRequest{}))
	route.POST("/signin-by-private-key", util.ServeHttpForGin(endpoints.SignInByPrivateKey, &authentication.SignInByPrivateKeyRequest{}))
}
