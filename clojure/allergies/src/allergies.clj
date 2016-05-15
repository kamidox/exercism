(ns allergies)

(def ^:private allergic-items {:eggs 1
                               :peanuts 2
                               :shellfish 4
                               :strawberries 8
                               :tomatoes 16
                               :chocolate 32
                               :pollen 64
                               :cats 128})

(defn- allergic? [score v] (> (bit-and score v) 0))

(defn allergies
  "Return allergies list for the given score. e.g. 3 -> [:eggs :shellfish]"
  [score]
  (let [total (apply + (vals allergic-items))
        score (bit-and score total)]
    (for [[k v] allergic-items :when (allergic? score v)] k)))

(defn allergic-to?
  "Return true/false to indicate does the given score allergic to given item."
  [score item]
  (allergic? score (allergic-items item)))

