(ns queen-attack)

(def ^:private board-width 8)
(def ^:private board-height 8)
(def ^:private board-line [0 0 0 0 0 0 0 1])
(def ^:private board-cell-table {0 "_ " 1 "_\n" :w "W " :b "B "})

(defn position-queen [coord mark board]
  (if coord
    (let [[x y] coord] (assoc board (+ (* board-width x) y) mark))
    board))

(defn board-string [queens]
  (let [board (apply concat (repeat board-height board-line))
        white-queen (:w queens)
        black-queen (:b queens)]
    (->> (vec board)
         (position-queen white-queen :w)
         (position-queen black-queen :b)
         (map board-cell-table)
         (apply str))))

(defn can-attack [queens]
  (let [[x1 y1] (:w queens)
        [x2 y2] (:b queens)]
    (or (= x1 x2) (= y1 y2) (= (- x1 x2) (- y1 y2)))))

