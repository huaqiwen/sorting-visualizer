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
              <a href="#" class="dropdown-item" @click.prevent="algo = 'bubble'">Bubble Sort</a>
              <a href="#" class="dropdown-item" @click.prevent="algo = 'merge'">Merge Sort</a>
              <a href="#" class="dropdown-item" @click.prevent="algo = 'insertion'">Insertion Sort</a>
              <a href="#" class="dropdown-item" @click.prevent="algo = 'selection'">Selection Sort</a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item" @click.prevent="algo = 'quick'">Quick Sort</a>
            </div>
          </li>
          <li>
            <a href="#" class="nav-link" @click.prevent="didSortPress">
              <fa-icon :icon="['fas', 'filter']" /> Sort!
            </a>
          </li>
          <li>
            <a href="#" class="nav-link" @click.prevent="didNewArrPress">
              <fa-icon :icon="['fas', 'align-right']" /> Generate new array of size ({{ arrSize }}):
            </a>
          </li>
          <!-- array size slider -->
          <li>
            <input type="range" class="custom-range" id="arrySizeSlider" min="40" max="200" step="1" v-model="arrSize" @change="updateArr">
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
      // the backdoor will change upon 'generate new arr' button is pressed, causing the computed prop 'arr' to re-compute
      updateArrBackdoor: 0
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
    },
    arr: function () {
      // noinspection JSUnusedLocalSymbols
      const _ = this.updateArrBackdoor;
      return [...Array(parseInt(this.arrSize))].map(() => [Math.ceil(Math.random() * 99), 'lightblue']);
    },
  },
  methods: {
    didSortPress: function () {
      switch (this.algo) {
        case "":
          alert("Please choose an algorithm first.");
          break;
        case "bubble":
          this.arr[0][1] = 'red';
          break;
      }
    },
    didNewArrPress: function () {
      this.updateArrBackdoor++;
    },
    updateArr: function () {
      this.arr = [...Array(parseInt(this.arrSize))].map(() => [Math.ceil(Math.random() * 99), 'lightblue'])
    },
    getStripStyle: function(index) {
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
    onResize: function () {
      this.windowHeight = window.innerHeight;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  }
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
