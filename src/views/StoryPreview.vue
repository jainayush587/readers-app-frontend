<template>
  <div class="post-view">
      <div class="container quillWrapper">
          <h2>{{story.title}}</h2>
          <img :src="storyCoverPhoto" alt="" />
          <div class="post-content ql-editor" v-html="story.write_up">

          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "StoryPreview",
    props: ["story"],
    computed:{
        storyTitle(){
            return this.$store.state.storyTitle;
        },
        storyHTML(){
            return this.$store.state.storyHTML;
        },
        storyCoverPhoto(){
            return this.$store.state.storyPhotoFileURL;
        },
    },
};
</script>

<style lang="scss">
.post-view {
  min-height: 100%;
  .container {
    max-width: 1000px;
    padding: 60px 25px;
    .ql-editor {
      padding: 0;
    }
    h2 {
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }
    img {
      width: 100%;
      margin-bottom: 32px;
    }
  }
}
</style>