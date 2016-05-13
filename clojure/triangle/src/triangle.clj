(ns triangle)

(defn- valid-triangle? [a b c]
  (and (> (+ a b) c) (> (+ a c) b) (> (+ b c) a)))

(defn- isosceles? [a b c]
  (or (= a b) (= a c) (= b c)))

(defn type [a b c]
  (cond (and (= a b) (= a c)) :equilateral
        (and (valid-triangle? a b c) (isosceles? a b c)) :isosceles
        (valid-triangle? a b c) :scalene
        :else :illogical))

; ======================================================================
; Inspire by Official Solution: sorted before compare. count distinct.
; ======================================================================

(defn type [a b c]
  (let [sorted (sort > [a b c])]
    (if (>= (first sorted) (apply + (rest sorted))) :illogical
        (case (count (distinct sorted))
          1 :equilateral
          2 :isosceles
          3 :scalene))))

