(ns robot-simulator)

(def ^:private directions [:north :east :south :west])

(defn robot [coord bearing]
  {:bearing bearing :coordinates coord})

(defn turn [bearing dirs]
  (let [cur-bearing (drop-while #(not (= bearing %)) (cycle dirs))]
    (nth cur-bearing 1)))

(defn turn-right [bearing] (turn bearing directions))

(defn turn-left [bearing] (turn bearing (reverse directions)))

(defn move-forward [robbie]
  (let [bearing (:bearing robbie)
        coords (:coordinates robbie)
        new-coords (cond (= bearing :north) (assoc coords :y (inc (:y coords)))
                         (= bearing :east) (assoc coords :x (inc (:x coords)))
                         (= bearing :west) (assoc coords :x (dec (:x coords)))
                         (= bearing :south) (assoc coords :y (dec (:y coords))))]
    (assoc robbie :coordinates new-coords)))

(defn move-step [robbie step]
  (cond (= step \R) (assoc robbie :bearing (turn-right (:bearing robbie)))
        (= step \L) (assoc robbie :bearing (turn-left (:bearing robbie)))
        (= step \A) (move-forward robbie)))

(defn simulate [steps robbie]
  (reduce move-step robbie steps))
