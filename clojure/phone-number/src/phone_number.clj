(ns phone-number)

(defn number [phn]
  (let [norm-phn (->> phn (re-seq #"\d+") (reduce str))]
    (cond (= count(norm-phn) 10) norm-phn
          (= count(norm-phn) 11) (if (= (first norm-phn) \1) (rest norm-phn) "0000000000")))
