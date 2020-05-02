// This is a "stub" file.  It's a little start on your solution.
// It's not a complete solution though; you have to write some code.

// Package bob should have a package comment that summarizes what it's about.
// https://golang.org/doc/effective_go.html#commentary
package bob

import (
	"strings"
	"unicode"
)

func isCapitalString(s string) bool {
	atLeastHaveOneCapital := false
	allCapital := true
	strings.Map(func(c rune) rune {
		if unicode.IsLetter(c) && unicode.IsLower(c) {
			allCapital = false
		}
		if unicode.IsLetter(c) && unicode.IsUpper(c) {
			atLeastHaveOneCapital = true
		}
		return c
	}, s)

	return allCapital && atLeastHaveOneCapital
}

func endWithQuestionMark(s string) bool {
	return strings.HasSuffix(s, "?")
}

// Hey should have a comment documenting it.
func Hey(remark string) string {
	remark = strings.Trim(remark, " \t\n\r")
	switch {
	case remark == "":
		return "Fine. Be that way!"
	case isCapitalString(remark):
		if endWithQuestionMark(remark) {
			return "Calm down, I know what I'm doing!"
		} else {
			return "Whoa, chill out!"
		}
	case endWithQuestionMark(remark):
		return "Sure."
	default:
		return "Whatever."
	}
}
