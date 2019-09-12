<template>
  <div>
    <main>
      <section>
        <v-parallax dark :src="header1" class="parallax" style="margin-top: -1%">
          <v-layout column >
            <v-card id="titleCard">
              <v-card-text class="text-xs-center">
                <h1 class="display-3 font-weight-thin mb-3">FridgeIn</h1>
                <hr />
                <h4 class="display-1 font-weight-thin">
                  Giving you the tools you need to optimize your kitchen
                  stores.
                </h4>
                <v-btn color="#82b9dd" class="white--text" large round>Sign Up</v-btn>
              </v-card-text>
            </v-card>
          </v-layout>
        </v-parallax>
        <div class="content">
          <v-layout row wrap class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-2">
                <v-card-title primary-title>
                  <div class="headline text-xs-center" style="width: 100%">Tracking your stores</div>
                </v-card-title>
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc
                  nec volutpat.
                  Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut
                  ultricies eros.
                  Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros.
                </v-card-text>
              </v-card>
            </v-flex>

            <v-flex xs12 sm4>
              <v-card class="elevation-2">
                <v-card-title primary-title>
                  <div class="headline text-xs-center" style="width: 100%">Planning your meals</div>
                </v-card-title>
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc
                  nec volutpat.
                  Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut
                  ultricies eros.
                  Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Nullam
                  scelerisque id nunc
                  nec volutpat.
                  Etiam pellentesque tristique arcu, non consequat magna fermentum ac.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4>
              <v-card class="elevation-2">
                <v-card-title primary-title>
                  <div class="headline text-xs-center" style="width: 100%">Reducing food-waste</div>
                </v-card-title>
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc
                  nec volutpat.
                  Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut
                  ultricies eros.
                  Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros.
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </div>
      </section>
      <section>
        <v-parallax dark :src="header2" class="parallax2"></v-parallax>
      </section>
      <section>
        <div class="content">
          <v-layout row wrap class="my-5">
            <v-flex xs12>
              <v-card class="elevation-2">
                <v-card-title primary-title>
                  <div class="headline text-xs-center" style="width: 100%">Our mission</div>
                </v-card-title>
                <v-card-text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque id nunc
                  nec volutpat.
                  Etiam pellentesque tristique arcu, non consequat magna fermentum ac. Cras ut
                  ultricies eros.
                  Maecenas eros justo, ullamcorper a sapien id, viverra ultrices eros. Morbi sem
                  neque, posuere
                  et pretium eget, bibendum sollicitudin lacus. Aliquam eleifend sollicitudin diam, eu
                  mattis nisl
                  maximus sed. Nulla imperdiet semper molestie. Morbi massa odio, condimentum sed
                  ipsum ac, gravida
                  ultrices erat. Nullam eget dignissim mauris, non tristique erat. Vestibulum ante
                  ipsum primis in
                  faucibus orci luctus et ultrices posuere cubilia Curae;
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "StartPage",
  data() {
    return {
      header1: require("@/assets/images/refrigeratorheader.jpg"),
      header2: require("@/assets/images/foodtable.jpg"),
      logo: require("@/assets/images/LogoBluer.png")
    };
  }
};
</script>

<style scoped>
#titleCard {
  margin-top: 180px;
  background-color: rgba(255, 255, 255, 0.75);
  border-color: transparent !important;
  position: static;
}

#titleCard,
h4 {
  color: black;
 
}

@media (min-width: 800px) {
  .content {
    width: 70%;
    margin: auto;
  }
}

.parallax {
  min-height: 680px;
}

.parallax2 {
  min-height: 580px;
}
</style>