import { http } from "../plugins/axios"

const state = () => ({
    token: '',
    id: '',
    email: '',
    nickname: '',
    avatar: ''
})

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_USER(state, user) {
        state.id = user._id
        state.email = user.email
        state.nickname = user.nickname
        state.avatar = user.avatar
    },
}

const actions = {
    detail: async ({state, commit}, data) => {
        console.log('detail')
        let ret = await http.get('/user/info')
        if(ret.code == 0) {
            commit('SET_USER', ret.data)
            return ret
        }
    }
}

export default {
    namespace: true,
    state,
    mutations,
    actions
}