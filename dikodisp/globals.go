package main

import (
	"log"
	"os"
)

// Logger d'erreur principal
var ErrLogger = log.New(os.Stderr, "[error] ", 0)
