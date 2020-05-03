package isogram

import "strings"

// decide isogram
func IsIsogram(word string) bool {
	word = strings.ToLower(word)
	// hyphens and space are allow to appear multiple times, remove it
	wl := strings.FieldsFunc(word, func(r rune) bool {
		if r == '-' || r == ' ' {
			return true
		}
		return false
	})
	word = strings.Join(wl, "")

	for i, r := range word {
		f := func(r2 rune) bool {
			return r == r2
		}
		// find a different index in reverse order, means there is a duplicate char
		if i != strings.LastIndexFunc(word, f) {
			return false
		}
	}
	return true
}
