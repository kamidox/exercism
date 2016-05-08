(ns rna-transcription
  (:require [clojure.string :as str]))

(defn- valid-dna-strands?
  [dnas]
  (every? #(or (= % \G) (= % \C) (= % \T) (= % \A)) dnas))

(defn- to-rna-nuclneotide
  "Give a DNA nuclneotide, return its complement RNA nuclneotide."
  [nucl]
  (cond
    (= \G nucl) \C
    (= \C nucl) \G
    (= \T nucl) \A
    (= \A nucl) \U))

(defn to-rna [dnas]
  "Give a DNA strand, return its transcribed RNA strand."
  (assert (valid-dna-strands? dnas))
  (str/join "" (map to-rna-nuclneotide dnas)))

; ==========================================================================
; Offical solution
; ==========================================================================
(def dna->rna {\G \C
               \C \G
               \A \U
               \T \A})

; use :post assert
; ref: http://blog.csdn.net/linux2_scdn/article/details/41012581
(defn- translate [c]
  {:post [%]}
  (dna->rna c))

(defn to-rna-v2 [dna]
  (apply str (map translate dna)))

; ==========================================================================
; Performance Test
; ==========================================================================
(defn do-performance-test
  ([] (do-performance-test 10000))
  ([n]
   (println "======== performance test ========")
   (print "to-rna: ")
   (time (dorun (repeatedly n #(to-rna "ACGTGGTCTTAA"))))
   (print "to-rna-v2: ")
   (time (dorun (repeatedly n #(to-rna-v2 "ACGTGGTCTTAA"))))))

(do-performance-test)
