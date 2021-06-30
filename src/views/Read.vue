<template>
  <div class="story-card-wrap">
    <div class="story-cards container">
      <div class="toggle-edit">
        <span>Toggle Editing Post</span>
        <input type="checkbox" v-model="editPost" />
      </div>
      <StoryCard
        v-for="post in Posts.slice(Math.max(Posts.length - 5, 0)).reverse()"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from "vuex";
import StoryCard from '../components/StoryCard';

export default {
    name: "Read",
    components:{
      StoryCard,
    },
    created: function () {
        // a function to call getposts action
        this.GetPosts()
    },
    computed: {
      ...mapGetters({Posts: "StatePosts", User: "StateUser"}),
      sampleStoryCards(){
        return this.$store.state.sampleStoryCards;
      },
      editPost: {
        get() {
            return this.$store.state.editPost;
        },
        set(payload) {
            this.$store.commit("toggleEditPost", payload);
        }
      }
    },
    methods: {
      ...mapActions(["GetPosts"]),  
    },
    beforeDestroy() {
      this.$store.commit("toggleEditPost", false);
  }

}
</script>

<style lang="scss" scoped>
.story-cards {
  position: relative;
  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;
    span {
      margin-right: 16px;
    }
  }
  input[type='checkbox'] {
    position: relative;
    border: none;
    -webkit-appearance: none;
    background: #fff;
    outline: none;
    width: 80px;
    height: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  input[type='checkbox']:before {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    top: 0;
    left: 0;
    background: #303030;
    transform: scale(1.1);
    transition: 0.75s ease all;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  input:checked[type='checkbox']:before {
    background: #fff;
    left: 52px;
  }
}
</style>