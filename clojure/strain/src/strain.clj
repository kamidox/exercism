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
  (loop [ret-coll [] coll coll]
    (if-let [item (first coll)]
      (if (pred item)
        (recur ret-coll (rest coll))
        (recur (conj ret-coll item)(rest coll)))
      ret-coll)))

; I prefer loop-recur than recursion since recursion may consume
; stack frame if you did not do it carefully and may cause stack
; over flow since JVM does not support TCO (https://en.wikipedia.org/wiki/Tail_call)

