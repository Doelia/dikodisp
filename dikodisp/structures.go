package main

// Rel ..
type Rel struct {
	Type    string
	Poids   int
	Tid     int
	Content string
}

// Word ..
type Word struct {
	Name    string
	Def     string
	ListRel []Rel
}
