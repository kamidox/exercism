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

