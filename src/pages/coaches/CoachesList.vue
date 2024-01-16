<template>
    <section>
        <coach-filter @change-filter="setFilter"></coach-filter>
    </section>

    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
                <base-button link to='/register' v-if="!isCoach">Register as coach</base-button>
            </div>
            <ul v-if="hasCoaches">
                <CoachItem  
                    v-for="coach of filteredCoaches" 
                    :key="coach.id"
                    :id="coach.id"
                    :firstName="coach.firstName"
                    :lastName="coach.lastName"
                    :rate="coach.hourlyRate"
                    :areas="coach.areas"
                ></CoachItem>
            </ul>
            <div v-else>Murabbiy yo'q</div>
        </base-card>
    </section>
</template>

<script>
import CoachFilter from '../../components/coaches/CoachFilter.vue'
import CoachItem from '../../components/coaches/CoachItem.vue'

export default {
    components: {CoachItem, CoachFilter},
    data() {
        return {
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    computed: {
        isCoach() {
            return this.$store.getters['coaches/isCoach']
        },
        filteredCoaches() {
            const coaches = this.$store.getters['coaches/coaches']
            return coaches.filter(coach => {
                if(this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if(this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true
                }
                if(this.activeFilters.career && coach.areas.includes('career')) {
                    return true
                }
                return false;
            })
        },
        hasCoaches() {
            return this.$store.getters['coaches/hasCoaches']
        }
    },
    methods: {
        setFilter(updateFilters) {
            this.activeFilters = updateFilters
        },
        loadCoaches() {
            this.$store.dispatch('coaches/loadCoaches')
        }
    },
    created() {
        this.loadCoaches()
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>