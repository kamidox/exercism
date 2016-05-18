(ns sum-of-multiples)

(defn multiples-of [m n]
  (some zero? (map #(mod n %) m)))

(defn sum-of-multiples
  ([n] (sum-of-multiples [3 5] n))
  ([m n]
   (->> (range 1 n)
        (filter #(multiples-of m %))
        (reduce +))))

