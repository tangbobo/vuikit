import css from '@vuikit/core/utils/css'
import { one } from '@vuikit/core/utils/event'
import { transitionend } from '@vuikit/core/helpers/env'
import mergeData from '@vuikit/core/helpers/fn-data-merge'
import { width, height } from '@vuikit/core/helpers/position'
import { addClass, removeClass } from '@vuikit/core/utils/class'

import common from './_common'

const win = window
const doc = document.documentElement

export default {
  functional: true,
  render (h, { parent: vm, data, children }) {

    const def = {
      props: {
        css: false
      },
      on: {
        beforeEnter (el) {
          const scrollbarWidth = width(win) - doc.offsetWidth

          css(doc, 'overflowY', scrollbarWidth && vm.overlay
            ? 'scroll'
            : ''
          )

          addClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-slide')
        },
        enter (el, done) {
          height(el) // force reflow
          addClass(el, 'uk-open')

          // indicate end of transition
          one(el, transitionend, done, e => e.target === vm.$refs.bar)
        },
        beforeLeave (el) {
          removeClass(el, 'uk-open')
        },
        leave (el, done) {
          // indicate end of transition
          one(el, transitionend, done, e => e.target === vm.$refs.bar)
        },
        afterLeave (el) {
          removeClass(vm.$refs.bar, 'uk-offcanvas-bar-animation uk-offcanvas-slide')
        }
      }
    }

    return h('transition', mergeData(data, def, common(vm)), children)
  }
}