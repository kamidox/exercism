(ns octal)

(defn- exp [x n] (reduce * (repeat n x)))

(defn- to-int [bit] (try (Integer. (str bit)) (catch NumberFormatException e -1)))

(defn- power [[exponent bit]]
  (* (to-int bit) (exp 8 exponent)))

(defn- bits [string]
  (->> string
       (re-seq #"[76543210]")
       reverse
       (map-indexed vector)))

(defn- invalid? [string]
  (some #(let [v (to-int %)] (or (>= v 8) (< v 0))) string))

(defn to-decimal [string]
  (if (invalid? string) 0
    (->> string
         bits
         (map power)
         (apply +))))

; Use this as template, we can generate general converter for any number system
