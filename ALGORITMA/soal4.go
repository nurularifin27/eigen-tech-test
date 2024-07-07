package main

import "fmt"

func diagonalDifference(matrix [][]int) int {
	n := len(matrix)
	var sumDiagonal1, sumDiagonal2 int

	for i := 0; i < n; i++ {
		sumDiagonal1 += matrix[i][i]
		sumDiagonal2 += matrix[i][n-i-1]
	}

	return abs(sumDiagonal1 - sumDiagonal2)
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func main() {
	matrix := [][]int{
		{1, 2, 0},
		{4, 5, 6},
		{7, 8, 9},
	}

	result := diagonalDifference(matrix)

	fmt.Println("Hasil pengurangan dari jumlah diagonal:", result)
}
