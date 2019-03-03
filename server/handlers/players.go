package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/devandcoffee/stapp/server/models"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

func GetAllPlayers(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	players := []models.Player{}
	db.Find(&players)
	respondJSON(w, http.StatusOK, players)
}

func CreatePlayer(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	player := models.Player{}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&player); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := db.Save(&player).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusCreated, player)
}

func GetPlayer(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]
	player := getPlayerOr404(db, id, w, r)
	if player == nil {
		return
	}
	respondJSON(w, http.StatusOK, player)
}

func UpdatePlayer(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]

	player := getPlayerOr404(db, id, w, r)
	if player == nil {
		return
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&player); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := db.Save(&player).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	respondJSON(w, http.StatusOK, player)
}

func DeletePlayer(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]
	player := getPlayerOr404(db, id, w, r)

	if player != nil {
		return
	}

	if err := db.Delete(&player).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusNoContent, nil)
}

func getPlayerOr404(db *gorm.DB, id string, w http.ResponseWriter, r *http.Request) *models.Player {
	player := models.Player{}
	parsedID, _ := strconv.Atoi(id)
	if err := db.First(&player, parsedID).Error; err != nil {
		respondError(w, http.StatusNotFound, err.Error())
		return nil
	}
	return &player
}
