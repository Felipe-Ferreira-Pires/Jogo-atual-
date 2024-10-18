class Plataforma {
 constructor (x,y,largura,altura){
    this.corpo=Matter.Bodies.rectangle (x,y,largura,altura,{isStatic:true}) //gerar/criar corpo
    this.largura=largura //define a largura como largura
    this.altura=altura //define a altura com oaltura
    Matter.World.add (mundo,this.corpo) // Adciona ao mundo
    this.animacao=loadAnimation (
       'image/PNG/elementMetal013.png'
    ) 
 }
 mostrar (){
    var posicao=this.corpo.position // Permite mostrar a posição
    fill ("grey") //pinta de verde.
    rectMode (CENTER) //vai geralmente pro centro
    rect(posicao.x,posicao.y,this.largura,this.altura) // define todas as posições
 }

}