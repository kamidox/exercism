(ns hamming)

(defn distance [s1 s2]
  (when (= (count s1) (count s2))
    (reduce + (map #(if (= %1 %2) 0 1) s1 s2))))

