<template>
  <div class="relative flex items-center justify-center">
    <svg
      :width="sizePx"
      :height="sizePx"
      :viewBox="`0 0 ${maxDimension} ${maxDimension}`"
    >
      <defs>
        <circle
          id="moon"
          :cx="maxDimension / 2"
          :cy="maxDimension / 2"
          :r="outerSize"
        />
        <circle
          id="crescent"
          :cx="maxDimension / 2"
          :cy="maxDimension / 2"
          :r="moonSize"
        />
        <clipPath id="clip-moon">
          <use xlink:href="#crescent" />
        </clipPath>
        <path
          id="months"
          :d="
            circleToPath(
              maxDimension / 2,
              maxDimension / 2,
              moonSize + moonSize / 2
            )
          "
        />
        <path
          id="days"
          :d="
            circleToPath(
              maxDimension / 2,
              maxDimension / 2,
              moonSize + moonSize / 4
            )
          "
        />
      </defs>

      <text class="origin-center" :transform="`rotate(-${monthsRotation})`">
        <textPath
          class="font-mono text-7xl fill-gray-300"
          :textLength="monthsTextLength"
          href="#months"
        >
          {{ months.split(month)[0] }}
          <tspan class="font-semibold fill-black" dy="0">{{ month }}</tspan>
          {{ months.split(month)[1] }}
        </textPath>
      </text>
      <text class="origin-center" :transform="`rotate(-${daysRotation})`">
        <textPath
          class="font-mono text-6xl fill-gray-300"
          side="right"
          :textLength="daysTextLength"
          href="#days"
        >
          {{ days.split(String(day))[0] }}
          <tspan class="font-semibold fill-black" dy="0">{{ day }}</tspan>
          {{ days.split(String(day))[1] }}
        </textPath>
      </text>

      <rect
        class="illusion"
        clip-path="url(#clip-moon)"
        width="50%"
        height="100%"
        :x="flipValue"
        fill="black"
      />

      <use
        fill="white"
        fill-opacity="0"
        stroke="black"
        href="#moon"
        :stroke-width="border"
      ></use>
      <use :fill="fill" href="#crescent" class="disc" />
      <!-- <rect width="3px" height="100%" :x="maxDimension / 2" fill="red" />
      <rect width="100%" height="3px" :y="maxDimension / 2" fill="red" /> -->
    </svg>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";

const propsConfig = {
  size: {
    type: Number,
    default: 348,
    required: false,
  },
  lineWeight: {
    type: Number,
    default: 14,
    required: false,
  },
  moonDegree: {
    type: Number,
    required: false,
  },
  flip: {
    type: Boolean,
    default: false,
    required: false,
  },
  date: {
    type: [String, Number, Object] as PropType<string | number | Date>,
    required: false,
  },
  calendar: {
    type: String,
    required: false,
    default: Intl.DateTimeFormat().resolvedOptions().calendar,
  },
};
</script>

<script setup lang="ts">
import { Temporal, Intl, toTemporalInstant } from "@js-temporal/polyfill";
import { computed, ref, unref } from "vue";
import { useNow } from "@vueuse/core";
// https://tc39.es/proposal-temporal/docs/calendar.html#writing-cross-calendar-code
// todo: customize https://github.com/GriffinJohnston/uiball-loaders
// realtime: https://dev.to/thormeier/use-your-i-moon-gination-lets-build-a-moon-phase-visualizer-with-css-and-js-aih
// https://css-tricks.com/set-text-on-a-circle/
// http://jsfiddle.net/alnitak/ah1k1mo3/
const props = defineProps(propsConfig);

const moonSize = computed(() => (props.size ? props.size : 250));
const border = computed(() => (props.lineWeight ? props.lineWeight : 4));
const sizePx = computed(() => `${moonSize.value}px`);
const outerSize = computed(() => moonSize.value + border.value / 2 - 1);
const maxDimension = computed(() => moonSize.value * 4);

const date = computed(() => (props.date ? new Date(props.date) : useNow()));
unref(date.value).toTemporalInstant = toTemporalInstant;
const cal = ref(Temporal.Calendar.from("islamic-umalqura"));

// Intl.toLocaleString('en-US', { calendar: cal.value, month: 'long' })
const temporalDate = unref(date.value).toTemporalInstant().toZonedDateTime({
  calendar: cal.value,
  timeZone: Temporal.Now.timeZone(),
});

const days = computed(() =>
  Array.from({ length: temporalDate.daysInMonth }, (_: number, i: number) =>
    i + 1 <= 9 ? `0${i + 1}` : String(i + 1)
  )
    .join(" ")
    .concat(" ")
);

const months = computed(() =>
  Array.from({ length: temporalDate.monthsInYear }, (_: number, i: number) => {
    const date = Temporal.ZonedDateTime.from({
      day: 1,
      month: i + 1,
      year: temporalDate.year,
      calendar: cal.value,
      timeZone: temporalDate.timeZone,
    });
    return " ".concat(
      new Intl.DateTimeFormat("en-US", {
        month: "short",
        calendar: cal.value,
      }).format(date)
    );
  })
    .join("")
    .concat(" ")
);

const month = computed(() =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    calendar: cal.value,
  }).format(temporalDate)
);

const day = computed(() =>
  temporalDate.day <= 9 ? `0${temporalDate.day}` : String(temporalDate.day)
);

function circleToPath(cx: number, cy: number, r: number) {
  // https://stackoverflow.com/questions/5737975/circle-drawing-with-svgs-arc-path/10477334#10477334
  return `M ${cx} ${cy}
    m -${r}, 0
    a ${r},${r} 0 1,1 ${r * 2},0
    a ${r},${r} 0 1,1 -${r * 2},0`;
}

const monthsRotation = computed(() => {
  const unit = 360 / months.value.length;
  const index = months.value.search(month.value);
  return (
    unit * (index - months.value.length / 4 + month.value.length / 2) -
    month.value.length / 2 -
    1 // the one represent the dot attached to each month we want to subtract so that the centring ignore it
  );
});

const daysRotation = computed(() => {
  const unit = 360 / days.value.length;
  const index = days.value.search(day.value);
  return (
    unit * (index - days.value.length / 4 + day.value.length / 2) -
    day.value.length / 2
  );
});

const monthsTextLength = computed(() => {
  const circumference = 2 * Math.PI * (moonSize.value + moonSize.value / 2);
  const unit = circumference / months.value.length;
  return circumference - unit;
});
const daysTextLength = computed(() => {
  const circumference = 2 * Math.PI * (moonSize.value + moonSize.value / 4);
  const unit = circumference / days.value.length;
  return circumference - unit;
});

const rotation = computed(() =>
  props.moonDegree || props.moonDegree === 0
    ? props.moonDegree
    : (temporalDate.day * 360) / temporalDate.daysInMonth
);

const moonDeg = computed(() => `${rotation.value}deg`);

const flipValue = computed(() => {
  if (props.flip) {
    return rotation.value > 180 ? 0 : maxDimension.value / 2;
  } else {
    return rotation.value > 180 ? maxDimension.value / 2 : 0;
  }
});

const fill = computed(() =>
  rotation.value >= 90 && rotation.value <= 270 ? "white" : "black"
);
</script>

<style>
.disc {
  transform-style: preserve-3d;
  transform-origin: center;
  transform: rotateY(v-bind(moonDeg));
  backface-visibility: visible;
}
</style>
