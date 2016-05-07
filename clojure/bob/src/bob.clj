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
; implement performance test with core functions repeatedly
(defn do-performance-test
  ([] (do-performance-test 10000))
  ([n]
   (print "question-v1?: ")
   (time (dorun (repeatedly n #(question? "hello?"))))
   (print "question-v2?: ")
   (time (dorun (repeatedly n #(question-v2? "hello?"))))
   (print "yell-v1?: ")
   (time (dorun (repeatedly n #(yell? "HELLO?"))))
   (print "yell-v2?: ")
   (time (dorun (repeatedly n #(yell-v2? "HELLO?"))))))

