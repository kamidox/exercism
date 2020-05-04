package clock

import "fmt"

// take reference from time.Time => /usr/local/go/src/time/time.go
// only save the minutes in one day, it's normolized so that it always >= 0 and < 24*60
type Clock struct {
	minutes int
}

func normalize(m int) int {
	m = m % (24 * 60)
	if m < 0 {
		m += 24 * 60
	}
	return m
}

func New(hour, minutes int) Clock {
	return Clock{normalize(hour*60 + minutes)}
}

func (c Clock) String() string {
	h := c.minutes / 60
	m := c.minutes % 60

	return fmt.Sprintf("%02d:%02d", h, m)
}

func (c Clock) Add(minutes int) Clock {
	c.minutes = normalize(c.minutes + minutes)
	return c
}

func (c Clock) Subtract(minutes int) Clock {
	c.minutes = normalize(c.minutes - minutes)
	return c
}
