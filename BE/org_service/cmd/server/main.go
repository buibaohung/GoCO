package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/grpc-ecosystem/go-grpc-middleware/util/metautils"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"google.golang.org/grpc/metadata"

	"org_service/config/database"
	grpcClient "org_service/config/grpc/client"
	"org_service/config/ipfs"
	"org_service/delivery/http"
	"org_service/endpoints"
	"org_service/repository"
	"org_service/util"
)

func ctxWithToken(ctx context.Context, scheme string, token string) context.Context {
	md := metadata.Pairs("authorization", fmt.Sprintf("%s %v", scheme, token))
	nCtx := metautils.NiceMD(md).ToOutgoing(ctx)
	return nCtx
}

func main() {
	port := util.GetEnv("HTTP_PORT", "3005")

	database.Init()

	ipfs.Init()

	_, closeGRPCConn := grpcClient.New()
	defer closeGRPCConn()

	// resp, err := grpcClient.GetClient().Product.Create(context.Background(), &pbProduct.CreateRequest{
	// 	Product: &domain.Product{
	// 		Name:        "xxx",
	// 		Description: "des",
	// 		FacilityId:  "14685485934842882",
	// 		Avatar:      "QmYgHTKXv2ARniosBa7XXCHK6Aa11fvdPFtrDKQ4N8Szvq",
	// 	},
	// 	Images: []string{
	// 		"QmYgHTKXv2ARniosBa7XXCHK6Aa11fvdPFtrDKQ4N8Szvq",
	// 		"QmYgHTKXv2ARniosBa7XXCHK6Aa11fvdPFtrDKQ4N8Szvq",
	// 	},
	// })
	// pp.Println(resp, err)

	repo := repository.New()

	e := endpoints.New(repo)

	r := http.Init(e)

	errs := make(chan error)
	go func() {
		c := make(chan os.Signal)
		signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
		errs <- fmt.Errorf("%s", <-c)
	}()

	go func() {
		errs <- r.Run(":" + port)
	}()

	log.Println("exit", <-errs)
}
