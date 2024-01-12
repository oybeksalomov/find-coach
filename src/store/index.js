import { createStore } from "vuex";
import coachesModule from './modules/coach/index.js'

export default createStore({
    modules: {
        coaches: coachesModule
    }
})