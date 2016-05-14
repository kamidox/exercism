(ns roman-numerals)

(def ^:private roman-chars-table
  {1 ["I" "V"]
   10 ["X" "L"]
   100 ["C" "D"]
   1000 ["M" nil]
   })

(defn- to-roman-chars [digit level]
  "Convert one digit to roman chars.
   For example: [1 1] -> I; [4 1] -> IV; [2 10] -> XX; [5 10] -> L; [4 100] -> CD"
  (let [roman-chars (roman-chars-table level)]
    (cond (<= digit 3) (apply str (repeat digit (roman-chars 0)))
          (= digit 4) (apply str roman-chars)
          (= digit 5) (roman-chars 1)
          (<= digit 8) (apply str (roman-chars 1) (repeat (- digit 5) (roman-chars 0)))
          (= digit 9) (apply str (roman-chars 0) ((roman-chars-table (* level 10)) 0)))))

(defn- to-roman-chars-seq [digits]
  "Convert digits to roman chars. Digits contain 4 digits.
   For example: [0 0 2 7] -> ['' '' 'XX' 'VII']"
  (map #(to-roman-chars %1 %2) digits [1000 100 10 1]))

(defn- to-digits [n]
  "Convert number to digit seq. For example: 1024 -> [1 0 2 4]"
  (map #(mod (quot n %) 10) [1000 100 10 1]))

(defn numerals
  "convert number to roman numerals."
  [n]
  {:pre [(< n 4000)]}
  (let [digits (to-digits n)
        roman-chars-seq (to-roman-chars-seq digits)]
    (apply str roman-chars-seq)))

