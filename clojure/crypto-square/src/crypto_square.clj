(ns crypto-square
  (:require [clojure.string :refer [lower-case]]))

(defn normalize-plaintext [txt]
  (->> (lower-case txt)
       (re-seq #"[\w+\d+]")
       (apply str)))

(defn square-size [txt]
  (let [s (Math/sqrt (count txt))
        f (int (Math/floor s))]
    (if (zero? (mod s f)) f (inc f))))

(defn plaintext-segments [txt]
  (let [norm-txt (normalize-plaintext txt)
        size (square-size norm-txt)]
    (->> (partition-all size norm-txt)
         (map #(apply str %)))))

(defn ciphertext [txt]
  (let [seg (plaintext-segments txt)
        len (count (first seg))]
    (apply str (for [n (range len) s seg] (nth s n nil)))))

(defn normalize-ciphertext [txt]
  (let [cipher (ciphertext txt)
        r (square-size txt)]
    (->> (partition-all (dec r) cipher)
         (map #(apply str %))
         (clojure.string/join " "))))

; Following code is copy from official solution.
(defn normalize-ciphertext [input]
  (let [cipher                  (ciphertext input)
        cipher-length           (count cipher)
        square-max              (square-size cipher)
        square-longest          (int (Math/ceil (/ (count cipher) square-max)))
        square-shortest         (int (Math/floor (/ (count cipher) square-max)))
        square-count-long-sides (- cipher-length (* square-max square-shortest))]
    (apply str (interpose " "
                    (map #(apply str %1)
                         (concat (partition square-longest square-longest nil
                                    (take (* square-count-long-sides square-longest) cipher))
                                 (partition square-shortest square-shortest nil
                                    (take-last (- cipher-length (* square-count-long-sides square-longest)) cipher))))))))

