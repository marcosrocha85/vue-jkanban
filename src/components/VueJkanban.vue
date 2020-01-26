<template>
  <div id="vue-jkanban"></div>
</template>

<script>
require("jkanban")
require("jkanban/jkanban.css")

export default {
  name: 'vue-jkanban',
  props: {
    gutter: {
      type: String,
      default: "15px"
    },
    widthBoard: {
      type: String,
      default: "250px"
    },
    responsivePercentage: {
      type: Boolean,
      default: false
    },
    dragItems: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      default: function() { return [] }
    },
    dragBoards: {
      type: Boolean,
      default: true
    },
    addItemButton: {
      type: Boolean,
      default: false
    },
    buttonContent: {
      type: String,
      default: "+"
    },
    itemHandleOptions: {
      type: Object,
      default: function () {
        return {
          enabled: false,
          handleClass: "item_handle",
          customCssHandler: "drag_handler",
          customCssIconHandler: "drag_handler_icon",
          customHandler: "<span class='item_handle'>+</span> %s"
        }
      }
    }
  },
  data: function() {
    return {
      count: 0
    };
  },
  mounted: function() {
    let selfRef = this
    this.onClick = function(el) {
      selfRef.$emit('click', el)
    }
    this.onDragEl = function (el, source) {
      selfRef.$emit('dragEl', { el: el, source: source })
    }
    this.onDragendEl = function (el) {
      selfRef.$emit('dragendEl', el)
    }
    this.onDropEl = function (el, target, source, sibling) {
      selfRef.$emit('dropEl', { el: el, target: target, source: source, sibling: sibling })
    }
    this.onDragBoard = function (el, source) {
      selfRef.$emit('dragBoard', { el: el, source: source })
    }
    this.onDragendBoard = function (el) {
      selfRef.$emit('dragendBoard', el)
    }
    this.onButtonClick = function(el, boardId) {
      selfRef.$emit('buttonClick', { el: el, boardId: boardId })
    }

    this._jkanban = new window.jKanban({
      element: '#vue-jkanban',
      gutter: this.gutter,
      widthBoard: this.widthBoard,
      responsivePercentage: this.responsivePercentage,
      dragItems: this.dragItems,
      boards: this.value,
      dragBoards: this.dragBoards,
      addItemButton: this.addItemButton,
      buttonContent: this.buttonContent,
      itemHandleOptions: this.itemHandleOptions,
      click: this.onClick,
      dragEl: this.onDragEl,
      dragendEl: this.onDragendEl,
      dropEl: this.onDropEl,
      dragBoard: this.onDragBoard,
      dragendBoard: this.onDragendBoard,
      buttonClick: this.onButtonClick
    });
  }
};
</script>

<style>
</style>
