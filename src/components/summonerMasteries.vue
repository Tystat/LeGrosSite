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
                <li v-for="champ in this.champions.slice(0,10)" :key="champ.name">
                    <img :src="'https://ddragon.leagueoflegends.com/cdn/' + ddragonVersion + '/img/champion/'+champ.name+'.png'" width="5%"/>
                    {{champ.name}} || Mastery {{champ.mastery}} : {{champ.points}} pts
                </li>
            </b-card-body>
        </b-card>
    </div>
</template>

<script>

import {riotAPICall} from '../library.js'

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
            ddragonVersion: 0,
            champions: [],
            Sort
        }
    },
    computed: {
        //To detect if either has changed
        summonerNameAndRegion: function (){
            return(this.summonerName+this.summonerRegion);
        }
    },
    methods: {
        getDdragonVersion() {
            fetch('http://127.0.0.1:8081/api/DD/api/versions.json')
            .then((response) => {
                return response.json();
            }).then((data) => {
                // `data` is the parsed version of the JSON returned from the above endpoint.
                this.ddragonVersion = data[0];
            });
        },
        getMasteries() {
            //Execute only if the summoner region or summonerName has changed
            if(this.summonerRegion!==undefined && this.summonerName!==undefined){
                console.log(`API REQUEST BASIC SUMMONERINFOS -- ${this.summonerName}`)
                //Request the summoner data from Riot
                riotAPICall(`http://127.0.0.1:8081/api/${this.summonerRegion}/lol/summoner/v4/summoners/by-name/${this.summonerName}`,(dataSummoner) => {
                    //If a summoner is found (status object is only return if no summoner was found)
                    if(dataSummoner.status===undefined){
                        //Store the summoner data
                        var parsedInfos = dataSummoner;
                        console.log(`API REQUEST ADVANSUMMONERINFOS -- ${this.summonerName}`)
                        //Request the mastery infos from Riot
                        riotAPICall(`http://127.0.0.1:8081/api/${this.summonerRegion}/lol/champion-mastery/v4/champion-masteries/by-summoner/${parsedInfos.id}`,(dataMasteries) => {
                            //Request the list of champion from Data Dragon (no limit on the number of call so we don't use riotAPICall())
                            fetch(`http://127.0.0.1:8081/api/DD/cdn/${this.ddragonVersion}/data/en_US/champion.json`)
                            .then((champs) => {
                                //Parse the API response
                                return champs.json();
                            }).then((dataChampions) => {
                                this.champions = []
                                for(var champion in dataChampions.data) {
                                    for(var mastery in dataMasteries){
                                        if(dataChampions.data[champion].key == dataMasteries[mastery].championId){
                                            this.champions.push({name: champion, mastery: dataMasteries[mastery].championLevel, points: dataMasteries[mastery].championPoints});
                                        }
                                    }
                                }
                            });
                        });
                        this.sortChamps();
                        this.getDdragonVersion();
                    } else {
                        this.champions = []
                    }
                });
            }
        },
        sortChamps(){
            switch(this.sort){
                case Sort.Level:
                    this.champions.sort((a, b) =>
                        (a.mastery < b.mastery) ? //Primary sort by mastery level
                            1 :
                            (a.mastery === b.mastery) ? //Secondary sort by mastery points
                                ((a.points < b.points) ?
                                    1 :
                                    -1) :
                                -1);
                    break;
                case Sort.Points:
                    this.champions.sort((a, b) => (a.points < b.points) ? 1 : -1);
                    break;
                case Sort.Alphabetical:
                    //Alphabetical sort without case sensitivity and spaces
                    this.champions.sort((a, b) => ((a.name.toLowerCase().replace(/\s/g, '') > (b.name.toLowerCase().replace(/\s/g, ''))) ? 1 : -1));
                    break;
            }
        }
    },
    mounted(){
        this.getMasteries();
    },
    watch: {
        summonerNameAndRegion() {
            this.getMasteries();
        },
        sort: function(){
            this.sortChamps();
        }
    },
    props: {
        summonerName: String,
        summonerRegion: String,
    }
}
</script>
