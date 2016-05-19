(ns robot-simulator)

(def ^:private directions [:north :east :south :west])

(defn robot [coord bearing]
  {:bearing bearing :coordinates coord})

(defn turn [bearing dirs]
  (let [cur-bearing (drop-while #(not (= bearing %)) (cycle dirs))]
    (nth cur-bearing 1)))

(defn turn-right [bearing] (turn bearing directions))

(defn turn-left [bearing] (turn bearing (reverse directions)))

