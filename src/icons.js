import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { faRandom, faFilter, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

library.add(faRandom, faFilter, faAlignRight, faGithub);

Vue.component('fa-icon', FontAwesomeIcon)
