(ns nucleotide-count)

(defn nucleotide-counts [strand]
  (conj {\A 0, \T 0, \G 0, \C 0} (frequencies strand)))

(defn count [nucl strand]
  {:post [%]}
  (let [nc (nucleotide-counts strand)]
    (nc nucl)))

