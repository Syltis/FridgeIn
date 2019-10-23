<template>
  <h1 id="title" class="display-3 font-weight-thin mb-3"> {{title}} </h1>
</template>

<script>
export default {
  name: "PageTitle",
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
#title {
  color: black;
  padding: 0% 0% 0% 0.4%;
}
</style>