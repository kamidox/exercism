(ns binary-search)

(defn middle [coll] (int (/ (count coll) 2)))

(defn search-for
  "search for v in l, return the index."
  [target-val coll]
  (loop [start-id 0
         end-id (count coll)
         mid-id (middle coll)]
    (cond (= target-val (nth coll mid-id)) mid-id
          (or (= start-id mid-id) (= mid-id end-id))
          (throw (AssertionError. "not found"))
          (< target-val (nth coll mid-id))
          (recur start-id mid-id (int (/ (+ start-id mid-id) 2)))
          :else (recur mid-id end-id (int (/ (+ mid-id end-id) 2))))))

