package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

// GetWordFromFile ..
func GetWordFromFile(word string) (string, error) {
	nameFile := word + ".xml"
	buf, err := ioutil.ReadFile(nameFile)
	if err != nil {
		return "", err
	}
	s := string(buf)
	return s, nil
}

// GetWordFromURL ..
func GetWordFromURL(word string) string {
	url := ""

	resp, err := http.Get(url)
	if err != nil {
		ErrLogger.Println("Erreur durant le wget du mot " + word)
		return ""
	}

	robots, err := ioutil.ReadAll(resp.Body)
	resp.Body.Close()
	if err != nil {
		log.Fatal(err)
	}
	out := fmt.Sprintf("%s", robots)

	return out
}
