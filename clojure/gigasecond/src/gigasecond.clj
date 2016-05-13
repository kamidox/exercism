(ns gigasecond
  (:import (java.util Calendar)))

(def ^:private gigasecond-in-millis 1000000000000)

(defn from [year month day]
  (let [c (Calendar/getInstance)]
    (.set c year (dec month) day)
    (.setTimeInMillis c (+ (.getTimeInMillis c) gigasecond-in-millis))
    [(.get c (Calendar/YEAR))
     (inc (.get c (Calendar/MONTH)))
     (dec (.get c (Calendar/DAY_OF_MONTH)))]))

