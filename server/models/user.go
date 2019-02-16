package models

import (
	"time"

	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	ExternalID        string    `json: external_id`
	ExternalUpdatedAt time.Time `json: external_updated_at`
	Email             string    `json: email`
	EmailVerified     bool      `json: is_verified`
	Name              string    `json: name`
	Nickname          string    `json: nickname`
	Picture           string    `json:picture`
	Tournaments       []Tournament
}
