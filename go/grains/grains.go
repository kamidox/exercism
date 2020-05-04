package grains

import (
	"errors"
	//"math"
)

func Square(n int) (uint64, error) {
	if n <= 0 || n >= 65 {
		return 0, errors.New("invalid square number")
	}
	// math version using float64, which has poor performance
	// var ret uint64 = uint64(math.Pow(2, float64(n-1)))
	var ret uint64 = 1
	for i := 1; i < n; i++ {
		ret *= 2
	}
	return ret, nil
}

func Total() uint64 {
	var sum uint64 = 0
	for i := 1; i <= 64; i++ {
		s, _ := Square(i)
		sum += s
	}
	return sum
}
