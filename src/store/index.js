import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleStoryCards: [
      { storyTitle: "Story card #1", storyCoverPhoto: "stock-1", storyAuthor: "John Joe", storyDate: "May 1, 2021" },
      { storyTitle: "Story card #2", storyCoverPhoto: "stock-2", storyAuthor: "John Joe", storyDate: "May 1, 2021" },
      { storyTitle: "Story card #3", storyCoverPhoto: "stock-3", storyAuthor: "John Joe", storyDate: "May 1, 2021" },
    ],
    storyHTML: "Write you story title here...",
    storyTitle: '',
    storyPhotoName: '',
    storyPhotoFileURL: null,
    storyPhotoPreview: null,
    editPost: null,
  },
  mutations: {
    newStoryPost(state, payload) {
      state.storyHTML = payload;
    },
    updateStoryTitle(state, payload) {
      state.storyTitle = payload;
    },
    fileNameChange(state, payload){
      state.storyPhotoName = payload;
    },
    createFileURL(state, payload){
      state.storyPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.storyPhotoPreview = !state.storyPhotoPreview;
    },
    toggleEditPost(state, payload){
      state.editPost = payload;
      console.log(state.editPost);
    },
  },
  actions: {
  },
  modules: {
    auth
  },
  plugins: [createPersistedState()]
})
