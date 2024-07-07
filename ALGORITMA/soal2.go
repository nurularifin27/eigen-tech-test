package main

import (
	"fmt"
	"strings"
)

func longest(sentence string) (string, int) {
	words := strings.Fields(sentence)
	longestWord := ""
	maxLength := 0

	for _, word := range words {
		if len(word) > maxLength {
			longestWord = word
			maxLength = len(word)
		}
	}

	return longestWord, maxLength
}

func main() {
	sentence := "Saya sangat senang mengerjakan soal algoritma"
	word, length := longest(sentence)
	fmt.Printf("%s: %d character\n", word, length)
}
