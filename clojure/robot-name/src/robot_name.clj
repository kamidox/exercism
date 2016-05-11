(ns robot-name)

(def letters (map char (range 65 91)))

(defn gen-name []
  (str (apply str (take 2 (shuffle letters)))
       (format "%03d" (rand-int 1000))))

(defn robot [] {:name (atom "")})

(defn robot-name [robot]
  (let [n @(:name robot)]
    (if (= "" n) (swap! (:name robot) (fn [_] (gen-name))) n)))

(defn reset-name [robot] (swap! (:name robot) (fn [_] "")))

