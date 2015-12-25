package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

var networkLogger = log.New(os.Stdout, "[network] ", 0)

// StartWebServer Démarrage du serveur web (http + websockets)
func StartWebServer(port int) {
	networkLogger.Printf("Serveur web en écoute sur le port %d.\n", port)
	http.Handle("/", http.FileServer(http.Dir("../client")))
	http.HandleFunc("/getWord", handlerWord)
	if err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil); err != nil {
		ErrLogger.Println("Erreur à la création du serveur HTTP : ", err.Error())
	}
}

func handlerWord(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	wordNeedle := req.URL.Query().Get("word")
	content, err := GetWordFromFile(wordNeedle)
	if err == nil {
		word := ParseXml(content)
		b, _ := json.Marshal(word)
		w.Write(b)
	} else {
		w.Write([]byte("404"))
	}

}
