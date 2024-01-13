import { createStore } from "vuex";
import coachesModule from './modules/coach/index.js'

export default createStore({
    modules: {
        coaches: coachesModule
    },
    state() {
        return {
          userId: 'c3'
        };
      },
      getters: {
        userId(state) {
          return state.userId;
        }
    }
})