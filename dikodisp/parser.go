package main

import (
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
)

// Test ..
func Test() {
	fmt.Println("Go test")
	content := GetWordFromFile("chat")
	ParseXml(content)
}

func cleanTerme(s string) string {
	spls := strings.Split(s, ">")
	return spls[0]
}

func GetBaliseName(line string) string {
	name := ""
	for i, c := range line {
		if i == 0 {
			continue
		}
		if c == ' ' || c == '>' {
			return name
		} else {
			name = name + string(c)
		}
	}
	return name
}

func GetContentOfBalise(line string) string {
	goWrite := false
	name := ""
	for _, c := range line {
		if c == '>' && !goWrite {
			goWrite = true
		} else if c == '<' && goWrite {
			return name
		} else {
			if goWrite {
				name = name + string(c)
			}
		}
	}
	return name
}

func getValueFromAttr(str string) string {
	spls := strings.Split(str, "\"")
	return spls[1]
}

func buildRel(line string) (error, Rel) {
	var r Rel
	r.Content = cleanTerme(GetContentOfBalise(line))
	if r.Content == "_COM" {
		return errors.New("Invalid"), r
	}
	if strings.Contains(r.Content, ":") {
		return errors.New("Invalid"), r
	}
	attributes := strings.Split(line, " ")
	for _, attr := range attributes {
		if strings.Contains(attr, "type") {
			r.Type = getValueFromAttr(attr)
		}
		if strings.Contains(attr, "poids") {
			i, _ := strconv.Atoi(getValueFromAttr(attr))
			r.Poids = i
		}
		if strings.Contains(attr, "tid") {
			i, _ := strconv.Atoi(getValueFromAttr(attr))
			r.Tid = i
		}
	}
	return nil, r
}

// ParseXml ..
func ParseXml(content string) (w Word) {
	lines := strings.Split(content, "\n")
	for _, line := range lines {
		//fmt.Println("-" + line)
		balise := GetBaliseName(line)
		if balise == "def" {
			w.Def = GetContentOfBalise(line)
		}
		if balise == "mot-formate" {
			w.Name = GetContentOfBalise(line)
		}
		if balise == "rel" {
			err, r := buildRel(line)
			if err == nil {
				w.ListRel = append(w.ListRel, r)
			}
			//fmt.Println(r)
		}
	}
	return w
}

// GetWordFromFile ..
func GetWordFromFile(word string) string {
	nameFile := word + ".xml"
	buf, _ := ioutil.ReadFile(nameFile)
	s := string(buf)
	return s
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
