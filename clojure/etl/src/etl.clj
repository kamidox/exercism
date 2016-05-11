(ns etl
  (:require [clojure.string :as str]))

(defn transform [dataset]
  (into (sorted-map)
        (for [[k values] dataset
              v values]
          {(str/lower-case v) k})))

; ============================================================
; Official solution is more simple:
; (into {} ...)
; This is beacause Map did not care about the order.
; (= {"a" 1 "b" 2} {"b" 2 "a" 1}) => true
; ============================================================

