<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <h2>{{ Posts[0].title }}</h2>
      <h4>Posted on: {{moment(Posts[0].created_at).format('DD-MM-YYYY')}}</h4>
      <!-- <img :src="this.currentstory[0].storyCoverPhoto" /> -->
      <div class="post-content ql-editor" v-html="Posts[-1].write_up"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'Viewstory',
    //props: ["storydetails"],
    created: function(){
    // a function to call getposts action
        this.GetPosts();
        console.log(this.Posts);
    },
    computed: {
        ...mapGetters({Posts: "StatePosts"}),
    },
    methods:{
        ...mapActions(["GetPosts"]),
    }
    // async mounted() {
    //     this.currentstory = await this.$store.state.storyPosts.filter(post => {
    //         return post.storyID === this.$route.params.storyid;
    //     })
    //}
}
</script>

<style lang="scss">
.post-view {
    h4 {
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 24px;
    }
}
</style>