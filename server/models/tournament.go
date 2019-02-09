package models

import (
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type Tournament struct {
	gorm.Model
	Name        string    `json: "name"`
	Description string    `json: description`
	StartDate   time.Time `json: startDate`
	EndDate     time.Time `json: endDate`
}

func DBMigrate(db *gorm.DB) *gorm.DB {
	db.AutoMigrate(&Tournament{})
	return db
}
