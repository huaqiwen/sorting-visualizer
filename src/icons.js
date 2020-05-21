import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSortAmountUpAlt, faCodeBranch, faRandom } from '@fortawesome/free-solid-svg-icons';

library.add(faSortAmountUpAlt, faCodeBranch, faRandom);

Vue.component('fa-icon', FontAwesomeIcon)
