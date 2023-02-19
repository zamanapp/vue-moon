<template>
  <div>
    Component Playground
    <Moon show-guide :moon-size="moonSize" :line-weight="borderWidth" />
    <div class="absolute bottom-0 w-full">
      <h2 class="my-3 text-xl font-semibold">Configuration</h2>
      <div class="flex mb-3 align-middle">
        <span class="w-24 ml-3">Rotation</span>
        <input
          placeholder="Rotation"
          v-model.number="moonDeg"
          type="range"
          min="0"
          max="360"
          class="mx-8 slider"
          id="myRange"
        />
        <span>{{ moonDeg }}deg</span>
      </div>
      <div class="flex mb-3 align-middle">
        <span class="w-24 ml-3">Size</span>
        <input
          placeholder="Size"
          v-model.number="moonSize"
          type="range"
          min="0"
          max="1024"
          class="mx-8 slider"
          id="myRange"
        />
        <span>{{ moonSize }}px</span>
      </div>
      <div class="flex mb-3 align-middle">
        <span class="w-24 ml-3">border width</span>
        <input
          placeholder="Width"
          v-model="borderWidth"
          type="range"
          min="0"
          max="30"
          class="mx-8 slider"
          id="myRange"
        />
        <span>{{ borderWidth }}px</span>
      </div>
      <div class="flex mb-3 align-middle">
        <span class="w-24 ml-3">Flip</span>
        <input
          placeholder="Width"
          v-model.number="flip"
          type="range"
          min="0"
          max="250"
          class="mx-8 slider"
          id="myRange"
        />
        <span>{{ flip }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from "vue";
import { Moon } from "./lib";

const moonDeg = ref(180);
const moonSize = ref(348);
const borderWidth = ref(14);
const flip = ref(0);
</script>

<style>
/* The slider itself */
.slider {
  appearance: none;
  width: 50%; /* Full-width */
  height: 25px; /* Specified height */
  opacity: 0.8;
  background: #575757; /* Grey background */
  outline: #202020; /* Remove outline */
  transition: opacity 0.2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
  cursor: pointer;
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  border-radius: 20%;
  background: #0ee8e4; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: #d20818; /* Green background */
  cursor: pointer; /* Cursor on hover */
}
</style>
