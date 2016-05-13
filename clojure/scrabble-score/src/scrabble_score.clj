(ns scrabble-score
  (:require [clojure.string :as str]))

(def letters-score
  {1 "AEIOULNRST"
   2 "DG"
   3 "BCMP"
   4 "FHVWY"
   5 "K"
   8 "JX"
   10 "QZ"})

(defn- score-of-letter [c score letters]
  (if (>= (.indexOf letters (str/upper-case (str c))) 0) score 0))

(defn score-letter [c]
  (reduce + (for [[score letters] letters-score] (score-of-letter c score letters))))

(defn score-word [word]
  (reduce + (for [[score letters] letters-score
                  c word] (score-of-letter c score letters))))

