<template>
  <div>
    <div id="top-div">
      <v-col md="12" cols="12">
        <PageTitle title="Your Recipes" />
      </v-col>
    </div>
    <v-card id="content-card">
      <v-row>
        <v-col md="11" cols="12">
          <h2 id="subtitle" class="subheader font-weight-regular mb-3">Recipes ready</h2>
        </v-col>
        <v-col md="1" cols="12">
          <v-btn id="add-recipe-btn" @click.stop="showModal=true">Add Recipe</v-btn>
          <AddRecipeModal v-model="showModal" />
        </v-col>
        <v-col md="12" cols="12">
          <v-divider />
        </v-col>
        <v-col md="12" cols="12">
          <v-row justify="start">
            <v-col v-for="n in 3" :key="n" class="recipe-flex">
              <v-card class="recipe-card">
                <v-card-text>
                  <div>Recipe Type</div>
                  <p class="headline font-weight-light text--primary">Recipe Name</p>
                  <v-divider class="card-divider" />
                  <p>Vegan / Meat / Fish</p>
                  <div class="text--primary">
                    <p class="recipe-description">Easy to make, great for a monday evening</p>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col md="12" cols="12">
          <h2 id="subtitle" class="subheader font-weight-regular mb-3">Saved Recipes</h2>
        </v-col>
        <v-col md="12" cols="12">
          <v-divider />
        </v-col>
        <v-col md="12" cols="12">
          <v-row>
            <v-col v-for="i in 12" :key="i" class="recipe-flex">
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
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import AddRecipeModal from "../components/recipes/AddRecipeModal";

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