class Portal {
    constructor (x,y,largura,altura){
    this.corpo=Matter.Bodies.circle (x,y,largura,{isStatic:true})
    this.largura=largura
    this.altura=altura
    Matter.World.add (mundo,this.corpo)
    }
    mostrar(){
        var posicao=this.corpo.position
        fill("purple")
        ellipseMode (CENTER)
        ellipse (posicao.x,posicao.y,this.largura,this.altura)
    }
}
