<template>
  <div class="example-simple">
    <h1 id="example-title" class="example-title">Projects</h1>
    <section class="form">
      <div class="field">
        <label class="label">Project name</label>
        <div class="control">
          <input v-model="form.name" v-validate="'required|min:3'" class="input" type="text" placeholder="Name" name="name">
          <p class="help is-danger" v-show="errors.has('name')">
            {{ errors.first('name') }}
          </p>
        </div>
      </div>
    </section>
      <button type="button" class="btn btn-danger" @click="createProject()" :disabled="errors.any() && !isComplete">
          <i class="fa fa-stop" aria-hidden="true"></i>
          Add Project
        </button>
  </div>
</template>
<style>
.example-simple label.btn {
  margin-bottom: 0;
  margin-right: 1rem;
}
</style>

<script>

import createProject from '@/apollo/graphql/createProject'

export default {
  components: {},
  $_veeValidate: {
    validator: 'new' // give me my own validator scope.
  },
  data() {
    return {
      form: {
        name: ''
      }
    }
  },
  methods: {
    createProject() {
      this.$apollo.mutate({
        mutation: createProject,
        variables: {
          name: this.form.name
         },
        update: (store, {data}) => {
          console.log(data)
          // Todo: add data to cache
          // add to cache
          // const data = store.readQuery({ query: uploadsQuery })
          // data.singleUpload.push(singleUpload)
          // store.writeQuery({ query: uploadsQuery, data })
        }
      })
      .then(({data}) => {
        this.$router.push(`/projects/${data.createProject.id}`);
      })
    }
  },
  computed: {
  isComplete () {
    return this.name;
  }
}
}
</script>
<style scoped lang="scss">

</style>
