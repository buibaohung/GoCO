package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"

	_ "github.com/jinzhu/gorm/dialects/sqlite"

	"location_service/config/database"
	"location_service/delivery/http"
	"location_service/endpoints"
	"location_service/repository"
	"location_service/util"
)

func main() {
	port := util.GetEnv("PORT", "3006")

	db := database.Init()
	defer db.Close()

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
