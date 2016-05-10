(ns phone-number)

(defn number [phn]
  (let [norm-phn (->> phn (re-seq #"\d+") (reduce str))]
    (cond (= (count norm-phn) 10) norm-phn
          (= (count norm-phn) 11) (if (= (first norm-phn) \1)
                                   (apply str (rest norm-phn)) "0000000000")
          :else "0000000000")))

(defn area-code [phn] (apply str (take 3 (number phn))))

(defn pretty-print [phn]
  (let [norm-phn (number phn)
        take-num (fn [rng] (apply str (map #(nth norm-phn %) rng)))]
    (str "(" (take-num (range 3)) ") " (take-num (range 3 6)) "-"
         (take-num (range 6 10)))))

