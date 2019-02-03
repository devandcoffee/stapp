package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
)

type Tournament struct {
	ID          string    `json:id`
	Name        string    `json:name`
	Description string    `json:description`
	StartDate   time.Time `json:startDate`
	EndDate     time.Time `json:endDate`
}

var tournaments []Tournament

func getTournaments(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tournaments)
}

func getTournament(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range tournaments {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&Tournament{})
}

func createTournament(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var tournament Tournament
	_ = json.NewDecoder(r.Body).Decode(&tournament)
	tournament.ID = strconv.Itoa(rand.Intn(10000000))
	tournaments = append(tournaments, tournament)

	json.NewEncoder(w).Encode(&tournament)
}

func updateTournament(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for i, item := range tournaments {
		if item.ID == params["id"] {
			tournaments = append(tournaments[:i], tournaments[i+1:]...)
			var tournament Tournament
			_ = json.NewDecoder(r.Body).Decode(&tournament)
			tournament.ID = params["id"]
			tournaments = append(tournaments, tournament)
			json.NewEncoder(w).Encode(tournament)
			return
		}
	}
	json.NewEncoder(w).Encode(tournaments)
}

func deleteTournament(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for i, item := range tournaments {
		if item.ID == params["id"] {
			tournaments = append(tournaments[:i], tournaments[i+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(tournaments)
}

func main() {
	r := mux.NewRouter()

	startDate, _ := time.Parse(time.RFC3339, "2019-01-01T11:45:26.371Z")
	endDate, _ := time.Parse(time.RFC3339, "2020-01-01T11:45:26.371Z")

	tournaments = append(tournaments, Tournament{ID: "1", Name: "Foo", Description: "ASD", StartDate: startDate, EndDate: endDate})
	r.HandleFunc("/api/tournaments", getTournaments).Methods("GET")
	r.HandleFunc("/api/tournaments/{id}", getTournament).Methods("GET")
	r.HandleFunc("/api/tournaments", createTournament).Methods("POST")
	r.HandleFunc("/api/tournaments/{id}", updateTournament).Methods("PUT")
	r.HandleFunc("/api/tournaments/{id}", deleteTournament).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8000", r))
}
