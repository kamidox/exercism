package diffsquares

// square of sum
func SumOfSquares(n int) int {
	sum := 0
	for i := 1; i <= n; i++ {
		sum += i * i
	}
	return sum
}

// sum of square
func SquareOfSum(n int) int {
	sum := 0
	for i := 1; i <= n; i++ {
		sum += i
	}
	return sum * sum
}

// difference between square of sum and sum of square
func Difference(n int) int {
	return SquareOfSum(n) - SumOfSquares(n)
}
