package main

import (
	"bytes"
	"errors"
	"fmt"
	"strconv"
	"strings"
)

// Test ..
func Test() {
	fmt.Println("Go test")
	content, _ := GetWordFromFile("chat")
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

func makeFirstUpperCase(s string) string {

	if len(s) < 2 {
		return strings.ToLower(s)
	}

	bts := []byte(s)

	lc := bytes.ToUpper([]byte{bts[0]})
	rest := bts[1:]

	return string(bytes.Join([][]byte{lc, rest}, nil))
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

	if r.Content[0] != 'é' && r.Content[0] != 'ê' {
		r.Content = makeFirstUpperCase(r.Content)
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
