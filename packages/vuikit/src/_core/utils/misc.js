import { getCssVar } from './style'
import { isString, toFloat } from './lang'

export function toMedia (value) {
  if (isString(value)) {
    if (value[0] === '@') {
      const name = `media-${value.substr(1)}`
      value = toFloat(getCssVar(name))
    } else if (isNaN(value)) {
      return value
    }
  }

  return value && !isNaN(value) ? `(min-width: ${value}px)` : false
}

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 */
export function debounce (fn, wait, immediate) {
  var timeout

  return function () {
    var context = this
    var args = arguments
    var later = function () {
      timeout = null
      if (!immediate) fn.apply(context, args)
    }
    var callNow = immediate && !timeout

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)

    if (callNow) {
      fn.apply(context, args)
    }
  }
}

/*
 * Generates a range of numbers
 */
export function range (start, stop, step = 1) {
  if (typeof stop === 'undefined') {
    stop = start
    start = 0
  }

  return Array.from(new Array(Math.floor((stop - start) / step)), (x, i) => start + (i * step))
}
