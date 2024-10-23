class Portal {
    constructor (x,y,largura,altura){
    this.corpo=Matter.Bodies.circle (x,y,largura,{isStatic:true})
    this.largura=largura
    this.altura=altura
    Matter.World.add (mundo,this.corpo)
    this.animacao=loadAnimation (
        'image/PNG/Portal.png'
     )
    }

    mostrar () {
        var position=this.corpo.position 
     push ()
     translate (position.x,position.y)
     scale (3)
     animation (this.animacao,0,0)
     pop ()
    }
}
 
 