(ns trinary)

(defn- exp [x n] (reduce * (repeat n x)))

(defn- to-int [bit] (try (Integer. (str bit)) (catch NumberFormatException e -1)))

(defn- power [[exponent bit]]
  (* (to-int bit) (exp 3 exponent)))

(defn- bits [string]
  (->> string
       (re-seq #"[210]")
       reverse
       (map-indexed vector)))

(defn- invalid? [string]
  (some #(let [v (to-int %)] (or (>= v 3) (< v 0))) string))

(defn to-decimal [string]
  (if (invalid? string) 0
    (->> string
         bits
         (map power)
         (apply +))))

; ======================================================================
; Officlal solution is shorter, and the trick is `.compareTo` java function.
; ======================================================================
(defn to-decimal-v2 [num]
  (loop [sum 0, num num]
    (if (empty? num)
      sum
      (let [diff (.compareTo (first num) \0)]
        (if (<= 0 diff 2)
          (recur (+ (* sum 3) diff) (next num))
          0)))))
; ==========================================================================
; Performance Test
; ==========================================================================
(defn do-performance-test
  ([] (do-performance-test 10000))
  ([n]
   (println "================ performance test ================")
   (print "to-decimal: ")
   (time (dorun (repeatedly n #(to-decimal "1021021102"))))
   (print "to-decimal-v2: ")
   (time (dorun (repeatedly n #(to-decimal-v2 "1021021102"))))))

; (do-performance-test)
