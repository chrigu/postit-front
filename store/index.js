import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      clientId: '',
      connected: false,
      uploadState: '',
      postits: [],
      mainImage: {
        url: '',
        x: 0,
        y: 0
      },
      detailImage: {
        url: ''
      }
    },
    getters: {
      clientId: state => state.clientId,
      uploadState: state => state.uploadState,
      postits: state => state.postits,
      mainImage: state => state.mainImage,
      detailImage: state => state.detailImage
    },
    mutations: {
      SOCKET_CONNECT: (state,  status ) => {
        state.connected = true;
      },
      SOCKET_CLIENT_ID: (state,  id) => {
        state.clientId = id[0]
      },
      SOCKET_UPLOAD_STATE: (state, uploadState) => {
        state.uploadState = uploadState[0]
      },
      setPostits: (state, postits) => {
        state.postits = postits
      },
      setMainImage: (state, mainImage) => {
        state.mainImage = mainImage
      },
      setDetailImage: (state, detailImage) => {
        state.detailImage = detailImage
      }
    },
    actions: {
      socket_upload_state: (state, uploadState) => {
        console.log('action', uploadState)
      },
      setPostits: ({commit}, postits) => {
        commit('setPostits', postits)
      },
      setMainImage: ({commit}, mainImage) => {
        commit('setMainImage', mainImage)
      },
      setDetailImage: ({commit}, detailImage) => {
        commit('setDetailImage', detailImage)
      }
    }
  })
}

export default createStore
