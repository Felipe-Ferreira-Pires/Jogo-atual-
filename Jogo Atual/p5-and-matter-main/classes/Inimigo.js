class Inimigo {
    constructor (x,y,largura,altura,velocidadeX, velocidadeY){
    this.corpo=Matter.Bodies.rectangle (x,y,largura,altura,{isStatic:true})
    this.largura=largura
    this.altura=altura
    this.velocidadeX=velocidadeX
    this.velocidadeY=velocidadeY
    Matter.World.add (mundo,this.corpo)
    }
    mostrar(){
        var posicao=this.corpo.position
        fill ("red")
        rectMode (CENTER)
        rect (posicao.x,posicao.y,this.largura,this.altura)
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
   
