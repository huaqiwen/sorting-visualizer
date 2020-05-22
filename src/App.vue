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
              <a href="#" class="dropdown-item" @click="algo = 'insertion'">Insertion Sort</a>
              <a href="#" class="dropdown-item" @click="algo = 'selection'">Selection Sort</a>
              <div class="dropdown-divider"></div>
              <a href="#" class="dropdown-item" @click="algo = 'merge'">Merge Sort</a>
              <a href="#" class="dropdown-item" @click="algo = 'quick'">Quick Sort</a>
            </div>
          </li>
          <li>
            <a href="#" :class="sortBtnStateClass" @click="didSortPress">
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
      sleepDuration: 20,
      windowHeight: window.innerHeight,
      arr: [...Array(120)].map(() => [Math.ceil(Math.random() * 99), 'lightblue']),
      isInSortingProcess: false,
      sorted: false
    }
  },
  watch: {
    arrSize: function (val) {
      this.arr = [...Array(parseInt(val))].map(() => [Math.ceil(Math.random() * 99), 'lightblue']);
      this.isInSortingProcess = false;
      this.sorted = false;
    }
  },
  computed: {
    algoText: function () {
      switch (this.algo) {
        case "":
          return "Select an Algorithm";
        case "bubble":
          return "Bubble Sort";
        case "selection":
          return "Selection Sort";
        case "insertion":
          return "Insertion Sort";
        case "merge":
          return "Merge Sort";
        case "quick":
          return "Quick Sort";
      }
    },
    sortBtnStateClass: function () {
      return (this.isInSortingProcess) ? 'nav-link disabled' : 'nav-link';
    }
  },
  methods: {
    async didSortPress() {
      // already sorted
      if (this.sorted) {
        alert("The array is already sorted!");
        return;
      }

      let n;

      switch (this.algo) {
        case "":
          alert("Please choose an algorithm first.");
          break;

        case "bubble":
          // get in sorting process
          this.isInSortingProcess = true;

          let swap;
          n = this.arr.length - 1;

          do {
            swap = false;
            for (let i=0; i < n; i++) {
              // if not in sorting process, terminate
              if (!this.isInSortingProcess) { return; }

              this.arr[i][1] = 'lightcoral';
              this.arr[i+1][1] = 'lightcoral';
              if (this.arr[i][0] > this.arr[i+1][0]) {
                const temp = this.arr[i][0];

                this.arr[i][0] = this.arr[i+1][0];
                await sleep(this.sleepDuration);
                this.$forceUpdate();

                this.arr[i+1][0] = temp;
                await sleep(this.sleepDuration);
                this.$forceUpdate();
                swap = true;
              }
              this.arr[i][1] = 'lightblue';
              this.arr[i+1][1] = 'lightblue';
            }
            this.arr[n][1] = 'lightgreen';
            n--;
          } while (swap);

          // color the rest green, end sorting process
          for (let i=0; i <= n; i++) {
            this.arr[i][1] = 'lightgreen';
          }
          this.isInSortingProcess = false;
          this.sorted = true;
          break;

        case "insertion":
          // get in sorting process
          this.isInSortingProcess = true;

          for (let i=1; i < this.arr.length; i++) {
            let j = i - 1;
            this.arr[i][1] = 'lightcoral';

            let temp = this.arr[i][0];
            while (j >= 0 && this.arr[j][0] > temp) {
              // if not in sorting process, terminate and re-color
              if (!this.isInSortingProcess) {
                for (let i=0; i < this.arr.length; i++) {
                  this.arr[i][1] = 'lightblue';
                }
                return;
              }

              this.arr[j][1] = 'gold';
              this.arr[j+1][0] = this.arr[j][0];
              await sleep(this.sleepDuration);
              this.$forceUpdate();
              this.arr[j][1] = 'lightgreen';
              j--;
            }
            this.arr[j+1][0] = temp;

            // show strip in position
            this.arr[i][1] = 'lightgreen';
            for (let i=0; i <= j+1; i++) {
              this.arr[i][1] = 'lightgreen';
            }
          }
          // color last strip green, end sorting process
          this.arr[this.arr.length - 1][1] = 'lightgreen';
          this.isInSortingProcess = false;
          this.sorted = true;
          break;

        case "selection":
          // get in sorting process
          this.isInSortingProcess = true;

          const len = this.arr.length;
          for (let i=0; i < len; i++) {
            let min = i;
            this.arr[min][1] = 'gold';

            for (let j=i+1; j < len; j++) {
              // if not in sorting process, terminate and re-color
              if (!this.isInSortingProcess) {
                this.colorArr('lightblue');
                return;
              }

              this.arr[j][1] = 'lightcoral';
              await sleep(this.sleepDuration);

              if (this.arr[min][0] > this.arr[j][0]) {
                this.arr[min][1] = 'lightblue';
                min = j;
                this.arr[min][1] = 'gold';
                this.$forceUpdate();
              } else {
                this.arr[j][1] = 'lightblue';
                this.$forceUpdate();
              }
            }
            if (min !== i) {
              const temp = this.arr[i][0];
              this.arr[i][0] = this.arr[min][0];
              this.arr[min][0] = temp;
              this.arr[min][1] = 'lightblue';
              this.$forceUpdate();
            }
            this.arr[i][1] = 'lightgreen';
          }

          // finish the sorting process
          this.isInSortingProcess = false;
          this.sorted = true;
          break;

        case "merge":
          // get in sorting process
          this.isInSortingProcess = true;

          const merge = async (a, b, start, mid, end) => {
            let i = start,
              j = mid;
            for (let k=start; k < end; k++) {
              // if not in sorting process, terminate and re-color
              if (!this.isInSortingProcess) {
                this.colorArr('lightblue');
                return;
              }
              a[i][1] = 'lightcoral';
              if (j < a.length) { a[j][1] = 'lightcoral'; }
              this.$forceUpdate();
              await sleep(10);
              a[i][1] = 'lightblue';
              if (j < a.length) { a[j][1] = 'lightblue'; }
              this.$forceUpdate();

              if (i < mid && (j >= end || a[i][0] <= a[j][0])) {
                b[k] = a[i];
                i++;
              } else {
                b[k] = a[j];
                j++;
              }
            }
          }

          n = this.arr.length;
          let brr = this.arr.slice();
          let width = 1;

          while (width < n) {
            let start = 0;
            while (start < n) {
              const mid = Math.min(n, start + width);
              const end = Math.min(n, start + (2 * width));
              await merge(this.arr, brr, start, mid, end);
              start += 2 * width;
            }
            for (let i=0; i < this.arr.length; i++) {
              // if not in sorting process, terminate and re-color
              if (!this.isInSortingProcess) {
                this.colorArr('lightblue');
                return;
              }
              this.arr[i][1] = 'blueviolet';
              this.$forceUpdate();
              await sleep(this.sleepDuration);
              this.arr[i][1] = 'lightblue';
              this.$forceUpdate();

              this.arr[i] = brr[i];
            }
            width *= 2;
          }

          // finish the sorting process
          this.isInSortingProcess = false;
          this.colorArr('lightgreen');
          break;
      }
    },
    updateArr() {
      this.arr = [...Array(parseInt(this.arrSize))].map(() => [Math.ceil(Math.random() * 99), 'lightblue']);
      this.isInSortingProcess = false;
      this.sorted = false;
    },
    colorArr(color) {
      for (let i=0; i < this.arr.length; i++) {
        this.arr[i][1] = color;
      }
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
