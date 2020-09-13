package database

import (
	"io/ioutil"
	"location_service/util"
	"log"
	"strings"

	"github.com/jinzhu/gorm"
)

var db *gorm.DB

func Init() *gorm.DB {
	var err error
	db, err = gorm.Open("sqlite3", ":memory:")
	if err != nil {
		log.Fatal(err)
	}

	db.DB().SetMaxIdleConns(100)
	log.Println("Connected to db.")

	err = migrate()
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Migrated.")

	return db
}

func GetDB() *gorm.DB {
	return db
}

func migrate() error {
	dbFile := util.GetEnv("DB_FILE", "config/database/db.sql")
	file, err := ioutil.ReadFile(dbFile)
	if err != nil {
		return err
	}

	requests := strings.Split(string(file), ";")

	for _, request := range requests {
		if request == "" {
			continue
		}
		db.Exec(request)
	}

	return nil
}
