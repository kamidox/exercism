(ns grade-school)

(defn grade [db grade-level] (db grade-level []))

(defn add [db name grade-level]
  (assoc db grade-level (conj (grade db grade-level) name)))

(defn sorted [db]
  (let [sort-val (fn [db key] (assoc db key (vec (sort (db key)))))]
    (into (sorted-map) (reduce sort-val db (keys db)))))

; =============================================================================
; Official solution
; =============================================================================

(defn sorted-v2
  "show the sorted roster for each grade"
  [db]
  (into (sorted-map)
        (for [[grade-level roster] db]
          [grade-level (sort roster)])))

; ==========================================================================
; Performance Test
; ==========================================================================
(defn do-performance-test
  ([] (do-performance-test 10000))
  ([n]
   (println "================ performance test ================")
   (print "sorted: ")
   (time (dorun (repeatedly n #(sorted (-> {} 
                                           (add "Jennifer" 4)
                                           (add "Kareem" 6)
                                           (add "Christopher" 4)
                                           (add "Kyle" 3))))))
   (print "sorted-v2: ")
   (time (dorun (repeatedly n #(sorted-v2 (-> {}
                                              (add "Jennifer" 4)
                                              (add "Kareem" 6)
                                              (add "Christopher" 4)
                                              (add "Kyle" 3))))))))

; (do-performance-test)
