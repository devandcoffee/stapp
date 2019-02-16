package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/devandcoffee/stapp/server/models"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

func GetAllUsers(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	users := []models.User{}
	db.Find(&users)
	respondJSON(w, http.StatusOK, users)
}

func CreateUser(db *gorm.DB, w http.ResponseWriter, r *http.Request) {

	user := models.User{}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&user); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	existingUser := getUserByExternalId(db, user.ExternalID, w, r)

	if existingUser != nil {
		respondJSON(w, http.StatusOK, existingUser)
		return
	}

	if err := db.Create(&user).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	respondJSON(w, http.StatusCreated, user)
}

func GetUser(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]
	user := getUserOr404(db, id, w, r)
	if user == nil {
		return
	}
	respondJSON(w, http.StatusOK, user)
}

func UpdateUser(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]

	user := getUserOr404(db, id, w, r)
	if user == nil {
		return
	}

	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&user); err != nil {
		respondError(w, http.StatusBadRequest, err.Error())
		return
	}
	defer r.Body.Close()

	if err := db.Save(&user).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}

	respondJSON(w, http.StatusOK, user)
}

func DeleteUser(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	id := vars["id"]
	user := getUserOr404(db, id, w, r)

	if user != nil {
		return
	}

	if err := db.Delete(&user).Error; err != nil {
		respondError(w, http.StatusInternalServerError, err.Error())
		return
	}
	respondJSON(w, http.StatusNoContent, nil)
}

func GetUserTournaments(db *gorm.DB, w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	user := getUserOr404(db, id, w, r)

	if user == nil {
		return
	}

	tournaments := []models.Tournament{}

	log.Println("Getting tournaments")

	if err := db.Model(&user).Association("Tournaments").Find(&tournaments).Error; err != nil {
		respondError(w, http.StatusNotFound, err.Error())
		return
	}

	respondJSON(w, http.StatusOK, tournaments)
}

func getUserOr404(db *gorm.DB, id string, w http.ResponseWriter, r *http.Request) *models.User {
	user := models.User{}
	parsedID, _ := strconv.Atoi(id)

	if err := db.Find(&user, parsedID).Error; err != nil {
		respondError(w, http.StatusNotFound, err.Error())
		return nil
	}
	return &user
}

func getUserByExternalId(db *gorm.DB, externalId string, w http.ResponseWriter, r *http.Request) *models.User {
	user := models.User{}

	if err := db.Find(&user, "external_id = ?", externalId).Error; err != nil {
		return nil
	}
	return &user
}
