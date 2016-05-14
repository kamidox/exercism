(ns binary)

(defn- exp [x n] (reduce * (repeat n x)))

(defn- to-int [b] (- (int b) (int \0)))

(defn- to-decimal-bit [cnt idx bit]
  "Convert binary bit to decimal bit. e.g. 100 -> 4; 1000 -> 8"
  (* (to-int bit) (exp 2 (- cnt idx))))

(defn- invalid-binary? [bin-str]
  (let [invalids (filter #(let [v (to-int %)] (or (>= v 2) (< v 0))) bin-str)]
       (not (empty? invalids))))

(defn to-decimal
  "Convert string present binary to decimal. e.g. '1001' -> 9"
  [bin-str]
  (if (invalid-binary? bin-str) 0
    (let [cnt (count bin-str)]
      (->> bin-str
           ; "101" -> [4 0 1]
           (map-indexed (partial to-decimal-bit (dec cnt)))
           (reduce +)))))

; ================================================================================
; Officlal solution is beautiful than mine except the pow function.
; ================================================================================
(defn- power [[exponent bit]]
  (if (= "1" bit)
      (exp 2 exponent)
      0))

(defn- bits [string]
  (->> string
       (re-seq #"[10]")
       reverse
       (map-indexed vector)))

(defn to-decimal-v2 [string]
  (->> string
       bits
       (map power)
       (apply +)))

