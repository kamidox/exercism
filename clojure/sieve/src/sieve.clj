(ns sieve)

(defn- divisible? [n p]
  (or (<= n p) (not (zero? (mod n p)))))

(defn sieve
  "Return prime seq from 2 to n inclusive. e.g. 9 -> [2 3 5 7]"
  [n]
  (loop [primes (range 2 (inc n)) idx 0]
    (if (<= (count primes) idx) primes
      (let [p (nth primes idx)]
        (recur (filter #(divisible? % p) primes) (inc idx))))))

