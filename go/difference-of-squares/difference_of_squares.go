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

func SquareOfSumChan(n int, c chan int) {
	c <- SquareOfSum(n)
}

func SumOfSquaresChan(n int, c chan int) {
	c <- SumOfSquares(n)
}

// difference between square of sum and sum of square
// go test -v --bench . --benchmem
// the benchmark of normal version is good than channel version
func DifferenceChan(n int) int {
	c := make(chan int)
	go SquareOfSumChan(n, c)
	go SumOfSquaresChan(n, c)
	s1, s2 := <-c, <-c
	if s1 > s2 {
		return s1 - s2
	}
	return s2 - s1
}

// difference between square of sum and sum of square
func Difference(n int) int {
	return SquareOfSum(n) - SumOfSquares(n)
}
