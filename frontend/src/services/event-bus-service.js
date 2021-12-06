import Vue from 'vue'

export const SHOW_MSG = 'show-msg'

export const eventBusService = new Vue()

export function showMsg(txt, type = 'success') {
  console.log('show msg',txt);
  // debugger
  eventBusService.$emit(SHOW_MSG, { txt, type })
}
