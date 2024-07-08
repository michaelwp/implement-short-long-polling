package main

import (
    "encoding/json"
    "net/http"
    "time"
    "fmt"
)

type Message struct {
    Text string `json:"text"`
}

func main() {
    http.HandleFunc("/poll", pollHandler)
    http.HandleFunc("/longpoll", longPollHandler)

    // Serve static files from the React app
    fs := http.FileServer(http.Dir("./public"))
    http.Handle("/", fs)

    port := ":8080"

    fmt.Println("server running on port", port)

    http.ListenAndServe(port, nil)
}

func pollHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Println("short polling handler")

    message := &Message{
        Text: time.Now().Format("2006/01/02 15:04:05"),
    }

    // Send the latest message
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(message)
}

func longPollHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Println("long polling handler")

    message := &Message{
        Text: time.Now().Format("2006/01/02 15:04:05"),
    }

    time.Sleep(10 * time.Second) // Simulate a delay

    // Send the new message
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(message)
}
