<template>
  <div id="app">

    <!-- nav bar -->
    <nav class="navbar navbar-expand-lg navbar-light navbar-light" style="background-color: #e3f2fd;">
      <span class="navbar-brand mb-0 h1">Sorting Visualizer</span>

      <div class="collapse navbar-collapse" id="main-nav">
        <ul class="navbar-nav mr-auto">
          <!-- select algo dropdown -->
          <li class="nav-item dropdown">
            <a href="#" class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Algorithms</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a href="#" class="dropdown-item" @click.prevent="algo = 'bubble'">Bubble Sort</a>
              <a href="#" class="dropdown-item" @click.prevent="console.log(this.$data.algo)">Merge Sort</a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item">Quick Sort</a>
            </div>
          </li>
          <!-- array size slider -->
        </ul>
      </div>
    </nav>

  </div>
</template>

<script>
// for bootstrap
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

export default {
  name: 'app',
}
</script>

<style>

</style>
