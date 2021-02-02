<template>
    <div class="summonerMasteries">
        <b-card 
        class="mb-2 text-dark mx-auto mt-5">
            <b-card-header class="text-reset">Maitrises</b-card-header>
            <b-card-body>
                <b-button-group>
                    <b-button @click="() => sort = Sort.Level">Niveau</b-button>
                    <b-button @click="() => sort = Sort.Points">Points</b-button>
                    <b-button @click="() => sort = Sort.Alphabetical">Alphabétique</b-button>
                </b-button-group>
                <li v-for="champ in this.formattedChampions.slice(0,10)" :key="champ.name">
                    <img :src="'https://ddragon.leagueoflegends.com/cdn/11.2.1/img/champion/'+champ.name+'.png'" width="5%"/>
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
};

export default {
    name: 'summonerMasteries',
    data: function() {
        return{
            sort: Sort.Level,
            formattedChampions: [],
            Sort
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
            fetch('/api/ddragonChampions').then((champs) => {
                //Parse the API response
                return champs.json();
            }).then((dataChampions) => {
                this.formattedChampions = []
                for(var i = 0; i < this.champions.length; i++){
                    for(var dChampion in dataChampions.data){
                        if(dataChampions.data[dChampion].key == this.champions[i].championId){
                            this.formattedChampions.push({name: dChampion, mastery: this.champions[i].championLevel, points: this.champions[i].championPoints});
                            break;
                        }
                    }
                }
              });

            switch(this.sort){
                case Sort.Level:
                    this.formattedChampions.sort((a, b) => 
                        (a.mastery < b.mastery) ?
                            1 :
                            (a.mastery === b.mastery) ?
                                ((a.points < b.points) ?
                                    1 :
                                    -1) :
                                -1);
                    break;
                case Sort.Points:
                    this.formattedChampions.sort((a, b) => (a.points < b.points) ? 1 : -1);
                    break;
                case Sort.Alphabetical:
                    this.formattedChampions.sort((a, b) => ((a.name.toLowerCase().replace(/\s/g, '') > (b.name.toLowerCase().replace(/\s/g, ''))) ? 1 : -1));
                    break;
            }
            console.log(this.formattedChampions)
        }
    },
    mounted(){
        this.sortChamps();
    },
    watch: {
        sort: function(){
            this.sortChamps();
        }
    },
    props: {
        champions: Array
    }
}
</script>