package models

import "github.com/jinzhu/gorm"

func DBMigrate(db *gorm.DB) *gorm.DB {
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Tournament{})
	db.AutoMigrate(&Team{})
	db.AutoMigrate(&Player{})
	return db
}
