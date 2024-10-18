const Motor=Matter.Engine,
      Mundo=Matter.World,
      Corpos=Matter.Bodies,
      Corpo=Matter.Bodie;
      SAT=Matter.SAT;
var motor,mundo
var plataformas = [] 
var jogador
var inimigos = []
var inimigo
var fundo 
var fundoimg
var portal
var nivel_atual=1
var pontos=0
var colisao_portal=false
function preload() {
fundoimg=loadImage ("image/PNG/Fundo.png"); 

}

function setup() {
  createCanvas(windowWidth,windowHeight)
  motor=Motor.create ()
  mundo=motor.world 
  iniciar_nivel (nivel_atual)
}

function draw() {
  background ("black") 
  Motor.update (motor)
  translate(-jogador.corpo.position.x+width/2,-jogador.corpo.position.y+height/2)
  drawSprites ()
  jogador.aparecer ();
  for (var plataforma of plataformas){
    plataforma.mostrar () // Serve para mostrar a plataforma do outro grupo
    
    if (tocando_plataforma(jogador,plataforma)) {
      jogador.resetar_pulos () // serve para resetar pulos, fizemos um grupo com essa função
    }
  }

  for (var inimigo of inimigos){
    inimigo.mostrar()
    inimigo.mover()
  }
  if (!colisao_portal){
    
    verificar (jogador,portal)
 
  }

  portal.mostrar ();
}

function windowResized () {

    resizeCanvas (windowWidth,windowHeight) // signficia a tela inteira

}

function keyPressed () {
  if (keyCode===RIGHT_ARROW){
    jogador.mover(0.005)
  }
  if (keyCode===LEFT_ARROW){
    jogador.mover(-0.005)
  }
  if (keyCode===32){
    jogador.pular()
  }
}

function tocando_plataforma (jogador,plataforma) {

  const posicao_jogador=jogador.corpo.position
  const posicao_plataforma=plataforma.corpo.position
  const tocando=posicao_jogador.y+jogador.altura/2>=posicao_plataforma.y-plataforma.altura/2&& // serve para ver a posição do jogador até a plataforma
  posicao_jogador.x+jogador.altura/2>=posicao_plataforma.x-plataforma.largura/2&& // serve para ver a posição do jogador até a plataforma
  posicao_jogador.x-jogador.largura/2<=posicao_plataforma.x+plataforma.largura/2; // serve para determinar o que ocorre quando toca [abaixo também]

  return tocando 
  
}

function iniciar_nivel (nivel){
  if (nivel_atual===1){
    nivel1 ()
  }
  else if (nivel_atual===2){
    nivel2 ()
  }
}

function nivel1 () {
  fundo=createSprite (windowWidth/2,windowHeight/2)
  fundo.addImage (fundoimg);
  fundo.scale=4
  plataformas.push(new Plataforma (400,height-300,100,25)) // Serve pra puxar a plataforma de outro grupo.
  plataformas.push(new Plataforma (60,height-200,100,20)) // Serve para puxar a plataforma de outro grupo.
  plataformas.push(new Plataforma (600,height-400,100,20)) // serve para puxar a plataforma de outro grupo.
  plataformas.push(new Plataforma (500,height -500,100,20))
  plataformas.push(new Plataforma (400,height -600,100,20))
  plataformas.push(new Plataforma (350,height -700,100,20))
  jogador=new Player (60,200,15,10); // serve para determinar.
  inimigos.push (new Inimigo (400,height -450,100,10,10,0));
  inimigos.push (new Inimigo (500,height -550,100,10,-10,0));
  portal=new Portal (500,height -1200,50,50);
 
}

function verificar (jogador,portal){
  var colisao=SAT.collides (jogador.corpo,portal.corpo);
  if (colisao.collided) {
   colisao_portal=true
   pontos++
   nivel_atual++
  }
}

function nivel2 () {
  
  plataformas = []
  plataformas.push (new Plataforma (500,height -350,100,20))
  plataformas.push (new Plataforma (70,height -300,100,20))
  plataformas.push(new Plataforma (600,height-400,100,20)) // serve para puxar a plataforma de outro grupo.
  plataformas.push(new Plataforma (500,height -500,100,20))
  plataformas.push(new Plataforma (400,height -700,100,20))
  plataformas.push(new Plataforma (350,height -800,100,20))
  jogador=new Player (60,200,15,10);
  portal=new Portal (500,height -1200,50,50);
  
}