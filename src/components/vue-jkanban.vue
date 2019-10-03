<template>
    <div></div>
</template>

<script>
var jKanban = require('jkanban');

export default {
  data: function () {
    return {
      count: 0
    }
  },
  mounted: function() {
    console.log("mounted")
    this._jkanban = new jKanban({
        boards: [
    {
        "id"    : "board-id-1",               // id of the board
        "title" : "Board Title",              // title of the board
        "class" : "class1,class2",        // css classes to add at the title
        "dragTo": ['another-board-id'],   // array of ids of boards where items can be dropped (default: [])
        "item"  : [                           // item of this board
            {
                "id"    : "item-id-1",        // id of the item
                "title" : "Item 1"            // title of the item
            },
            {
                "id"    : "item-id-2",
                "title" : "Item 2"
            }
        ]
    },
    {
        "id"    : "board-id-2",
        "title" : "Board Title 2"
    }
]
    });
  }
}
</script>