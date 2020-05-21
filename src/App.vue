<template>
  <div id="app">

    <!-- nav bar -->
    <nav class="navbar navbar-expand-lg navbar-light navbar-light" style="background-color: #e3f2fd;">
      <span class="navbar-brand mb-0 h1">Sorting Visualizer</span>

      <div class="collapse navbar-collapse" id="main-nav">
        <!-- left side nav -->
        <ul class="navbar-nav mr-auto">
          <li class="divider"></li>
          <!-- select algo dropdown -->
          <li class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <fa-icon :icon="['fas', 'random']" /> {{ algoText }}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a href="#" class="dropdown-item" @click="algo = 'bubble'">Bubble Sort</a>
              <a href="#" class="dropdown-item" @click="algo = 'merge'">Merge Sort</a>
              <a href="#" class="dropdown-item" @click="algo = 'insertion'">Insertion Sort</a>
              <a href="#" class="dropdown-item" @click="algo = 'selection'">Selection Sort</a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item" @click="algo = 'quick'">Quick Sort</a>
            </div>
          </li>
          <li>
            <a href="#" class="nav-link" @click="didSortPress">
              <fa-icon :icon="['fas', 'filter']" /> Sort!
            </a>
          </li>
          <li>
            <a href="#" class="nav-link" @click="updateArr">
              <fa-icon :icon="['fas', 'align-right']" /> Generate new array of size ({{ arrSize }}):
            </a>
          </li>
          <!-- array size slider -->
          <li>
            <input type="range" class="custom-range" id="arrySizeSlider" min="40" max="200" step="1" v-model="arrSize">
          </li>
        </ul>
        <!-- right side nav -->
        <ul class="navbar-nav">
          <!-- GitHub page link -->
          <li class="nav-item">
            <a href="https://github.com/huaqiwen/sorting-visualizer" class="nav-link">
              <fa-icon :icon="['fab', 'github']" /> A sorting algorithm visualizer written in Vue.
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">
      <div style="align-self: center">
        <div class="strip" v-for="i in parseInt(arrSize)" :style="getStripStyle(i)"></div>
      </div>
    </div>

  </div>
</template>

<script>
// for bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

export default {
  name: 'app',
  data: function () {
    return {
      algo: "",
      arrSize: '120',
      windowHeight: window.innerHeight,
      arr: [...Array(120)].map(() => [Math.ceil(Math.random() * 99), 'lightblue'])
    }
  },
  watch: {
    arrSize: function (val) {
      this.arr = [...Array(parseInt(val))].map(() => [Math.ceil(Math.random() * 99), 'lightblue']);
    }
  },
  computed: {
    algoText: function () {
      switch (this.algo) {
        case "":
          return "Select an Algorithm";
        case "bubble":
          return "Bubble Sort";
        case "merge":
          return "Merge Sort";
        case "selection":
          return "Selection Sort";
        case "insertion":
          return "Insertion Sort";
        case "quick":
          return "Quick Sort";
      }
    }
  },
  methods: {
    async didSortPress() {
      switch (this.algo) {
        case "":
          alert("Please choose an algorithm first.");
          break;
        case "bubble":
          console.log("bubble sorting");
          let swap;
          let n = this.arr.length - 1;
          do {
            swap = false;
            for (let i=0; i < n; i++) {
              this.arr[i][1] = 'lightcoral';
              this.arr[i+1][1] = 'lightcoral';
              if (this.arr[i][0] > this.arr[i+1][0]) {
                const temp = this.arr[i][0];

                this.arr[i][0] = this.arr[i+1][0];
                await sleep(10);
                this.$forceUpdate();

                this.arr[i+1][0] = temp;
                await sleep(10);
                this.$forceUpdate();
                swap = true;
              }
              this.arr[i][1] = 'lightblue';
              this.arr[i+1][1] = 'lightblue';
            }
            this.arr[n][1] = 'lightgreen';
            n--;
          } while (swap);
          // color the rest green
          for (let i=0; i <= n; i++) {
            this.arr[i][1] = 'lightgreen';
          }
          break;
      }
    },
    updateArr() {
      this.arr = [...Array(parseInt(this.arrSize))].map(() => [Math.ceil(Math.random() * 99), 'lightblue']);
    },
    getStripStyle(index) {
      const i = index - 1;
      const sWidth = 100 / parseInt(this.arrSize);
      return {
        width: sWidth * 0.6 + '%',
        marginLeft: sWidth * 0.2 + '%',
        marginRight: sWidth * 0.2 + '%',
        height: this.windowHeight * 0.6 * (this.arr[i][0] / 100) + 'px',
        backgroundColor: this.arr[i][1]
      }
    },
    onResize() {
      this.windowHeight = window.innerHeight;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  }
}

//--- helper functions
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
</script>

<style>
  #arrySizeSlider {
    margin-top: 7%;
    margin-left: 12%
  }

  .strip {
    display: inline-block;
    vertical-align: top;
  }
</style>
