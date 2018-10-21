<template>
  <div class="example-simple">
    <h1 id="example-title" class="example-title">Projects</h1>
    <section class="form">
      <div class="field">
        <label class="label">Project name</label>
        <div class="control">
          <input v-model="form.name" v-validate="'required|min:3'" class="input" type="text" placeholder="Name">
          <p class="help is-danger" v-show="errors.has('name')">
            {{ errors.first('name') }}
          </p>
        </div>
      </div>
    </section>
      <button type="button" class="btn btn-danger">
          <i class="fa fa-stop" aria-hidden="true"></i>
          New Project
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


export default {
  components: {},
  data() {
    return {
      form: {
        name: ''
      }
    }
  },

}
</script>
<style scoped lang="scss">

</style>
