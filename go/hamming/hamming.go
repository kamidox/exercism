package hamming

import (
	"errors"
	"strings"
)

// calculate distance between a and b
func Distance(a, b string) (int, error) {
	if len(a) != len(b) {
		return 0, errors.New("length not equal")
	}
	a = strings.ToUpper(a)
	b = strings.ToUpper(b)
	ret := 0
	for i := 0; i < len(a); i++ {
		if a[i] != b[i] {
			ret++
		}
	}
	return ret, nil
}
