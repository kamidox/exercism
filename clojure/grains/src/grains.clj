(ns grains)

(defn square [n]
  (if (= 1 n) 1 (* 2 (square (dec n)))))

(defn total
  (let [rng (range 64)]))
