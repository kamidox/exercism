package luhn

import (
	"strings"
	"unicode"
)

// Given a number determine whether or not it is valid per the Luhn formula.
func Valid(s string) bool {
	// remove space
	wl := strings.Fields(s)
	s = strings.Join(wl, "")
	if len(s) <= 1 {
		return false
	}
	// the first double digit index from left
	startIndex := len(s) % 2
	sum := 0
	for i, r := range s {
		// only digit is allow
		if !unicode.IsDigit(r) {
			return false
		}
		if i == startIndex {
			doubleDigit := 2 * (r - '0')
			if doubleDigit > 9 {
				doubleDigit -= 9
			}
			sum += int(doubleDigit)
			startIndex += 2 // jump to next double digit
		} else {
			sum += int(r - '0')
		}
	}
	return sum%10 == 0
}
