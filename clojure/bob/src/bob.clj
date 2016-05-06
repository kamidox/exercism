(ns bob
  (:require [clojure.string :as str]))

(defn- silence? [msg] (str/blank? msg))

(defn- has-letter? [msg] (some #(Character/isLetter %) msg))

(defn- yell? [msg] (and (= msg (str/upper-case msg)) (has-letter? msg)))

(defn- question? [msg] (str/ends-with? msg "?"))

(defn- question-v2? [msg] (= \? (last msg)))

(defn- yell-v2? [msg]
  (let [letters (filter #(Character/isLetter %) msg)]
    (and (not (empty? letters)) (every? #(Character/isUpperCase %) letters))))

(defn bob/response-for [msg]
  (cond 
    (silence? msg) "Fine. Be that way!"
    (yell-v2? msg) "Whoa, chill out!"
    (question? msg) "Sure."
    :else "Whatever."))

; compare the performance between clojure.string/ends-with? and last.
(defn- performance-test [func msg n]
  (loop [n n]
    (if (= n 0) (func msg)
      (recur (dec n)))))

(defn do-performance-test
  "run (do-performance-test) in repl to compare performance." 
  ([] (do-performance-test 1000000))
  ([n]
   (do (print "question-v1?: ")
       (time (performance-test question? "hello?" n))
       (print "question-v2?: ")
       (time (performance-test question-v2? "hello?" n))
       (print "yell-v1?: ")
       (time (performance-test yell? "HELLO?" n))
       (print "yell-v2?: ")
       (time (performance-test yell-v2? "HELLO?" n)))))

