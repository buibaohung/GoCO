package auth

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"

	"main_service/config/grpc/client"
	"main_service/config/grpc/proto/service/eos"
	"main_service/repository"
	"main_service/util"
)

type Middlewares struct {
	Auth     gin.HandlerFunc
	GRPCAuth func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error)
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

		c.Set(util.KeyContext, payload)
		c.Next()
	}
}

func MakeGRPCAuthMiddleware(repo repository.Repository) func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
		md, ok := metadata.FromIncomingContext(ctx)
		if !ok {
			return nil, status.Errorf(codes.InvalidArgument, "missing metadata")
		}

		authorization := md["authorization"]
		log.Println("xxx", authorization)
		if len(authorization) < 1 {
			return nil, status.Errorf(codes.InvalidArgument, "missing metadata")
		}

		privateKey := strings.TrimPrefix(authorization[0], "Bearer ")

		log.Println("priv", privateKey)
		eosClient := client.GetClient().EOS
		pub, err := eosClient.GetPubFromPriv(ctx, &eos.GetPubFromPrivRequest{PrivateKey: privateKey})
		log.Println("priv", pub, err)
		if err != nil {
			return nil, status.Errorf(codes.InvalidArgument, "invalid key")
		}

		facility, err := repo.Facility.GetByPublicKey(pub.PublicKey)
		log.Println(facility, err)
		if err != nil {
			return nil, status.Errorf(codes.Unauthenticated, "invalid key")
		}

		claims := &util.TokenClaims{}
		b, _ := json.Marshal(facility)
		json.Unmarshal(b, &claims.Facility)

		newCtx := util.SetTokenPayload(ctx, claims)
		return handler(newCtx, req)
	}
}

func NewMiddlewares(repo repository.Repository) Middlewares {
	return Middlewares{
		Auth:     MakeAuthMiddleware(repo),
		GRPCAuth: MakeGRPCAuthMiddleware(repo),
	}
}
