<template>
    <section>
        Filter
    </section>

    <section>
        <base-card>
            <div class="controls">
                <base-button mode="outline">Refresh</base-button>
                <base-button link to='/register'>Register as coach</base-button>
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
import CoachItem from '../../components/coaches/CoachItem.vue'

export default {
    components: {CoachItem},
    computed: {

        filteredCoaches() {
            return this.$store.getters['coaches/coaches']
        },
        hasCoaches() {
            return this.$store.getters['coaches/hasCoaches']
        }
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