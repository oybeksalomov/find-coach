<template>
    <section>
        <base-card>
            <h2>Murabbiy sifatida ro'yhatdan o'ting</h2>
            <coach-form @save-data="createCoach"></coach-form>
        </base-card>
    </section>
</template>

<script>
import BaseCard from '../../components/ui/BaseCard.vue'
import CoachForm from '../../components/coaches/CoachForm.vue'
export default {
    components: { BaseCard, CoachForm },
    methods: {
        createCoach(formData) {
            this.$store.dispatch('coaches/addCoach', formData)
            this.$router.replace('/coaches')
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>