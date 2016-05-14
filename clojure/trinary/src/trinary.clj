(ns trinary)

(defn- exp [x n] (reduce * (repeat n x)))

(defn- to-int [bit] (Integer. bit))

(defn- power [[exponent bit]]
  (* (to-int bit) (exp 3 exponent)))

(defn- bits [string]
  (->> string
       (re-seq #"[210]")
       reverse
       (map-indexed vector)))

(defn to-decimal [string]
  (->> string
       bits
       (map power)
       (apply +)))

