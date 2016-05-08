(ns word-count
  (:require [clojure.string :as str]))

(defn- add-one-word
  [cnt word]
  (if (cnt word) (assoc cnt word (inc (cnt word))) (assoc cnt word 1)))

(defn word-count
  [s]
  (let [all-words (filter #(not (empty? %)) (str/split (str/lower-case s) #"\W"))]
    (loop [cnt {} words all-words]
      (if (next words)
        (recur (add-one-word cnt (first words)) (next words))
        (add-one-word cnt (first words))))))

