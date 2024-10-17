const Motor=Matter.Engine,
      Mundo=Matter.World,
      Corpos=Matter.Bodies,
      Corpo=Matter.Bodie;
var motor,mundo
var plataformas = [] 
var jogador
var inimigos = []
var inimigo

function setup() {
  createCanvas(windowWidth,windowHeight)
  motor=Motor.create ()
  mundo=motor.world 
  plataformas.push(new Plataforma (400,height-300,100,25)) // Serve pra puxar a plataforma de outro grupo.
  plataformas.push(new Plataforma (60,height-200,100,20)) // Serve para puxar a plataforma de outro grupo.
  plataformas.push(new Plataforma (600,height-400,100,20)) // serve para puxar a plataforma de outro grupo.
  plataformas.push(new Plataforma (500,height -500,100,20))
  plataformas.push(new Plataforma (400,height -600,100,20))
  plataformas.push(new Plataforma (350,height -700,100,20))
  jogador=new Player (60,200,15,10); // serve para determinar.
  inimigos.push (new Inimigo (400,height -450,100,10,10,0));
  inimigos.push (new Inimigo (500,height -550,100,10,-10,0));
}

function draw() {

  background ("black") 
  Motor.update (motor)
  translate(-jogador.corpo.position.x+width/2,-jogador.corpo.position.y+height/2)
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

