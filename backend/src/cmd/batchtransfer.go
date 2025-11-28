package main

import app2 "github.com/kevinkorrol/Wise2025/internal/app"

func main() {
	app := app2.New("127.0.0.1:8080")
	app.CreateMockUsers()
	app.Start()
}
