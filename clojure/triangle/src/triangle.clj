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

