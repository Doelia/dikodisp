package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/djimenez/iconv-go"
)

// GetWordFromFile ..
func GetWordFromFile(word string) (string, error) {
	nameFile := "cache/" + word + ".xml"
	buf, err := ioutil.ReadFile(nameFile)
	if err != nil {
		return "", err
	}
	s := string(buf)
	return s, nil
}

func putInFile(word string, content string) {
	nameFile := "cache/" + word + ".xml"
	mySlice := []byte(content)
	ioutil.WriteFile(nameFile, mySlice, 0777)
}

// GetWordFromURL ..
func GetWordFromURL(word string) (string, error) {
	url := "http://www.jeuxdemots.org/rezo-xml.php?gotermsubmit=Chercher&gotermrel=" + word + "&output=onlyxml"

	fmt.Println("wget " + url)

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

	out, _ = iconv.ConvertString(out, "windows-1252", "utf-8")

	fmt.Println(out)
	out = getXMLFromHTMLSource(out)

	return out, nil
}

func getXMLFromHTMLSource(content string) string {
	out := content
	out = strings.Split(out, "<CODE>")[1]
	out = strings.Split(out, "</CODE>")[0]
	return out
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
