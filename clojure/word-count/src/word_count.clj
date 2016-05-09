(ns word-count
  (:require [clojure.string :as str]))

(defn- add-one-word
  [cnt word]
  (if (cnt word) (assoc cnt word (inc (cnt word))) (assoc cnt word 1)))

(defn word-count
  [s]
  (let [all-words (str/split (str/lower-case s) #"\W+")]
    (loop [cnt {} words all-words]
      (if (next words)
        (recur (add-one-word cnt (first words)) (next words))
        (add-one-word cnt (first words))))))

; Another Functional Programming style approach
(defn word-count-v2
  [s]
  (->> (str/split s #"\W+")
       (map str/lower-case)
       (group-by identity)
       (reduce (fn [cnt [word occur]]
                 (assoc cnt word (count occur))) {})))

; Yet another Functional Programming style approach
(defn- words [s] (re-seq #"\w+" s))

(defn word-count-v3 [s]
  (-> s str/lower-case words frequencies))

; Performance testing
(defn do-performance-test
  ([] (do-performance-test 10000))
  ([n]
   (println "======== performance test ========")
   (print "word-count: ")
   (time (dorun (repeatedly n #(word-count "hello joey and hello lily"))))
   (print "word-count-v2: ")
   (time (dorun (repeatedly n #(word-count-v2 "hello joey and hello lily"))))
   (print "word-count-v3: ")
   (time (dorun (repeatedly n #(word-count-v3 "hello joey and hello lily"))))))

; (do-performance-test)
