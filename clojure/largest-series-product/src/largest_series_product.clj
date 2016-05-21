(ns largest-series-product)

(defn- to-int [c] (- (int c) (int \0)))

(defn- valid? [digits] (every? #(<= (int \0) (int %) (int \9)) digits))

(defn largest-product [n digits]
  {:pre ((<= 0 n (count digits))
         (valid? digits))}
  (if (= n 0) 1
    (->> digits
         (map to-int)
         (partition n 1)
         (map #(apply * %))
         (apply max))))

