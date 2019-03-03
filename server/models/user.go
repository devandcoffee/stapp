package models

import (
	"time"

	"github.com/jinzhu/gorm"
)

type User struct {
	gorm.Model
	ExternalID        string    `json:"externalId"`
	ExternalUpdatedAt time.Time `json:"externalUpdatedAt"`
	Email             string    `json:"email"`
	EmailVerified     bool      `json:"isVeritied"`
	Name              string    `json:"name"`
	Nickname          string    `json:"nickname"`
	Picture           string    `json:"picture"`
	Tournaments       []Tournament
}
