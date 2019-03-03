package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/devandcoffee/stapp/server/models"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

func GetAllTournaments(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	tournaments := []models.Tournament{}
	db.Find(&tournaments)
	respondJSON(w, http.StatusOK, tournaments)
}

func CreateTournament(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	tournament := models.Tournament{}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&tournament); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := db.Save(&tournament).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusCreated, tournament)
}

func GetTournament(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]
	tournament := getTournamentOr404(db, id, w, r)
	if tournament == nil {
		return
	}
	respondJSON(w, http.StatusOK, tournament)
}

func UpdateTournament(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]

	tournament := getTournamentOr404(db, id, w, r)
	if tournament == nil {
		return
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&tournament); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := db.Save(&tournament).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	respondJSON(w, http.StatusOK, tournament)
}

func DeleteTournament(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]

	tournament := getTournamentOr404(db, id, w, r)

	if tournament == nil {
		return
	}

	if err := db.Delete(&tournament).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	respondJSON(w, http.StatusNoContent, nil)
}

func GetTournamentTeams(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
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

func getTournamentOr404(db *gorm.DB, id string, w http.ResponseWriter, r *http.Request) *models.Tournament {
	tournament := models.Tournament{}
	parsedID, _ := strconv.Atoi(id)
	if err := db.First(&tournament, parsedID).Error; err != nil {
		respondError(w, http.StatusNotFound, err.Error())
		return nil
	}
	return &tournament
}
