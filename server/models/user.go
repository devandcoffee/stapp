package models

import (
	"time"

	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	Birthday time.Time `json: birthday`
	Email    string    `json: email`
	Name     string    `json: name`
	Address  string    `json: address`
}
