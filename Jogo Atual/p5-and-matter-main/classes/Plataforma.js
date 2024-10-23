class Plataforma {
 constructor (x,y,largura,altura){
    this.corpo=Matter.Bodies.rectangle (x,y,largura,altura,{isStatic:true}) //gerar/criar corpo
    this.largura=largura //define a largura como largura
    this.altura=altura //define a altura com oaltura
    Matter.World.add (mundo,this.corpo) // Adciona ao mundo
    this.animacao=loadAnimation (
      'image/PNG/Metal.png'
   )
    
 }
 mostrar (){
   var position=this.corpo.position
   push ()
   translate (position.x,position.y)
   scale (0.5)
   animation (this.animacao,0,0)
   pop ()
  }

}