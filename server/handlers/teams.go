package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/devandcoffee/stapp/server/models"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

func GetAllTeams(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	teams := []models.Team{}
	db.Find(&teams)
	respondJSON(w, http.StatusOK, teams)
}

func CreateTeam(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	team := models.Team{}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&team); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := db.Save(&team).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusCreated, team)
}

func GetTeam(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]
	team := getTeamOr404(db, id, w, r)
	if team == nil {
		return
	}
	respondJSON(w, http.StatusOK, team)
}

func UpdateTeam(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]

	team := getTeamOr404(db, id, w, r)
	if team == nil {
		return
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&team); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := db.Save(&team).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	respondJSON(w, http.StatusOK, team)
}

func DeleteTeam(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]
	team := getTeamOr404(db, id, w, r)

	if team == nil {
		return
	}

	if err := db.Delete(&team).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	respondJSON(w, http.StatusNoContent)
}

func GetTeamPlayers(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	tournament := getTournamentOr404(db, id, w, r)

	if tournament == nil {
		return
	}

	teams := []models.Team{}

	if err := db.Model(&tournament).Association("Teams").Find(&teams).Error; err != nil {
		respondError(w, http.StatusNotFound, err.Error())
		return
	}

	respondJSON(w, http.StatusOK, teams)
}

func getTeamOr404(db *gorm.DB, id string, w http.ResponseWriter, r *http.Request) *models.Team {
	team := models.Team{}
	parsedID, _ := strconv.Atoi(id)
	if err := db.First(&team, parsedID).Error; err != nil {
		respondError(w, http.StatusNotFound, err.Error())
		return nil
	}
	return &team
}
