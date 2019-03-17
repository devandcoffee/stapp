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

	"github.com/rs/cors"
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
	a.Get("/api/tournaments/{id}/teams", a.GetTournamentTeams)

	a.Get("/api/teams", a.GetAllTeams)
	a.Post("/api/teams", a.CreateTeam)
	a.Get("/api/teams/{id}", a.GetTeam)
	a.Put("/api/teams/{id}", a.UpdateTeam)
	a.Delete("/api/teams/{id}", a.DeleteTeam)
	a.Get("/api/teams/{id}/players", a.GetTeamPlayers)

	a.Get("/api/players", a.GetAllPlayers)
	a.Post("/api/players", a.CreatePlayer)
	a.Get("/api/players/{id}", a.GetPlayer)
	a.Put("/api/players/{id}", a.UpdatePlayer)
	a.Delete("/api/players/{id}", a.DeletePlayer)

	a.Get("/api/users", a.GetAllUsers)
	a.Post("/api/users", a.CreateUser)
	a.Get("/api/users/{id}", a.GetUser)
	a.Put("/api/users/{id}", a.UpdateUser)
	a.Delete("/api/users/{id}", a.DeleteUser)
	a.Get("/api/users/{id}/tournaments", a.GetUserTournaments)
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
	handlers.GetTournament(a.DB, w, r)
}

// UpdateTournament Handler for updating a tournament
func (a *App) UpdateTournament(w http.ResponseWriter, r *http.Request) {
	handlers.UpdateTournament(a.DB, w, r)
}

// DeleteTournament Handler for deleting a tournament
func (a *App) DeleteTournament(w http.ResponseWriter, r *http.Request) {
	handlers.DeleteTournament(a.DB, w, r)
}

// GetTournamentTeams  Handler for getting tournament's teams
func (a *App) GetTournamentTeams(w http.ResponseWriter, r *http.Request) {
	handlers.GetTournamentTeams(a.DB, w, r)
}

// GetAllTeams for getting all teams
func (a *App) GetAllTeams(w http.ResponseWriter, r *http.Request) {
	handlers.GetAllTeams(a.DB, w, r)
}

// CreateTeam Handler for creating a team
func (a *App) CreateTeam(w http.ResponseWriter, r *http.Request) {
	handlers.CreateTeam(a.DB, w, r)
}

// GetTeam Handler for getting a team
func (a *App) GetTeam(w http.ResponseWriter, r *http.Request) {
	handlers.GetTeam(a.DB, w, r)
}

// UpdateTeam Handler for updating a team
func (a *App) UpdateTeam(w http.ResponseWriter, r *http.Request) {
	handlers.UpdateTeam(a.DB, w, r)
}

// DeleteTeam Handler for deleting a team
func (a *App) DeleteTeam(w http.ResponseWriter, r *http.Request) {
	handlers.DeleteTeam(a.DB, w, r)
}

// GetTeamPlayers  Handler for getting team's players
func (a *App) GetTeamPlayers(w http.ResponseWriter, r *http.Request) {
	handlers.GetTeamPlayers(a.DB, w, r)
}

// GetAllPlayers for getting all Players
func (a *App) GetAllPlayers(w http.ResponseWriter, r *http.Request) {
	handlers.GetAllPlayers(a.DB, w, r)
}

// CreatePlayer Handler for creating a Player
func (a *App) CreatePlayer(w http.ResponseWriter, r *http.Request) {
	handlers.CreatePlayer(a.DB, w, r)
}

// GetPlayer Handler for getting a Player
func (a *App) GetPlayer(w http.ResponseWriter, r *http.Request) {
	handlers.GetPlayer(a.DB, w, r)
}

// UpdatePlayer Handler for updating a Player
func (a *App) UpdatePlayer(w http.ResponseWriter, r *http.Request) {
	handlers.UpdatePlayer(a.DB, w, r)
}

// DeletePlayer Handler for deleting a Player
func (a *App) DeletePlayer(w http.ResponseWriter, r *http.Request) {
	handlers.DeletePlayer(a.DB, w, r)
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
	handlers.GetUser(a.DB, w, r)
}

// UpdateUser Handler for updating a tournament
func (a *App) UpdateUser(w http.ResponseWriter, r *http.Request) {
	handlers.UpdateUser(a.DB, w, r)
}

// DeleteUser Handler for deleting a tournament
func (a *App) DeleteUser(w http.ResponseWriter, r *http.Request) {
	handlers.DeleteUser(a.DB, w, r)
}

// GetUserTournaments  Handler for getting user's tournaments
func (a *App) GetUserTournaments(w http.ResponseWriter, r *http.Request) {
	handlers.GetUserTournaments(a.DB, w, r)
}

// Run the app on it's router
func (a *App) Run(host string) {

	handler := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, //you service is available and allowed for this base url
		AllowedMethods: []string{
			http.MethodGet, //http methods for your app
			http.MethodPost,
			http.MethodPut,
			http.MethodPatch,
			http.MethodDelete,
			http.MethodOptions,
			http.MethodHead,
		},

		AllowedHeaders: []string{
			"*", //or you can your header key values which you are using in your application
		},
	}).Handler(a.Router)

	log.Fatal(http.ListenAndServe(host, handler))
}
