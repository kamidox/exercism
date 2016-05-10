(ns phone-number
  (:require [clojure.string :as str]))

(defn number [phn]
  (let [norm-phn (->> phn (re-seq #"\d+") (reduce str))]
    (cond (= (count norm-phn) 10) norm-phn
          (= (count norm-phn) 11) (if (= (first norm-phn) \1)
                                   (apply str (rest norm-phn)) "0000000000")
          :else "0000000000")))

(defn area-code [phn] (apply str (take 3 (number phn))))

(defn pretty-print [phn]
  (let [norm-phn (number phn)
        take-num (fn [rng] (apply str (map #(nth norm-phn %) rng)))]
    (str "(" (take-num (range 3)) ") " (take-num (range 3 6)) "-"
         (take-num (range 6 10)))))

; =============================================================================
; Official solution: extract-parts is beautiful
; =============================================================================
(defn- digits-only
  [input]
  (str/replace input #"\D" ""))

(defn- extract-parts
  [input]
  (if-let [matches (re-find #"^1?(...)(...)(....)$" input)]
    (rest matches)
    ["000" "000" "0000"]))

(defn- parts
  [input]
  (-> input
      digits-only
      extract-parts))

(defn number-v2 [input]
  (str/join (parts input)))

(defn area-code [input]
  (first (parts input)))

(defn pretty-print [input]
  (let [[area-code exchange subscriber] (parts input)]
    (str "(" area-code ") " exchange "-" subscriber)))

; ==========================================================================
; Performance Test
; ==========================================================================
(defn do-performance-test
  ([] (do-performance-test 10000))
  ([n]
   (println "================ performance test ================")
   (print "number: ")
   (time (dorun (repeatedly n #(number "112234567890"))))
   (print "number-v2: ")
   (time (dorun (repeatedly n #(number-v2 "112234567890"))))))

; (do-performance-test)
