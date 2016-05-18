(ns kindergarten-garden
  (:require [clojure.string :refer [lower-case split]]))

(def default-students
  ["Alice" "Bob" "Charlie" "David"
   "Eve" "Fred" "Ginny" "Harriet"
   "Ileana" "Joseph" "Kincaid" "Larry"])

(def ^:private default-plants
  {"V" :violets
   "R" :radishes
   "G" :grass
   "C" :clover})

(defn- map-student [plants index student]
  (let [student-symbol (keyword student)
        cups (partition 2 plants)
        line-2 (quot (count cups) 2)]
    (if (>= index line-2) nil
      {student-symbol (concat (nth cups index) (nth cups (+ line-2 index)))})))

(defn plant-name [group]
  (let [student-name (first (keys group))
        plants (student-name group)
        full-name (map default-plants plants)]
    {student-name full-name}))

(defn garden
  ([plants] (garden plants default-students))
  ([plants students]
   (let [students (sort (map lower-case students))
         plants (re-seq #"[VRCG]" plants)]
     (->> (map-indexed (partial map-student plants) students)
          (filter #(not (nil? %)))
          (map plant-name)
          (apply conj)))))


