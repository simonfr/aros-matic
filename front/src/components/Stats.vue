<template>
  <div>
    <div class="title">
      <h1>Statistiques détaillées de votre plante</h1>
    </div>
    <button v-on:click="fetchAPIData();">Rafraichir les données</button>
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
      <div class="lastarros">
        <h2>Date du dernier arrosage</h2>
        <h2 v-if="dataPlant">{{dataPlant[0].lastArrosageDate}}</h2>
      </div>
      <div class="arrose"><h2>Conditions d'arrosage</h2>
        <form v-on:submit.prevent="submitForm">
          <fieldset>
          <div class="form-group">
               <label for="formControlRange">Jours d'arrosage</label><br /><br />
              <select multiple name="days" class="form-control" id="days" v-model="form.days" size="7">
                  <option value="lundi">Lundi</option>
                  <option value="mardi">Mardi</option>
                  <option value="mercredi">Mercredi</option>
                  <option value="jeudi">Jeudi</option>
                  <option value="vendredi">Vendredi</option>
                  <option value="samedi">Samedi</option>
                  <option value="dimanche">Dimanche</option>
              </select>
          </div><br />
          <div class="form-group">
            <label for="formControlRange">Arroser votre plante lorsque que l'humidité est basse ?</label><br />
            <div class="form-check form-check-inline"><br />
                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="arroserHumidite"
                    v-model="form.arroserHumidite">
            </div><br />
          </div>
          <div class="form-group">
            <label for="name">Volume d'eau à arroser (en millilitre) :</label><br /><br />
            <input type="number" class="form-control" id="volume" placeholder="Volume" v-model="form.volume">
          </div><br />
          <div class="form-group">
              <button class="btn btn-primary">Enregistrer</button>
          </div>
        </fieldset>
      </form>
      </div>
    </div>
    <footer><img alt="Vue logo" src="../assets/logo.png"></footer>
  </div>
</template>

<script>
import Histogram from './Histogram'
import * as d3 from "d3";
import axios from "axios";

export default {
  name: "Stats",
  props: {
    msg: String
  },
  data() {
    return {
      counter: 0,
      data: {
        normal: d3.range(0, 2000).map(d3.randomNormal())
      },
      dataPlant: null,
      form: {
              days: [],
              arroserHumidite: '',
              volume: ''
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
    },
  },
  methods: {
    fetchAPIData() {  
    axios
      .get('http://localhost:8000/stats')
      .then(response => {
        console.info(response.data);
        this.$data.dataPlant = response.data;
      })
      .catch(error => console.log(error))
    },
    submitForm(){
      console.info(this.form)
      axios.post('http://localhost:8000/conditions', this.form)
        .then((res) => {
          console.info(res)
        })
        .catch((error) => {
          console.info(error)

        }).finally(() => {
        });
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
