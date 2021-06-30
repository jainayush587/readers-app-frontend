<template>
  <div class="create-post">
  <StoryCoverPreview v-show="this.$store.state.storyPhotoPreview" :story="story" />
    <!-- <Loading v-show="loading" /> -->
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error: </span>{{ this.errorMsg }}</p>
      </div>
      <div class="story-info">
        <input type="text" placeholder="Enter Story Title" v-model="story.title" />
        <div class="upload-file">
          <label for="story-photo">Upload Cover Photo</label>
          <input
            @change="fileChange"
            type="file"
            ref="storyPhoto"
            id="story-photo"
            accept=".png, .jpg, .jpeg"
          />
          <button
            @click="openPreview"
            :class="{ 'button-inactive': !this.$store.state.storyPhotoFileURL }"
            class="preview"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ this.$store.state.storyPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor
          :editorOptions="editorSettings"
          v-model="story.write_up"
          useCustomImageHandler
        />
      </div>
      <div class="story-actions">
        <button @click="submit">Publish Story</button>
        <router-link :to="{name: 'StoryPreview'}" class="router-button">Story Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import StoryCoverPreview from '../components/StoryCoverPreview';
import { mapGetters, mapActions } from "vuex";
import Quill from 'quill';
window.Quill = Quill;
const ImageResize = require('quill-image-resize-module').default;
Quill.register('modules/imageResize', ImageResize);

export default {
    name: 'Write',
    components: {
      StoryCoverPreview,
    },
    data(){
      return {
        story: {
          title: '',
          write_up: '',
        },
        file: null,
        error: null,
        errorMsg: null,
        loading: null,
        editorSettings: {
          modules: {
            imageResize: {},
          },
        },
      };
    },
    created: function () {
      // a function to call getposts action
      this.GetPosts()
    },
    methods:{
      ...mapActions(["CreatePost", "GetPosts"]),
      fileChange(){
        this.file = this.$refs.storyPhoto.files[0];
        const fileName = this.file.name;
        this.$store.commit("fileNameChange", fileName);
        this.$store.commit("createFileURL", URL.createObjectURL(this.file));
      },
      openPreview(){
        this.$store.commit("openPhotoPreview");
      },
      async submit() {
        try {
          await this.CreatePost(this.story);
        } catch (error) {
          this.errorMsg = "Sorry you cannot publish the story now";
        }
      },  
    },
    computed: {
      ...mapGetters({ User: "StateUser" }),
      storyCoverPhotoName(){
        return this.$store.state.storyPhotoName;
      },
      storyTitle: {
        get() {
          return this.$store.state.storyTitle;
        },
        set(payload) {
          this.$store.commit('updateStoryTitle', payload);
        },
      },
      storyHTML: {
        get() {
          return this.$store.state.storyHTML;
        },
        set(payload) {
          this.$store.commit('newStoryPost', payload);
        },
      },
    },
    beforeDestroy() {
      this.$store.commit("fileNameChange", null);
    }
}
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;
  button {
    margin-top: 0;
  }
  .router-button {
    text-decoration: none;
    color: #fff;
  }
  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }
  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }
  // error styling
  .invisible {
    opacity: 0 !important;
  }
  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .story-info {
    display: flex;
    margin-bottom: 32px;
    input:nth-child(1) {
      min-width: 300px;
    }
    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;
      input {
        display: none;
      }
      .preview {
        margin-left: 16px;
        text-transform: initial;
      }
      .button-inactive {
        background-color: #888888;
      }
      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }
  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }
    .ql-editor {
      padding: 20px 16px 30px;
    }
  }
  .story-actions {
    margin-top: 32px;
    button {
      margin-right: 16px;
    }
  }
}
</style>