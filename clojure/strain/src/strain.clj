(ns strain)

(defn retain
  "Keep items in coll when pred is true."
  [pred coll]
  (loop [ret-coll [] coll coll]
    (if-let [item (first coll)]
      (if (pred item)
        (recur (conj ret-coll item) (rest coll))
        (recur ret-coll (rest coll)))
      ret-coll)))

(defn discard
  "Discard items in coll when pred is true."
  [pred coll]
  (retain (complement pred) coll))
; ======================================================================
; I prefer loop-recur than recursion since recursion may consume
; stack frame if you did not do it carefully and may cause stack
; over flow since JVM does not support TCO (https://en.wikipedia.org/wiki/Tail_call)
; But I have to say that the official solution is more beautiful than mine.
; ======================================================================
(defn retain-v2
  "a simple (nonlazy) reimplementation of filter"
  [pred s]
  (let [[first & rest] s]
    (cond
      (empty? s) '()
      (pred first) (cons first (retain pred rest))
      :else (retain pred rest))))

(defn discard-v2
  "a simple (nonlazy) reimplementation of remove"
  [pred s]
  (retain (complement pred) s))
; ==========================================================================
; Performance Test
; ==========================================================================
(defn do-performance-test
  ([] (do-performance-test 10000))
  ([n]
   (println "================ performance test ================")
   (print "retain: ")
   (time (dorun (repeatedly n #(retain even? (range 100)))))
   (print "retain-v2: ")
   (time (dorun (repeatedly n #(retain-v2 even? (range 100)))))))

; (do-performance-test)

