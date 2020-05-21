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
            <a href="#" class="nav-link" @click.prevent="">
              <fa-icon :icon="['fas', 'align-right']" /> Generate new array of size ({{ arrSize }}):
            </a>
          </li>
          <!-- array size slider -->
          <li>
            <input type="range" class="custom-range" id="arrySizeSlider" min="40" max="120" step="1" v-model="arrSize" @change="updateArr">
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
      <div class="strip" style="height: 180px"></div>
      <div class="strip" style="height: 120px"></div>
      <div class="strip" style="height: 130px"></div>
      <div class="strip" style="height: 100px"></div>
      <div class="strip" style="height: 60px"></div>
      <div class="strip" style="height: 80px"></div>
      <div class="strip" style="height: 180px"></div>
      <div class="strip" style="height: 200px"></div>
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
      arrSize: 80,
      windowHeight: window.innerHeight,
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
    didSortPress: function () {
      switch (this.algo) {
        case "":
          alert("Please choose an algorithm first.");
          break;
      }
    },
    updateArr: function () {

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
    background-color: aqua;
    width: 0.5%;
    vertical-align: top;
  }
</style>
