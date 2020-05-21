<template>
  <div id="app">

    <!-- nav bar -->
    <nav class="navbar navbar-expand-lg navbar-light navbar-light" style="background-color: #e3f2fd;">
      <span class="navbar-brand mb-0 h1"><fa-icon icon="sort-amount-up-alt" /> Sorting Visualizer</span>

      <div class="collapse navbar-collapse" id="main-nav">
        <!-- nav bar items -->
        <ul class="navbar-nav mr-auto">
          <!-- select algo dropdown -->
          <li class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <fa-icon icon="random" /> Algorithms
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a href="#" class="dropdown-item" @click.prevent="algo = 'bubble'">Bubble Sort</a>
              <a href="#" class="dropdown-item" @click.prevent="algo = 'merge'">Merge Sort</a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item">Quick Sort</a>
            </div>
          </li>
          <!-- GtiHub page link -->
          <li class="nav-item">
            <a href="https://github.com/huaqiwen/sorting-visualizer" class="nav-link">
              <fa-icon icon="code-branch" /> GitHub
            </a>
          </li>
          <!-- array size slider -->
        </ul>
        <!-- nav bar text -->
        <span class="navbar-text">
          A sorting algorithm visualizer written in Vue.
        </span>
      </div>
    </nav>

<!--    <h1>1: {{ algo }}</h1>-->

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
      algo: ""
    }
  }
}
</script>

<style>

</style>
