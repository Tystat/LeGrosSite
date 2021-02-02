<template>
    <div class="summonerMasteries">
        <b-card>
            <b-card-header class="text-reset">Maitrises</b-card-header>
            <b-card-body>
                <b-button-group>
                    <b-button v-on:click="sort = Sort.Level">Niveau</b-button>
                    <b-button v-on:click="sort = Sort.Points">Points</b-button>
                    <b-button v-on:click="sort = Sort.Alphabetical">Alphabétique</b-button>
                </b-button-group>
                <li v-for="champ in champions.slice(0,5)" :key="champ.name">
                    {{champ.name}} || Mastery {{champ.mastery}} : {{champ.points}} pts
                </li>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>

const Sort = {
    Level: 0,
    Points: 1,
    Alphabetical: 2
}

export default {
    name: 'summonerMasteries',
    data: function() {
        return{
            sort: Sort.Level
        }
    },
    computed: {
        //To detect if either has changed
        sortType: function (){
            return(this.sort);
        }
    },
    methods: {
        sortChamps(){
            switch(this.sort){
                case Sort.Level:
                    this.champions.sort((a, b) => 
                        (a.championLevel > b.championLevel) ?
                            1 :
                            (a.championLevel === b.championLevel) ?
                                ((a.championPoints > b.championPoints) ?
                                    1 :
                                    -1) :
                                -1);
                    break;
                case Sort.Points:
                    this.champions.sort((a, b) => (a.championPoints > b.championPoints) ? 1 : -1);
                    break;
                case Sort.Alphabetical:
                    this.champions.sort((a, b) => ((a.toLowerCase().replace(/\s/g, '') > (b.toLowerCase().replace(/\s/g, ''))) ? 1 : -1));
            }
        }
    },
    watch: {
        sortType(){
            this.sortChamps();
        }
    },
    props: {
        champions: []
    }
}
</script>