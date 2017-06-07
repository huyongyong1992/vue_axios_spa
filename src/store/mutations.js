import {
  SAVE_STEP
} from './mutation-types.js'


export default {
  [SAVE_STEP](state) {
  	state.steps += 1;
  	
  	console.log(state.steps)
  }
}
