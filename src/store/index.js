import { createStore } from "vuex";
import coachesModule from './modules/coach/index.js'
import requestsModule from './modules/requests/index.js'

export default createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule
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