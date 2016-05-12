(ns space-age)

(def ^:private seconds-in-earth-year (* 365.25 24 60 60))

(def ^:private planets-factor {
  :mercury 0.2408467
  :venus 0.61519726
  :earth 1.0
  :mars 1.8808158
  :jupiter 11.862615
  :saturn 29.447498
  :uranus 84.016846
  :neptune 164.79132})

; use `symbol` to create function names.
; use `intern` to create function dynamic in current namespace.
; use `doseq` to wrap them all.
; This is a GOOD demo for create function dynamiclly.
(doseq [[planet factor] planets-factor]
  (let [fn-name (symbol (str "on-" (name planet)))]
    (intern *ns* fn-name (fn [seconds] 
                           (/ (/ seconds seconds-in-earth-year) factor)))))

; Someone use this method to create a translation program. It generates thousands of functions,
; each function translate one character. And all these make up a translate program.
; For further information, refer to: https://github.com/tyrchen/chinese_translation.
; TODO: That's elixir version, I may implement a clojure version.

