package admin

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"main_service/repository"
	"main_service/util"
)

type Middlewares struct {
	Auth gin.HandlerFunc
}

func MakeAuthMiddleware(repo repository.Repository) gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := c.Cookie("token")
		if err != nil || token == "" {
			token = c.Request.Header.Get("Authorization")
			prefix := "Bearer "
			if len(token) <= len(prefix) {
				util.Response.Abort(c, util.NewError(nil, http.StatusUnauthorized, 4000, "Unauthorized"))
				return
			}

			token = token[len(prefix):]
		}

		payload, err := util.ParseToken(token)
		if err != nil {
			util.Response.Abort(c, util.NewError(err, http.StatusUnauthorized, 4010, "Token invalid"))
			return
		}

		if payload.Role != "admin" {
			util.Response.Abort(c, util.NewError(nil, http.StatusUnauthorized, 4010, "Not permission token"))
			return
		}

		c.Set(util.KeyContext, payload)
		c.Next()
	}
}

func NewMiddlewares(repo repository.Repository) Middlewares {
	return Middlewares{
		Auth: MakeAuthMiddleware(repo),
	}
}
