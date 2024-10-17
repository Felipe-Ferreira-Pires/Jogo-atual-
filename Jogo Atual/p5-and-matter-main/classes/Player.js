class Player {
    constructor (x,y,largura,altura){
     this.corpo=Matter.Bodies.rectangle (x,y,largura,altura)
     this.largura=largura
     this.pulos=3
     this.altura=altura
     Matter.World.add (mundo,this.corpo)
     this.animacao=loadAnimation (
        'image/PNG/googly-a.png','image/PNG/googly-b.png','image/PNG/googly-c.png','image/PNG/googly-d.png','image/PNG/googly-e.png'
     )
    }
    aparecer (){
     var position=this.corpo.position
     push ()
     translate (position.x,position.y)
     scale (0.2)
     animation (this.animacao,0,0)
     pop ()
    }
    mover (direcao) {
    Matter.Body.applyForce (this.corpo,this.corpo.position,{x:direcao,y:0})
    }
    pular () {
     
     if (this.pulos>0){
       Matter.Body.applyForce (this.corpo,this.corpo.position,{x:0,y:-0.005})
       this.pulos-- 
     }   
    }
    resetar_pulos () {
      
        this.pulos=3 // serve para fazer os pulos terem um limite
        
    }
}
