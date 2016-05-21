(ns hexadecimal)

(defn- exp [x n] (reduce * (repeat n x)))

(defn- to-int
  "Convert one bit to int. e.g. 'F' -> 16; '1' -> 1; "
  [hex-str]
  (let [bit (first hex-str)]
    (cond (<= (int \0) (int bit) (int \9)) (- (int bit) (int \0))
          (<= (int \A) (int bit) (int \F)) (+ 10 (- (int bit) (int \A)))
          :else -1)))

(defn- power [[exponent bit]]
  (* (to-int bit) (exp 16 exponent)))

(defn- bits [string]
  (->> string
       (re-seq #"[FEDCBA9876543210]")
       reverse
       (map-indexed vector)))

(defn- invalid? [string]
  (some #(= (to-int (str %)) -1) string))

(defn hex-to-int [string]
  (let [hex-str (clojure.string/upper-case string)]
    (if (invalid? hex-str) 0
      (->> hex-str
           bits
           (map power)
           (apply +)))))

