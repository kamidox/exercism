package letter

// FreqMap records the frequency of each rune in a given text.
type FreqMap map[rune]int

// Frequency counts the frequency of each rune in a given text and returns this
// data as a FreqMap.
func Frequency(s string) FreqMap {
	m := FreqMap{}
	for _, r := range s {
		m[r]++
	}
	return m
}

func FrequencyChan(s string, c chan FreqMap) {
	c <- Frequency(s)
}

func ConcurrentFrequency(sl []string) FreqMap {
	c := make(chan FreqMap)
	for _, s := range sl {
		go FrequencyChan(s, c)
	}
	freqMap := FreqMap{}
	for i := 0; i < len(sl); i++ {
		m := <-c
		for k, v := range m {
			freqMap[k] += v
		}
	}
	return freqMap
}
