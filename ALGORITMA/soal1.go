package main

import (
	"fmt"
	"unicode"
)

func reverseAlphabets(input string) string {
	var alphabets []rune
	var digits []rune
	for _, r := range input {
		if unicode.IsLetter(r) {
			alphabets = append(alphabets, r)
		} else if unicode.IsDigit(r) {
			digits = append(digits, r)
		}
	}

	for i, j := 0, len(alphabets)-1; i < j; i, j = i+1, j-1 {
		alphabets[i], alphabets[j] = alphabets[j], alphabets[i]
	}

	return string(alphabets) + string(digits)
}

func main() {
	input := "NEGIE1"
	result := reverseAlphabets(input)
	fmt.Println(result)
}
