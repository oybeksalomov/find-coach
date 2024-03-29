export default {
    async addCoach(context, data) {
        const userId = context.rootGetters.userId
        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        }

        const token = context.rootGetters.token
        const response = await fetch(
            `https://vue-find-coach-4368c-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` + token, 
            {
                method: 'PUT',
                body: JSON.stringify(coachData)
            }
        )
        // const responseData = await response.json()

        if(!response.ok) {
            //xatolik
        }
        context.commit('addCoach', {
            ...coachData,
            id: userId
        })
    },
    async loadCoaches(context) {
        const response = await fetch(
            `https://vue-find-coach-4368c-default-rtdb.firebaseio.com/coaches.json`
        )
        const responseData = await response.json()

        if(!response.ok) {
            const error = new Error(responseData.message || "Ma'lumotlarni yuklashda xatolik yuz berdi.")
            throw error
        }

        const coaches = []

        for(const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            }
            coaches.push(coach)
        }
        context.commit('setCoaches', coaches)
    }
}