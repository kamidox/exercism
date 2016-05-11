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
          (throw (Exception. "not found"))
          (< target-val (nth coll mid-id))
          (recur start-id mid-id (int (/ (+ start-id mid-id) 2)))
          :else (recur mid-id end-id (int (/ (+ mid-id end-id) 2))))))

; ======================================================================
; Official solution
; ======================================================================
(defn search-for-v2
  [elem alist]
  (let [middle (middle alist)
        cur-elem (nth alist middle)]
    (cond
      (= cur-elem elem) middle
      (or (= middle (count alist)) (zero? middle)) (throw (Exception. (format "%s not found in list" elem)))
      (< cur-elem elem) (+ middle (search-for-v2 elem (drop middle alist)))
      (> cur-elem elem) (search-for-v2 elem (take middle alist)))))
; ==========================================================================
; Performance Test
; ==========================================================================
(defn do-performance-test
  ([] (do-performance-test 1))
  ([n]
   (println "================ performance test ================")
   (print "search-for: ")
   (time (dorun (repeatedly n #(search-for 999999 (range 1000000)))))
   (print "search-for-v2: ")
   (time (dorun (repeatedly n #(search-for-v2 999999 (range 1000000)))))))

; (do-performance-test)
