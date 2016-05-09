(ns anagram
  (:require [clojure.string :as str]))

(defn- match? [w1 w2]
  (let [word1 (str/lower-case w1)
        word2 (str/lower-case w2)]
    (and (= (frequencies word1) (frequencies word2))
         (not (= word1 word2)))))

(defn anagrams-for
  [word anagrams]
  (filter (partial match? word) anagrams))

