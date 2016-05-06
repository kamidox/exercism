(ns hello-world)

(defn hello
  "hello clojure world"
  ([] (hello "World"))
  ([name] (str "Hello, " name "!")))

