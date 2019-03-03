package models

import (
	"time"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type Player struct {
	gorm.Model
	Name     string    `json:"name"`
	Address  string    `json:"address"`
	Birthday time.Time `json:"birthday"`
	TeamID   uint      `json:"teamId"`
}
