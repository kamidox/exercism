(ns raindrops)

; Following code is reused from exercism `prime-factors`
(defn- prime? [n]
  (->> (range 2 (quot n 2))
       (map #(mod n %))
       (every? #(> % 0))))

(defn- prime-factors [n]
  (->> (range 2 (inc n))
       (filter #(and (zero? (mod n %)) (prime? %)))))

(def ^:private raindrop-speak {3 "Pling" 5 "Plang" 7 "Plong"})

(defn convert [n]
  (let [result (->> (prime-factors n)
                    (map raindrop-speak)
                    (apply str))]
    (if (empty? result) (str n) result)))

