(ns leap)

(defn leap-year? [y]
  (if (= 0 (mod y 100)) (= 0 (mod y 400)) (= 0 (mod y 4))))

