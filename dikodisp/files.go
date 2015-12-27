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
func GetWordFromURL(word string) (string, error) {
	url := ""

	resp, err := http.Get(url)
	if err != nil {
		ErrLogger.Println("Erreur durant le wget du mot " + word)
		return "", err
	}

	robots, err := ioutil.ReadAll(resp.Body)
	resp.Body.Close()
	if err != nil {
		log.Fatal(err)
	}
	out := fmt.Sprintf("%s", robots)

	return out, nil
}

func putInFile(word string, content string) {

}

// GetWord Rotourne le contenu XML du cache si présent, du net sinon (puis met en cache), une erreur sinon
func GetWord(word string) (string, error) {
	fromFile, err := GetWordFromFile(word)
	if err == nil {
		fmt.Println("Mot " + word + " récupéré du cache")
		return fromFile, nil
	}

	fromWeb, errWeb := GetWordFromURL(word)
	if errWeb == nil {
		fmt.Println("Mot " + word + " mis en cache")
		putInFile(word, fromWeb)
		return fromWeb, nil
	}

	return "", nil
}
