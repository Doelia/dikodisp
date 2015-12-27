package main

import (
	"flag"
	"fmt"
	"math/rand"
	"time"
)

var test = flag.String("test", "main", "Sélectionne la méthode de test à lancer (debug uniquement)")
var port = flag.Int("port", 2000, "Modifie le port d'écoute (défaut 2000)")

func goMain() {
	rand.Seed(time.Now().Unix())

	// Création serveur HTTP
	StartWebServer(*port)
}

// Test ..
func Test() {
	fmt.Println("Go test")
	content, _ := GetWord("chien")
	ParseXML(content)
}

func main() {

	fmt.Println("=== DIKO DISPLAYER ===")

	flag.Parse()

	switch *test {
	case "parse":
		Test()
	case "main":
		goMain()
	}

}
