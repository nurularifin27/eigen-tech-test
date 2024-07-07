package main

import (
	"fmt"
	"strings"
)

func countQuery(input []string, query []string) []int {
	results := make([]int, len(query))

	for i, q := range query {
		count := 0
		for _, word := range input {
			if strings.Contains(word, q) {
				count++
			}
		}
		results[i] = count
	}

	return results
}

func main() {
	input := []string{"xc", "dz", "bbb", "dz"}
	query := []string{"bbb", "ac", "dz"}

	output := countQuery(input, query)

	fmt.Println(output)
}
