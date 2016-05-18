(ns pascals-triangle)

(defn- row-from-prev [prev-row]
  (->> (concat [0] prev-row [0])    ; [0 1 0]
       (partition 2 1)              ; [[0 1] [1 0]]
       (map #(apply + %))           ; [1 1]
       vec))

(def triangle (iterate row-from-prev [1N]))

(defn row [n] (nth triangle (dec n)))

