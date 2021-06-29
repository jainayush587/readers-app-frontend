<template>
  <div class="home">
    <StoryPost v-if="!isLoggedIn" :post="welcomeScreen" />
    <div v-else class="blog-card-wrap">
      <div class="container">
        <h3>View recent Stories</h3>
        <div class="blog-cards">
          <StoryCard :post="post" v-for="post in Posts.slice(Math.max(Posts.length - 5, 0)).reverse()" :key="post.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Add home page story related photo
import StoryPost from '../components/StoryPost.vue';
import StoryCard from '../components/StoryCard.vue';

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  components: { StoryPost, StoryCard },
  data(){
    return{
      welcomeScreen:{
        title: "Welcome!",
        storyPost: "A story reading and writing website",
        welcomeScreen: true,
        photo: "coding",
      },
      sampleStoryPost: [
        {
          title: "This is a Story 1 Title!",
          storyHTML: "This is Filler line",
          storyCoverPhoto: "beautiful-stories",
        },
        {
          title: "This is a Story 2 Title!",
          storyHTML: "This is Filler 2 line",
          storyCoverPhoto: "designed-for-everyone",
        },
      ],
    };
  },
  created: function(){
    // a function to call getposts action
    this.GetPosts()
  },
  computed: {
    sampleStoryCards(){
      return this.$store.state.sampleStoryCards;
    },
    isLoggedIn : function(){ return this.$store.getters.isAuthenticated},
    ...mapGetters({Posts: "StatePosts", User: "StateUser"}),
  },
  methods:{
    ...mapActions(["GetPosts"]),
  }
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}
.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }
    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;
      @media (min-width: 800px) {
        margin-left: auto;
      }
    }
    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;
      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>