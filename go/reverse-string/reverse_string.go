package reverse

import "unicode/utf8"

// return a reverse string base on input
func Reverse(str string) string {
	i := utf8.RuneCountInString(str)
	reversed := make([]rune, i)

	for _, r := range str {
		i -= 1
		reversed[i] = r
	}
	return string(reversed)
}
