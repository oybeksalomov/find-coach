<template>
    <div>
        <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
        <p>{{ error }}</p>
        </base-dialog>

        <section>
            <coach-filter @change-filter="setFilter"></coach-filter>
        </section>

        <section>
            <base-card>
                <div class="controls">
                    <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
                    <base-button link to='/register' v-if="!isCoach && !isLoading">Register as coach</base-button>
                </div>
                <div v-if="isLoading">
                    <base-spinner></base-spinner>
                </div>
                <ul v-else-if="hasCoaches">
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
    </div>
</template>

<script>
import CoachFilter from '../../components/coaches/CoachFilter.vue'
import CoachItem from '../../components/coaches/CoachItem.vue'

export default {
    components: {CoachItem, CoachFilter},
    data() {
        return {
            isLoading: false,
            error: null,
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            },
            
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
            return !this.isLoading && this.$store.getters['coaches/hasCoaches']
        }
    },
    methods: {
        setFilter(updateFilters) {
            this.activeFilters = updateFilters
        },
        async loadCoaches() {
            this.isLoading = true
            try {
                await this.$store.dispatch('coaches/loadCoaches')
            } catch(error) {
                this.error = error.message || 'Something wrong!'
            }
            this.isLoading = false
        },
        handleError() {
            this.error = null;
        },
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