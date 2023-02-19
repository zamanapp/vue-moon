# Vue-Moon

<p align="center">
<a href="https://github.com/gimyboya/vue-moon#gh-light-mode-only">
  <img src="https://raw.githubusercontent.com/gimyboya/vue-moon/main/public/Screenshot.png#gh-light-mode-only" alt="Vue-Moon - Accurately display the moon phase" width="300">
</a>
<a href="https://github.com/vueuse/vueuse#gh-dark-mode-only">
  <img src="https://raw.githubusercontent.com/gimyboya/vue-moon/main/public/Screenshot.png#gh-dark-mode-only" alt="Vue-Moon - Accurately display the moon phase" width="300">
</a>
<br>
Accurately display the moon phases
</p>

<p align="center">
<a href="https://www.npmjs.com/package/vue-moon" target="__blank"><img src="https://img.shields.io/npm/v/vue-moon?color=a1b858&label=" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/vue-moon" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/vue-moon?color=50a36f&label="></a>

<br>
<a href="https://github.com/gimyboya/vue-moon" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/gimyboya/vue-moon?style=social"></a>
</p>

A Vue component to accurately display moon phases. calculations are made based on the Hijri calendar which is a moon based calendar.

# 🚀 Features

- 🌘 Show current moon phase
- 🌖 Show a specific date moon phase (Gregorian and Soon Hijri)
- 📐 Accept a specific degree (custom calculations)
- 📅 Accept [different Hijri calendars](https://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types)
- 🌔 Support different views (upper hemisphere and lower hemisphere)
- ✨ SVG based

> **Note**
> This component is only compatible with Vue 3

## Installation

```
pnpm i vue-moon # or yarn add vue-moon
```

## Usage

The most basic usage is to import the component and use it directly. this will display the current moon phase based on `Umm al-Qura` calendar.

```html
<template>
  <Moon />
</template>

<script setup>
  import { Moon } from "vue-moon";
</script>
```

### Props

| name       | description                                                                                                                                  | required | type                                                                                   | default                              |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------- | ------------------------------------ |
| moonSize   | the size of the moon in pixels                                                                                                               | false    | number                                                                                 | 348                                  |
| lineWeight | the line width around the moon in pixels                                                                                                     | false    | number                                                                                 | 14                                   |
| moonDegree | if set the moon inner disc will rotate to that degree. useful for custom calculations                                                        | false    | number                                                                                 | current moon phase degree (reactive) |
| flip       | if set to true the moon will flip to depict the northern hemisphere view                                                                     | false    | boolean                                                                                | false                                |
| date       | if set, the component will calculate the moon phase base of that date                                                                        | false    | number \| string \| Date                                                               | now (reactive)                       |
| calendar   | allow the usage of [other hijri calendars](https://cldr.unicode.org/development/development-process/design-proposals/islamic-calendar-types) | false    | "islamic" \| "islamic-civil" \| "islamic-tbla" \| "islamic-umalqura" \| "islamic-rgsa" | "islamic-umalqura"                   |

### Events

Currently no events are emitted from this component

## Credits

https://webspace.science.uu.nl/~gent0113/islam/ummalqura.htm
