<template>
  <div>
    <div id="top-div">
      <v-flex md12 xs12>
        <h1 id="title" class="display-1 font-weight-thin mb-3">Your recipes</h1>
      </v-flex>
    </div>
    <v-card id="content-card">
      <v-layout row wrap>
        <v-flex md11 xs12>
          <h2 id="subtitle" class="subheader font-weight-regular mb-3">Recipes ready</h2>
        </v-flex>

        <v-flex md1 xs12>
          <v-btn id="add-recipe-btn" @click.stop="showModal=true">Add Recipe</v-btn>
            <AddRecipeModal v-model="showModal" />
        </v-flex>

        <v-flex md12 xs12>
          <v-divider></v-divider>
        </v-flex>
        <v-flex md12 xs12>
          <v-layout justify-start>
            <v-flex v-for="n in 3" :key="n" class="recipe-flex">
              <v-card class="recipe-card">
                <v-card-text>
                  <div>Recipe Type</div>
                  <p class="headline font-weight-light text--primary">Recipe Name</p>
                  <v-divider class="card-divider"></v-divider>
                  <p>Vegan / Meat / Fish</p>
                  <div class="text--primary">
                    <p class="recipe-description">Easy to make, great for a monday evening</p>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex md12 xs12>
          <h2 id="subtitle" class="subheader font-weight-regular mb-3">Saved Recipes</h2>
        </v-flex>
        <v-flex md12 xs12>
          <v-divider></v-divider>
        </v-flex>
        <v-flex md12 xs12>
          <v-layout row wrap>
            <v-flex v-for="i in 12" :key="i" class="recipe-flex">
              <v-card class="recipe-card">
                <v-card-text>
                  <div>Recipe Type</div>
                  <p class="headline font-weight-light text--primary">Recipe Name</p>
                  <p>Vegan / Meat / Fish</p>
                  <div class="text--primary">
                    <p class="recipe-description">Easy to make, great for a monday evening</p>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
import AddRecipeModal from "../components/ui/AddRecipeModal";

export default {
  name: "RecipePage",
  components: { AddRecipeModal },
  data() {
    return {
      showModal: false
    };
  }
};
</script>

<style scoped>
#title {
  color: black;
  padding: 0% 0% 0% 0.4%;
}

#top-div {
  margin: 0% 0% 1% 0%;
}

#content-card {
  padding: 1%;
}

#add-recipe-btn {
  margin: 0% 0% 2% 0%;
  color: white;
  background-color: #80ff80;
}

.recipe-flex {
  padding: 1%;
}

.recipe-card {
  padding: 0.2%;
  margin: 1% 0% 1% 1%;
  width: 220px;
  background-color: #f5fffa;
}

.recipe-description {
  color: #b3b3b3;
}

.card-divider {
  margin: -2% 0% 5% 0%;
}
</style>