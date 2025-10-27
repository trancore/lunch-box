<script setup lang="ts">
type Props = {
  lat: number;
  lng: number;
  tooltipText: string;
};

const TILE_PROVIDERS = [
  {
    name: 'OpenStreetMap',
    visible: true,
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  },
  // FIXME: 実用に耐えられないので、一旦コメントアウト
  // {
  //   name: 'OpenTopoMap',
  //   visible: false,
  //   url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  //   attribution:
  //     'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
  // },
];

const props = defineProps<Props>();

const zoom = ref(20);
const location = ref<[number, number]>([props.lat, props.lng]);
</script>

<template>
  <div class="map-conteiner">
    <LMap :zoom="zoom" :center="location" :useGlobalLeaflet="false">
      <LControlLayers position="topright" />
      <LControlScale position="bottomleft" :metric="true" :imperial="false" />
      <LTileLayer
        v-for="tileProvider in TILE_PROVIDERS"
        :key="tileProvider.name"
        :name="tileProvider.name"
        :visible="tileProvider.visible"
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
        layerType="overlay"
      />
      <LMarker :latLng="location">
        <LTooltip>{{ tooltipText }}</LTooltip>
      </LMarker>
    </LMap>
  </div>
</template>

<style lang="scss" scoped>
.map-conteiner {
  width: 100%;
  height: 500px;
}
</style>
