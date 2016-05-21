(ns binary-search-tree)

; [value left-sub-tree right-sub-tree]
(defn singleton [elem] [elem nil nil])
(defn value [tree] (first tree))
(defn left [tree] (second tree))
(defn right [tree] (last tree))

(defn insert [elem tree]
  (if (empty? tree)
    (singleton elem)
    (let [x (value tree)]
      (if (<= elem x)
        [x (insert elem (left tree)) (right tree)]
        [x (left tree) (insert elem (right tree))]))))

(defn from-list [coll]
  (reduce #(insert %2 %1) nil coll))

(defn to-list [tree]
  (if (empty? tree)
    tree
    (concat (to-list (left tree)) [(value tree)] (to-list (right tree)))))

