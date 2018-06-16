<template>
  <div class="example-simple">
    <h1 id="example-title" class="example-title">Postit upload</h1>
    <div class="upload">
      <ul class="upload__list">
        <li v-for="(file) in files" :key="file.id">
          <span>{{file.name}}</span> -
          <span>{{file.size | formatSize}}</span> -
          <span v-if="file.error">{{file.error}}</span>
          <span v-else-if="file.success">success</span>
          <span v-else-if="file.active">active</span>
          <span v-else-if="file.active">active</span>
          <span v-else></span>
        </li>
      </ul>
      <div class="upload-field">
        <div>
          <file-upload
            class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-blue"
            post-action="http://localhost:4000/upload"
            extensions="gif,jpg,jpeg,png,webp"
            accept="image/png,image/gif,image/jpeg,image/webp"
            :multiple="false"
            :size="1024 * 1024 * 10"
            :data="{clientId: clientId}"
            v-model="files"
            @input-filter="inputFilter"
            @input-file="inputFile"
            ref="upload">
            <i class="fa fa-plus"></i>
            Select files
          </file-upload>
        </div>
        <a class="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-green" href="#0" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">Start Upload</a>

        <button type="button" class="btn btn-danger"  v-else @click.prevent="$refs.upload.active = false">
          <i class="fa fa-stop" aria-hidden="true"></i>
          Stop Upload
        </button>
      </div>
    </div>
    <div class="status" v-show="status !== ''">
      <p>Status: {{status}}</p>
    </div>
  </div>
</template>
<style>
.example-simple label.btn {
  margin-bottom: 0;
  margin-right: 1rem;
}
</style>

<script>
import FileUpload from 'vue-upload-component'
import { mapGetters } from 'vuex'

export default {
  components: {
    FileUpload,
  },
  data() {
    return {
      files: [],
      status: ''
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'clientId',
      'uploadState'
    ])
  },
  methods: {
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // 添加文件前
        // Filter system files or hide files
        // 过滤系统文件 和隐藏文件
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        // Filter php html js file
        // 过滤 php html js 文件
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
      }
    },
    inputFile(newFile, oldFile) {
      if (newFile && !oldFile) {
        // add
        console.log('add', newFile)
      }
      if (newFile && oldFile) {
        // update
        console.log('update', newFile)
      }
      if (!newFile && oldFile) {
        // remove
        console.log('remove', oldFile)
      }
    }
  },
  watch: {
    uploadState() {
      // should go in action, but see bug in socketio vuex
      const status = this.uploadState.status
      if (status === 'done') {
        this.$router.replace({ path: 'postit' })
      } else if (status === 'imageread') {
        this.status = 'File uploaded'
      } else if (status === 'histdone') {
        this.status = 'Histogram calculated'
      } else if (status === 'text') {
        this.status = 'Detecting text'
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .upload {
    &__list {
      margin-bottom: 1rem;
    }
  }
</style>
