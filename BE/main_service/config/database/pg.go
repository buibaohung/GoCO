package database

import (
	"fmt"
	"log"
	"main_service/util"

	"github.com/jinzhu/gorm"
)

var db *gorm.DB

func Init() *gorm.DB {
	var err error
	dbHost := util.GetEnv("POSTGREST_DB_HOST", "localhost")
	dbPort := util.GetEnv("POSTGREST_DB_PORT", "5432")
	dbUser := util.GetEnv("POSTGREST_DB_USER", "postgres")
	dbPass := util.GetEnv("POSTGREST_DB_PASSWORD", "123456")
	dbName := util.GetEnv("POSTGREST_DB_NAME", "app")

	connectionString := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", dbHost, dbPort, dbUser, dbPass, dbName)
	db, err = gorm.Open("postgres", connectionString)
	if err != nil {
		log.Fatal(err)
	}

	db.DB().SetMaxIdleConns(100)
	log.Println("Connected to db.")

	return db
}

func GetDB() *gorm.DB {
	return db.Debug()
}
