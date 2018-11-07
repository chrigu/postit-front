<template>
  <div class="example-simple">
    <h1 id="example-title" class="example-title">Postit upload for {{getProject.name}}</h1>
    <div class="upload">
      <div class="upload-field">
        <input type="file" required @change="fileChanged" />
      </div>
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
import { mapGetters } from 'vuex'
import GET_PROEJCT_QUERY from '@/apollo/graphql/getProject'
import uploadsQuery from '@/apollo/graphql/uploads'
import uploadsMutation from '@/apollo/graphql/uploadsMutation'
import IMAGE_SUBSCRIPTION from '@/apollo/graphql/imageSubscription'

export default {
  components: { },
   apollo: {
      getProject() {
        return {
          query: GET_PROEJCT_QUERY,
          variables: {
            id: this.$route.params.id
          }
        }
      }
    },
  data() {
    return {
      getProject: {
        name: ''
      }
    }
  },

  methods: {
    fileChanged({
      target: {
        validity,
        files: [file]
      }
    }) {
      this.$apollo.mutate({
        mutation: uploadsMutation,
        variables: { file, projectId: this.$route.params.id },
        update: (store, {data: {singleUpload}}) => {
          console.log(singleUpload)
          // const data = store.readQuery({ query: uploadsQuery })
          // data.singleUpload.push(singleUpload)
          // store.writeQuery({ query: uploadsQuery, data })
        }
      }).then(({ data }) => {
        console.log('Done uploading.', data);
        this.subscribeToImageUpdates(data.singleUpload.id)
      });
    },
    subscribeToImageUpdates(imageId) {
      const observer = this.$apollo.subscribe({
        query: IMAGE_SUBSCRIPTION,
        variables: { id: imageId },
        update: (store, {data: {singleUpload}}) => {
          console.log(singleUpload)
          // const data = store.readQuery({ query: uploadsQuery })
          // data.singleUpload.push(singleUpload)
          // store.writeQuery({ query: uploadsQuery, data })
        }
      })
      observer.subscribe({
        next(data) {
          console.log(data)
        },
        error(error) {
          console.error(error)
        },
      })
    }
  },
  mounted: function() {
    console.log( this.$route.params.id)
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
