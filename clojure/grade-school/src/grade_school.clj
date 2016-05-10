(ns grade-school)

(defn add [db name grade]
  (assoc db grade (conj (vec (db grade)) name)))

(defn grade [db grade]
  (if-let [names (db grade)] names []))

(defn sorted [db]
  (let [sort-val (fn [db key] (assoc db key (vec (sort (db key)))))]
    (into (sorted-map) (reduce sort-val db (keys db)))))

