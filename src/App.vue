<template>
  <div id="app">
    <vue-jkanban v-model="board_data" />
    <button @click="addDefault">Add "Default" board</button>
    <br />
    <button id="addToDo" @click="addElementInToDoBoard">Add element in "To Do" Board</button>
    <br />
    <button id="removeBoard" @click="removeDoneBoard">Remove "Done" Board</button>
    <br />
    <button id="removeElement" @click="removeMyTastTest">Remove "My Task Test"</button>
  </div>
</template>

<script>
import VueJkanban from "./components/VueJkanban.vue";

export default {
  name: "app",
  data: function() {
    return {
      board_data: [
        {
          id: "_todo",
          title: "To Do (Can drop item only in working)",
          class: "info,good",
          dragTo: ["_working"],
          item: [
            {
              id: "_test_delete",
              title: "Try drag this (Look the console)",
              drag: function(el, source) {
                console.log("START DRAG: " + el.dataset.eid, source);
              },
              dragend: function(el) {
                console.log("END DRAG: " + el.dataset.eid);
              },
              drop: function(el) {
                console.log("DROPPED: " + el.dataset.eid);
              }
            },
            {
              title: "Try Click This!",
              click: function(el) {
                console.log(el);
                alert("click");
              },
              class: ["peppe", "bello"]
            }
          ]
        },
        {
          id: "_working",
          title: "Working (Try drag me too)",
          class: "warning",
          item: [
            {
              title: "Do Something!"
            },
            {
              title: "Run?"
            }
          ]
        },
        {
          id: "_done",
          title: "Done (Can drop item only in working)",
          class: "success",
          dragTo: ["_working"],
          item: [
            {
              title: "All right"
            },
            {
              title: "Ok!"
            }
          ]
        }
      ]
    };
  },
  methods: {
    addDefault: function() {
      this.board_data.push(
        {
          id: "_default",
          title: "Kanban Default",
          item: [
            {
              title: "Default Item"
            },
            {
              title: "Default Item 2"
            },
            {
              title: "Default Item 3"
            }
          ]
        }
      );
    },
    addElementInToDoBoard: function() {
        this.board_data[0].item.push({
          title: "Test Add"
        });
     },
    removeDoneBoard: function() {
      var vm = this
      this.board_data.some(function(board, idx) {
        if (board.id === "_done") {
          vm.$data.board_data.pop(idx)
          return true
        }
      })
    },
    removeMyTastTest: function() {
      var vm = this
      this.board_data.some(function(board, boardIdx) {
        var deleted = false
        if (board.id === "_todo") {
          board.item.some(function(item, idx) {
            if (item.id == "_test_delete") {
              vm.$data.board_data[boardIdx].item.pop(idx)
              deleted = true
              return true
            }
          })

          return deleted
        }
      })
    }
  },
  components: {
    VueJkanban
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  font-family: "Lato";
  margin: 0;
  padding: 0;
}

#myKanban {
  overflow-x: auto;
  padding: 20px 0;
}

.success {
  background: #00b961;
}

.info {
  background: #2a92bf;
}

.warning {
  background: #f4ce46;
}

.error {
  background: #fb7d44;
}
</style>
