<template>
  <v-container>
    <v-timeline :dense="$vuetify.breakpoint.xs">
      <v-timeline-item :large="!$vuetify.breakpoint.smAndDown">
        <v-card>
          <v-card-title primary-title>
            <div class="headline">Welcome</div>
          </v-card-title>
          <v-card-text
            >The creation of this website was inspired by Fate series (I still
            don't now where to start)</v-card-text
          >
        </v-card>
      </v-timeline-item>
      <v-timeline-item :small="$vuetify.breakpoint.smAndDown">
        <v-card>
          <v-card-title primary-title>
            <div class="headline">
              This app is under construction
            </div>
          </v-card-title>
          <v-card-text>
            You can visit
            <v-btn to="/roadmap" flat>roadmap</v-btn>for more information
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Home extends Vue {}
</script>
