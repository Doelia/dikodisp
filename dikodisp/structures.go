package main

// Rel ..
type Rel struct {
	Type    string
	Poids   int
	Tid     int
	Content string
	// Stars, calculé en JS (1 à 5)
}

// Word ..
type Word struct {
	Name    string
	Def     string
	ListRel []Rel
}
