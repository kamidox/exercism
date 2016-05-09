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

; ==========================================================================
; Offical solution
; ==========================================================================
(defn- anagram? [w c]
  (let [w (str/lower-case w)
        c (str/lower-case c)]
    (and (= (sort w) (sort c))
         (not= w c))))

(defn anagrams-for-v2
  [word anagrams]
  (filter (partial anagram? word) anagrams))

; ==========================================================================
; Performance Test
; ==========================================================================
(defn do-performance-test
  ([] (do-performance-test 100000))
  ([n]
   (println "==================== performance test ====================")
   (print "anagrams-for: ")
   (time (dorun (repeatedly n #(anagrams-for "ant" ["tan" "stand" "at"]))))
   (print "anagrams-for-v2: ")
   (time (dorun (repeatedly n #(anagrams-for-v2 "ant" ["tan" "stand" "at"]))))))

; (do-performance-test)

