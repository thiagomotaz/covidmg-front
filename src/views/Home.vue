<template>
  <Page title="Home">
    <v-row>
      <v-col lg="4" cols="sm" class="pb-2">
        <v-card>
          <v-row class="no-gutters">
            <div class="col-auto">
              <div class="cyan fill-height">&nbsp;</div>
            </div>
            <div class="col pa-3 py-8 cyan--text">
              <h5 class="text-truncate text-uppercase">Sales</h5>
              <h1>53</h1>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col lg="4" cols="sm" class="pb-2">
        <v-card>
          <v-row class="no-gutters">
            <div class="col-auto">
              <div class="primary fill-height">&nbsp;</div>
            </div>
            <div class="col pa-3 py-8 primary--text">
              <h5 class="text-truncate text-uppercase">Growth</h5>
              <h1>23%</h1>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col lg="4" cols="sm" class="pb-2">
        <v-card>
          <v-row class="no-gutters">
            <div class="col-auto">
              <div class="success fill-height">&nbsp;</div>
            </div>
            <div class="col pa-3 py-8 success--text">
              <h5 class="text-truncate text-uppercase">Calls</h5>
              <h1>213</h1>
            </div>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="4" cols="md" class="pb-2">
        <v-card class="dark">
          <v-card-title class="font-weight-light text-truncate cyan--text">
            Orders
          </v-card-title>
          <v-card-text>
            <v-carousel
              cycle
              height="180"
              interval="2000"
              hide-delimiter-background
              show-arrows-on-hover
            >
              <v-carousel-item>
                <div class="row no-gutters">
                  <div class="col">
                    <div>
                      <h2 class="cyan--text">Randy Sheets</h2>
                      <p class="mt-1">Tutankum, WI 33192</p>
                      <h3 class="mb-0">
                        $217.00 <i class="mdi mdi-36px mdi-credit-card-outline float-right"></i>
                      </h3>
                      <p>Total items: 5</p>
                    </div>
                  </div>
                </div>
              </v-carousel-item>
              <v-carousel-item>
                <div class="row no-gutters">
                  <div class="col">
                    <div>
                      <h2 class="cyan--text">Jose Valdex</h2>
                      <p class="mt-1">Turnup, PA 23192</p>
                      <h3 class="mb-0">
                        $97.00 <i class="mdi mdi-36px mdi-paypal float-right"> </i>
                      </h3>
                      <p>Total items: 2</p>
                    </div>
                  </div>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col lg="4" cols="md" class="pb-2">
        <v-card min-height="252">
          <v-card-title class="font-weight-light text-truncate primary--text">
            Goals
          </v-card-title>
          <v-card-text>
            <p class="primary--text subtitle-1">
              Results from last campaign
            </p>
            <div class="my-5">
              <v-progress-linear indeterminate height="8" color="primary"></v-progress-linear>
              <h6>SINCE JAN 2020</h6>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn outlined rounded color="primary">
              Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col lg="4" cols="md" class="pb-2">
        <v-card min-height="252">
          <v-card-title class="font-weight-light text-truncate success--text">
            On-boarding
          </v-card-title>
          <v-card-text>
            <span class="success--text subtitle-1">
              Judy Pincus
            </span>
            <div class="mb-3">
              @jpincus
              <h3>Service Manager</h3>
              <span class="overline">Start date: 5/12/2020</span>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn outlined rounded color="success">
              View
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card class="mx-auto text-center">
          <v-card-title class="primary--text">
            Sales
          </v-card-title>
          <v-sparkline
            :value="sparklineData"
            padding="18"
            label-size="4"
            color="cyan"
            :gradient="['#007bff', 'cyan']"
            :line-width="2"
            :stroke-linecap="'round'"
            smooth
          >
            <template v-slot:label="item"> ${{ item.value }} </template>
          </v-sparkline>
          <v-card-actions class="py-4 justify-center">
            <v-btn color="primary" to="/reports">View Report</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </Page>
</template>

<script>
import Page from '../components/dashboard/core/Page.vue';

export default {
  name: 'Home',
  components: {
    Page,
  },
  data: () => ({
    sparklineData: [
      423,
      446,
      675,
      510,
      590,
      610,
      423,
    ],
  }),
  computed: {
    isLoggedIn() {
      console.log(this.$store.getters);
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {

  },
};
</script>
