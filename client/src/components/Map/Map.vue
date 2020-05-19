<template>
  <div>
    <l-map
      ref="map"
      :zoom="zoom"
      :center="center"
      style="width:500px;height:500px"
    >
      <l-draw-toolbar 
        position="topright"
        :drawnItems="lista"
      />
      <l-tile-layer 
      :url="url"
      attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
      ></l-tile-layer>
      <l-tile-layer 
      url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      ></l-tile-layer>
    </l-map>
  </div>
</template>

<script src="MapController.js"></script>