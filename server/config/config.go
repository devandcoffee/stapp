package config

type Config struct {
	DB *DBConfig
}

type DBConfig struct {
	Dialect  string
	Username string
	Name     string
	Port     string
	Host     string
	SSLMode  string
}

func GetConfig() *Config {
	return &Config{
		DB: &DBConfig{
			Dialect:  "postgres",
			Port:     "5432",
			Host:     "db",
			Username: "stadmin",
			Name:     "stdb",
			SSLMode:  "disable",
		},
	}
}
