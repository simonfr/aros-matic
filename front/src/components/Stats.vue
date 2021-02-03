<template>
  <div>
    <div class="title">
      <h1>Statistiques détaillées de votre plante</h1>
    </div>
    <div class="wrapper">
      <div class="lumos"><h2>Luminosité</h2>
        <Histogram
          :data="selectedData"
          :width="width"
          :height="height"
          :num-bins="parseInt(bins)"
        />
      </div>
      <div class="humid"><h2>Humidité</h2>
        <Histogram
          :data="selectedData"
          :width="width"
          :height="height"
          :num-bins="parseInt(bins)"
        />
      </div>
      <div class="temp"><h2>Température</h2>
        <Histogram
          :data="selectedData"
          :width="width"
          :height="height"
          :num-bins="parseInt(bins)"
        />
      </div> 
      <div class="lastarros"><h2>Date du dernier arrosage</h2></div>
      <div class="arrose"><h2>Conditions d'arrosage</h2>
        <form action="" method="POST" class="form">
          <fieldset>
            <select id = "days"
              multiple = "multiple"
              size = "7">
              <option value = "Lundi">Lundi</option>
              <option value = "Mardi">Mardi</option>
              <option value = "Mercredi">Mercredi</option>
              <option value = "Jeudi">Jeudi</option>
              <option value = "Vendredi">Vendredi</option>
              <option value = "Samedi">Samedi</option>
              <option value = "Dimanche">Dimanche</option>
            </select>
            <div class="form-example">
              <label for="email">Arroser lorsque l'humidité est basse :</label>
              <input type="checkbox" id="arroserHumidite">
            </div>
          </fieldset>
          <input type="submit" onclick="showInput();" value="Arroser !">
        </form>
        <p><span id='display'></span></p>
      </div>
    </div>
    <div id="my_dataviz"></div>
    <footer><img alt="Vue logo" src="../assets/logo.png"></footer>
  </div>
</template>

<script>
import Histogram from './Histogram'
import * as d3 from "d3";

export default {
  name: "Stats",
  props: {
    msg: String
  },
  data() {
    return {
      data: {
        normal: d3.range(0, 2000).map(d3.randomNormal())
      },
      width: 300,
      height: 200,
      bins: 20,
      sampleSize: 8000
    };
  },
  computed: {
    selectedData() {
      return this.data["normal"].slice(
        0,
        parseInt(this.sampleSize)
      );
    },
    distributions() {
      return Object.keys(this.data);
    }
  },
  components: {
    Histogram: Histogram
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
.lumos {
  grid-column: 1;
  grid-row: 1;
}
.humid {
  grid-column: 2;
  grid-row: 1;
}
.temp {
  grid-column: 3;
  grid-row: 1;
}
.lastarros {
  grid-column: 1/4;
  grid-row: 2;
}
.arrose {
  grid-column: 1/4;
  grid-row: 3;
}

footer {
    display: flex;
    justify-content: center;
    padding-bottom: px;
    color: #fff;
}
</style>
