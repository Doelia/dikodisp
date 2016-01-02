package main

import "flag"

var port = flag.Int("port", 2000, "Modifie le port d'écoute (défaut 2000)")

func main() {
	flag.Parse()
	StartWebServer(*port)
}
