(ns luhn)

(defn- char-to-int [c] (- (int c) (int \0)))

(defn- double-for-odd [index value]
  (let [v (char-to-int value)]
    (if (odd? index)
      (let [d (* 2 v)] (if (>= d 10) (- d 9) d)) v)))

(defn checksum [n]
  (let [sum (->> (reverse (str n))
                 (map-indexed double-for-odd)
                 (reduce +))]
    (mod sum 10)))

(defn valid? [n] (zero? (checksum n)))

(defn add-check-digit [n]
  (let [result (* n 10)
        check (checksum result)]
    (if (zero? check) result (+ result (- 10 check)))))

