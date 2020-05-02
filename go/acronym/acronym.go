// This is a "stub" file.  It's a little start on your solution.
// It's not a complete solution though; you have to write some code.

// Package acronym should have a package comment that summarizes what it's about.
// https://golang.org/doc/effective_go.html#commentary
package acronym

import (
	"strings"
	"unicode"
)

func wordList(s string) []string {
	return strings.FieldsFunc(s, func(r rune) bool {
		if !unicode.IsLetter(r) && r != '\'' {
			return true
		}
		return false
	})
}

// Abbreviate should have a comment documenting it.
func Abbreviate(s string) string {
	wl := wordList(s)
	abbrev := make([]byte, 0)
	for _, v := range wl {
		abbrev = append(abbrev, strings.ToUpper(v)[0])
	}
	return string(abbrev)
}
