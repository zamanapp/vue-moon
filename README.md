# Ayah-Vue

<!-- TODO: centred screenshot -->

An Elegant Component to display an Ayah or a passage from the [Quran](https://www.quran.com/).

Features

- [x] Accept one or a passage of verses
- [ ] Highlights desired text
- [ ] Tafseer
- [x] Translation
- [ ] Transliteration
- [ ] Audio
- [ ] Theming
- [ ] Light/Dark theme
- [ ] I18n

<!-- Note about Vue2 and 3 Compatibility -->

## Installation

```
yarn add ayah-vue # or npm install ayah-vue
```

## Usage

The most basic usage

```html
<Suspense>
  <Ayah ayat="6:116" :translation="sahih" />
  <template #fallback>
    <p>loading...</p>
  </template>
</Suspense>

<script setup>
  import { Ayah, Translations } from "Ayah-vue";

  const sahih = Translations.EN_SAHIH_INTERNATIONAL;
</script>
```

Notice that we use the `Suspense` component as it's needed to display the loading state before data is fetched

The `ayat` prop accept a single aya or range of ayat with the following syntax `sura:[start-end]` for example:

```html
<Suspense>
  <Ayah ayat="23:[71-73]" :translation="sahih" />
  <template #fallback>
    <p>loading...</p>
  </template>
</Suspense>

<script setup>
  import { Ayah, Translations } from "Ayah-vue";

  const sahih = Translations.EN_SAHIH_INTERNATIONAL;
</script>
```

### Props

### Events

## Development

## Credits

https://quran.api-docs.io/v4/getting-started/introduction
https://digitalkhatt.org/about
Khalid
