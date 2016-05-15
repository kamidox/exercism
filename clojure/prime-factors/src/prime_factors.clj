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

