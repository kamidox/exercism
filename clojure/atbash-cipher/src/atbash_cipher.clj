(ns atbash-cipher)

(defn- alpha? [c] (<= (int \a) (int c) (int \z)))

(defn- number? [c] (<= (int \0) (int c) (int \9)))

(defn- alpha-and-number [c] (or (alpha? c) (number? c)))

(defn- cipher
  "Do the following map cipher
   abcdefghijklmnopqrstuvwxyz
   zyxwvutsrqponmlkjihgfedcba"
  [c]
  (if (alpha? c)
    (let [delta (- (int c) (int \a))]
      (char (- (int \z) delta)))
    c))

(defn encode [msg]
  (->> (clojure.string/lower-case msg)
       (filter alpha-and-number)
       (apply str)
       (map cipher)
       (partition-all 5)
       (map #(apply str %))
       (clojure.string/join " ")))

