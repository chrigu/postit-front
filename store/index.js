import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      uploadState: {},
      postits: [],
      mainImage: {
        url: '',
        width: 0,
        height: 0
      },
      detailImage: {
        url: ''
      }
    },
    getters: {
      uploadState: state => state.uploadState,
      postits: state => state.postits,
      mainImage: state => state.mainImage,
      detailImage: state => state.detailImage
    },
    mutations: {
      setUploadState: (state, uploadState) => {
        // bug in lib, so do it here and not in action...
        // https://github.com/MetinSeylan/Vue-Socket.io/issues/117
        state.uploadState = uploadState[0]
        console.log(uploadState)
        if (uploadState[0].status && uploadState[0].status === 'done') {
          state.postits = uploadState[0].postits
          // should route in action
        } else if (uploadState[0].status && uploadState[0].status === 'imageread') {
          state.mainImage = uploadState[0].mainImage
        }
      },
      setMainImage: (state, mainImage) => {
        console.log(mainImage)
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
      // socket_uploadState: (state, uploadState) => {
      //   console.log('action', uploadState)
      // },
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
