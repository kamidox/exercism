(ns difference-of-squares)

(defn- square [n] (* n n))

(defn square-of-sums [n]
  (->> (range 1 (inc n))
       (reduce +)
       square))

(defn sum-of-squares [n]
  (->> (range 1 (inc n))
       (map square)
       (reduce +)))

(defn difference [n]
  (- (square-of-sums n) (sum-of-squares n)))

