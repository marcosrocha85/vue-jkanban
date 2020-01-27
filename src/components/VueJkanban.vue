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
  watch: {
    value: {
      deep: true,
      handler: function(after) {
        var vm = this

        let boardsAdded = after.filter(function(board, idx) {
          if (idx > vm.getOldData().length - 1) {
            return true
          }
        })

        let boardsRemoved = vm.getOldData().filter(function(board) {
          return !after.some(function(currentBoard) {
            return currentBoard.id == board.id
          })
        })

        if (boardsAdded.length == 0 && boardsRemoved.length == 0) {
          var itemsAdded = []
          after.filter(function(p, idxBoard) {
            return p.item.some(function(currentItem, idx) {
              if (idx > vm.getOldData()[idxBoard].item.length - 1) {
                currentItem.boardId = p.id
                itemsAdded.push(currentItem)
                return true;
              }
            })
          })

          var itemsRemoved = []
          vm.getOldData().filter(function(board, idxBoard) {
            board.item.forEach(function(oldItem) {
              let itemFound = after[idxBoard].item.some(function(newItem) {
                console.log(oldItem.id, newItem.id)
                return oldItem.id == newItem.id
              })
              if (!itemFound) 
              {
                itemsRemoved.push(oldItem)
              }
            })
          })

          itemsAdded.forEach(function(item) {
            let boardId = item.boardId
            delete item.boardId
            vm._jkanban.addElement(boardId, item)
          })

          itemsRemoved.forEach(function(item) {
console.log("removing", item)            
            vm._jkanban.removeElement(item.id)
          })
        }

        vm.setValue()
        boardsAdded.forEach(function (board) {
          vm._jkanban.addBoards([board])
        })

        boardsRemoved.forEach(function (board) {
          vm._jkanban.removeBoard(board.id)
        })
      }
    }
  },
  methods: {
    setValue: function() {
      /* global _ */
      this._oldData = _.cloneDeep(this.value)
    },
    getOldData: function() {
      return this._oldData
    }
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

    this._oldData = []
    this._jkanban = new window.jKanban({
      element: '#vue-jkanban',
      boards: [],
      gutter: this.gutter,
      widthBoard: this.widthBoard,
      responsivePercentage: this.responsivePercentage,
      dragItems: this.dragItems,
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
    let vm = this
    setTimeout(function () {
      vm._jkanban.addBoards(vm.value)
    }, 200)
    this.setValue()
  }
};
</script>

<style>
</style>
