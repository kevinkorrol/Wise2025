package main

import app2 "github.com/kevinkorrol/Wise2025/internal/app"

func main() {
	app := app2.New(":8080")
	app.CreateMockUsers()
	app.Start()
}
