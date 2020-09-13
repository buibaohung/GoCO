package main

import (
	"fmt"
	"log"
	"main_service/endpoints"
	"main_service/repository"
	"os"
	"os/signal"
	"syscall"

	"main_service/config/database"
	grpcClient "main_service/config/grpc/client"
	"main_service/config/ipfs"
	"main_service/delivery/grpc"
	"main_service/delivery/http"

	_ "github.com/jinzhu/gorm/dialects/postgres"
)

func main() {
	db := database.Init()
	defer db.Close()

	ipfs.Init()

	_, closeGRPCConn := grpcClient.New()
	defer closeGRPCConn()

	repo := repository.New()

	e := endpoints.New(repo)

	errs := make(chan error)
	go func() {
		c := make(chan os.Signal)
		signal.Notify(c, syscall.SIGINT, syscall.SIGTERM)
		errs <- fmt.Errorf("%s", <-c)
	}()

	go func() {
		errs <- grpc.NewServer(e)
	}()

	go func() {
		errs <- http.NewServer(e)
	}()

	log.Println("exit", <-errs)
}
