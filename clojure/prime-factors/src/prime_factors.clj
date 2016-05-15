(ns prime-factors)

; Not efficient enough but readable version
(defn- prime? [n]
  (->> (range 2 (quot n 2))
       (map #(mod n %))
       (every? #(> % 0))))

(defn- prime-factor [n]
  (->> (range 2 (inc n))
       (filter #(and (zero? (mod n %)) (prime? %)))
       first))

(defn of [n]
  (loop [factors [] n n]
    (if-let [factor (prime-factor n)]
      (recur (conj factors factor) (quot n factor))
      factors)))

; ======================================================================
; Another solution: Use Sieve of Eratosthenes to get all the primes.
; ref: https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
; But the performance is poor. Mainly because we use count/nth in prime-seq.
; ======================================================================
(defn- prime-for? [n p]
  (or (<= n p) (not (zero? (mod n p)))))

(defn- prime-seq
  "Return prime seq from 2 to n inclusive. e.g. 9 -> [2 3 5 7]"
  [n]
  (loop [primes (range 2 (inc n)) idx 0]
    (if (<= (count primes) idx) primes
      (let [p (nth primes idx)]
        (recur (filter #(prime-for? % p) primes) (inc idx))))))

(defn- first-factor [n primes]
  (->> primes
       (filter #(zero? (mod n %)))
       first))

(defn of-v2 [n]
  (let [primes (prime-seq n)]
    (loop [factors [] n n]
      (if-let [factor (first-factor n primes)]
        (recur (conj factors factor) (quot n factor))
        factors))))

; ================================================================================
; Official solution is beautiful. It did not need a function to check prime factor
; since if (mod number 2) != 0, them (mod number 4) != 0 must be true.
; ================================================================================
(defn- least-prime-divisor
  [number]
  (or (first
        (filter #(zero? (rem number %1))
                (range 2 (inc (/ number 2)))))
      number))

(defn of-v3 [number]
  (if
    (< number 2) []
    (let [divisor (least-prime-divisor number)]
      (into [divisor] (of (/ number divisor))))))

; ==========================================================================
; Performance Test
; ==========================================================================
(defn do-performance-test
  ([] (do-performance-test 1000))
  ([n]
   (println "================ performance test ================")
   (print "of: ")
   (time (dorun (repeatedly n #(of 901255))))
   (print "of-v3: ")
   (time (dorun (repeatedly n #(of-v3 901255))))))

(do-performance-test)
