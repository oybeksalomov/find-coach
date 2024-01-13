<template>
    <section>
        Filter
    </section>

    <section>
        <div class="controls">
            <button>Refresh</button>
            <router-link to='/register'>Register as coach</router-link>
        </div>
        <ul v-if="hasCoaches">
            Murabbiylar ro'yhati
            <!-- <li v-for="coache of filteredCoaches" :key="coache.id">{{ coache.firstName }}</li> -->
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