class Inimigo {
    constructor (x,y,largura,altura,velocidadeX, velocidadeY){
    this.corpo=Matter.Bodies.rectangle (x,y,largura,altura,{isStatic:true})
    this.largura=largura
    this.altura=altura
    this.velocidadeX=velocidadeX
    this.velocidadeY=velocidadeY
    Matter.World.add (mundo,this.corpo)
    this.animacao=loadAnimation (
        'image/PNG/Inimigo.png'
     )
    }
    
    
    mostrar() {
        var position=this.corpo.position
     push ()
     translate (position.x,position.y)
     scale (3)
     animation (this.animacao,0,0)
     pop ()
    }
    mover (){
        Matter.Body.translate (this.corpo,{
            x:this.velocidadeX,
            y:this.velocidadeY
        })
        if (this.corpo.position.x<0 || this.corpo.position.x>width){
            this.velocidadeX *=-1
        
        }
        if (this.corpo.position.y<0 || this.corpo.position.y>height){
            this.velocidadeY *=-1
        }
        
    }
       
}
   
