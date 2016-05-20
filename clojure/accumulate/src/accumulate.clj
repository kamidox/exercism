(ns accumulate)

(defn accumulate [f coll]
  (loop [out [] in coll]
    (if (first in)
      (recur (cons (f (first in)) out) (rest in))
      (reverse out))))

