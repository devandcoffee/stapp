package models

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type Team struct {
	gorm.Model
	Name         string `json: name`
	Info         string `json: info`
	TournamentID uint   `json: tournamentId`
}
