package app

import (
	"fmt"
	"log"
	"net/http"

	"github.com/devandcoffee/stapp/server/config"
	"github.com/devandcoffee/stapp/server/handlers"
	"github.com/devandcoffee/stapp/server/models"

	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
)

// App has router and db instances
type App struct {
	Router *mux.Router
	DB     *gorm.DB
}

// Initialize given a proper config
func (a *App) Initialize(config *config.Config) {
	dbURI := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=%s",
		config.DB.Host,
		config.DB.Port,
		config.DB.Username,
		config.DB.Name,
		config.DB.SSLMode,
	)

	db, err := gorm.Open(config.DB.Dialect, dbURI)
	if err != nil {
		log.Fatal("Could not connect database", err)
	}

	a.DB = models.DBMigrate(db)
	a.Router = mux.NewRouter()
	a.setRouters()
}

// Set all required routers
func (a *App) setRouters() {
	a.Get("/api/tournaments", a.GetAllTournaments)
	a.Post("/api/tournaments", a.CreateTournament)
	a.Get("/api/tournaments/{id}", a.GetTournament)
	a.Put("/api/tournaments/{id}", a.UpdateTournament)
	a.Delete("/api/tournaments/{id}", a.DeleteTournament)

	a.Get("/api/users", a.GetAllUsers)
	a.Post("/api/users", a.CreateUser)
	a.Get("/api/users/{id}", a.GetUser)
	a.Put("/api/users/{id}", a.UpdateUser)
	a.Delete("/api/users/{id}", a.DeleteUser)
}

// Get handler
func (a *App) Get(path string, f func(w http.ResponseWriter, r *http.Request)) {
	a.Router.HandleFunc(path, f).Methods("GET")
}

// Post handler
func (a *App) Post(path string, f func(w http.ResponseWriter, r *http.Request)) {
	a.Router.HandleFunc(path, f).Methods("POST")
}

// Put handler
func (a *App) Put(path string, f func(w http.ResponseWriter, r *http.Request)) {
	a.Router.HandleFunc(path, f).Methods("PUT")
}

// Delete handler
func (a *App) Delete(path string, f func(w http.ResponseWriter, r *http.Request)) {
	a.Router.HandleFunc(path, f).Methods("DELETE")
}

// GetAllTournaments for getting all tournaments
func (a *App) GetAllTournaments(w http.ResponseWriter, r *http.Request) {
	handlers.GetAllTournaments(a.DB, w, r)
}

// CreateTournament Handler for creating a tournament
func (a *App) CreateTournament(w http.ResponseWriter, r *http.Request) {
	handlers.CreateTournament(a.DB, w, r)
}

// GetTournament Handler for getting a tournament
func (a *App) GetTournament(w http.ResponseWriter, r *http.Request) {
	handlers.CreateTournament(a.DB, w, r)
}

// UpdateTournament Handler for updating a tournament
func (a *App) UpdateTournament(w http.ResponseWriter, r *http.Request) {
	handlers.CreateTournament(a.DB, w, r)
}

// DeleteTournament Handler for deleting a tournament
func (a *App) DeleteTournament(w http.ResponseWriter, r *http.Request) {
	handlers.CreateTournament(a.DB, w, r)
}

// GetAllUsers for getting all tournaments
func (a *App) GetAllUsers(w http.ResponseWriter, r *http.Request) {
	handlers.GetAllUsers(a.DB, w, r)
}

// CreateUser Handler for creating a tournament
func (a *App) CreateUser(w http.ResponseWriter, r *http.Request) {
	handlers.CreateUser(a.DB, w, r)
}

// GetUser Handler for getting a tournament
func (a *App) GetUser(w http.ResponseWriter, r *http.Request) {
	handlers.CreateUser(a.DB, w, r)
}

// UpdateUser Handler for updating a tournament
func (a *App) UpdateUser(w http.ResponseWriter, r *http.Request) {
	handlers.CreateUser(a.DB, w, r)
}

// DeleteUser Handler for deleting a tournament
func (a *App) DeleteUser(w http.ResponseWriter, r *http.Request) {
	handlers.CreateUser(a.DB, w, r)
}

// Run the app on it's router
func (a *App) Run(host string) {
	log.Fatal(http.ListenAndServe(host, a.Router))
}
