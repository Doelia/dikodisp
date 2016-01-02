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
	fmt.Println("[webserver] Demande du mot " + wordNeedle + "...")
	content, err := GetWord(wordNeedle)
	fmt.Println("[webserver] Mot traité.")
	if err == nil {
		word := ParseXML(content)
		b, _ := json.Marshal(word)
		w.Write(b)
		fmt.Println("[webserver] Mot envoyé.")
	} else {
		fmt.Println("[webserver] Mot introuvable")
		w.Write([]byte("404"))
	}

}
