(ns beer-song
  (:require [clojure.string :as s]))

(defn- bottle-of-beer [n]
  (cond (= 0 n) "no more bottles of beer"
        (= 1 n) "1 bottle of beer"
        :else (str (if (< n 0) 99 n) " bottles of beer")))

(defn- take-one-and-pass-around [n]
  (cond (= 0 n) "Go to the store and buy some more, "
        (= 1 n) "Take it down and pass it around, "
        :else "Take one down and pass it around, "))

(defn verse [n]
  (str (s/capitalize (bottle-of-beer n)) " on the wall, " (bottle-of-beer n)".\n"
       (take-one-and-pass-around n) (bottle-of-beer (dec n)) " on the wall.\n"))

(defn sing
  ([fr] (sing fr 0))
  ([fr to]
   (let [seq-n (range fr (dec to) -1)
         ver-n (map verse seq-n)]
     (s/join "\n" ver-n))))

