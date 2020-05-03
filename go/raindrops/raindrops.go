package raindrops

import (
	"fmt"
	"strings"
)

type rainDropsMatcher struct {
	v int
	s string
}

// convert number to raindrops
func Convert(n int) string {
	m := []rainDropsMatcher{
		{3, "Pling"},
		{5, "Plang"},
		{7, "Plong"},
	}
	ret := make([]string, 0, 3)
	for _, r := range m {
		if n%r.v == 0 {
			ret = append(ret, r.s)
		}
	}

	if len(ret) == 0 {
		return fmt.Sprintf("%v", n)
	}
	return strings.Join(ret, "")
}

/*
below version may failed sometimes, because iterate order over maps is not defined.

> The iteration order over maps is not specified and is not guaranteed
> to be the same from one iteration to the next.
> --- Go Language Specification.

func Convert(n int) string {
	m := map[int]string{
		3: "Pling",
		5: "Plang",
		7: "Plong",
	}
	ret := make([]string, 0, 3)
	for k, v := range m {
		if n%k == 0 {
			ret = append(ret, v)
		}
	}

	if len(ret) == 0 {
		return fmt.Sprintf("%v", n)
	}
	return strings.Join(ret, "")
}
*/
