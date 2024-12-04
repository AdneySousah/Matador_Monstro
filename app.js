new Vue({
    el:'#app',
    data:{
        running : false,
        playerLife:100,
        monsterLife:100,
        logs:[],
        valor: 0,
        dropEqup:['Elmo','Peitoral','Luvas','Botas','Espadas']
    },
    computed:{
        hasResult(){
            return this.playerLife == 0 || this.monsterLife == 0
        }

    },
    methods:{
        startGame(){
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
            this.logs=[]
            
        },

        attack(especial){
            
           this.hurt('monsterLife',5,10,especial,'Jogador','Monstro','player')
           if(this.monsterLife >0){
            this.hurt('playerLife',7,12,false,'Monstro','Jogador','monster')
           } 
        },
        hurt(prop,min,max,especial,source,target,cls){
            const plus  = especial ? 5 : 0
            const hurt = this.getRandom(min+plus , max+plus)
            this[prop] = Math.max(this[prop]-hurt,0)
            this.registerLog(`${source} atingiu ${target}, com ${hurt}.`,cls)
        },

        /* Implementado função de ataque somente do monstro, para ser chamada na função procura equipamento */
        attackMonster(){
            this.hurt('playerLife',7,12,false,'Monstro','Jogador','monster')
        },
        attackPlayer(){
           
           if(this.valor ==2){
            this.hurt('monsterLife',7*2,12*2,false,'Jogador','Monster','player')
            }
            else if(this.valor ==3){
                this.hurt('monsterLife',7*3,12*3,false,'Jogador','Monster','player')
            }
            this.valor = 0
            
           
        },
        /* Fim implementação propria dentro do projeto */
        healAndHurt(){
            this.heal(10,15)
            this.hurt('playerLife',7,12,false,'Monstro','Jogador','monster')
            
        },
        heal(min,max){
            const heal = this.getRandom(min,max)
            this.playerLife = Math.min(this.playerLife + heal,100)
            this.registerLog(`Jogador ganhou força de ${heal}.`,'cura')
        },

        getRandom(min,max){
            const value = Math.random()* (max-min)+min
            return Math.round(value)
        },
        registerLog(text,cls){
            this.logs.unshift({text, cls})
        },

        SearchEquipament(){
             const equipamento=this.getRandom(1,3) 
            if(equipamento==1){
                this.registerLog(`Jogador não encontrou equipamento.`,'equipamento')
                this.attackMonster()
            }
            else if(equipamento ==2){
                this.valor = 2
                this.attackPlayer()
                this.registerLog(`Jogador encontrou equipamento 2 e bateu com mais força`,'equipamento') 
                this.attackMonster()
                
                
            } 
            else if(equipamento ==3){
                this.valor = 3
                this.attackPlayer()
                this.registerLog(`Jogador encontrou equipamento 2 e bateu com mais força`,'equipamento') 
                this.attackMonster()
                
                
            } 

            
           
        },
        dropMonster(selectedEquip){
            this.registerLog(`Você escolheu um novo equipamento, agora está mais forte e jogador subiu para o nivel 2`,'searchNew  ')
           
            
        },
    },
    watch:{
        hasResult(value){
            if( value){
                
                this.running= false
                
        }}

    }
})