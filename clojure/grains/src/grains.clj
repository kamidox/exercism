(ns grains)

(defn- seq-grains [] (iterate (fn [n] (* n 2)) 1N))

(defn square [n]
  (nth (seq-grains) (dec n)))

(defn total []
  (reduce + (take 64 (seq-grains))))

