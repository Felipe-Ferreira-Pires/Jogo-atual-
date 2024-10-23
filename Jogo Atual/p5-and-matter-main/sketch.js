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
var transicao=false
var tempo_transicao=0
const duracao_transicao=1000



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
  if (transicao) {
      fill("purple");
      rect(0, 0, width, height);

      if (millis() - tempo_transicao >= duracao_transicao) {
          transicao = false;
          iniciar_nivel(nivel_atual); 
        }
  } else {
      background("black");
      Motor.update(motor);
      translate(-jogador.corpo.position.x + width / 2, -jogador.corpo.position.y + height / 2);
      drawSprites();
      jogador.aparecer();

      for (var plataforma of plataformas) {
          plataforma.mostrar();
          if (tocando_plataforma(jogador, plataforma)) {
              jogador.resetar_pulos();
          }
      }

      for (var inimigo of inimigos) {
          inimigo.mostrar();
          inimigo.mover();
      }

      if (!colisao_portal) {
          verificar(jogador, portal);
      }

      portal.mostrar();
  }
}

function windowResized () {

    resizeCanvas (windowWidth,windowHeight) // significa a tela inteira
  
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

function iniciar_nivel(nivel) {
  if (nivel === 1) {
      nivel1();
  } else if (nivel === 2) {
      nivel2();
  } else if (nivel === 3) {
      nivel3();
  } else if (nivel === 4) {
      nivel4(); 
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

function verificar(jogador, portal) {
  var colisao = SAT.collides(jogador.corpo, portal.corpo);
  console.log("Colisão: ", colisao.collided); 
  if (colisao.collided) {
      colisao_portal = true;
      nivel_atual++;

      transicao = true;
      tempo_transicao = millis();
      
  }
}





function nivel2 () {
  plataformas = []
  plataformas.push(new Plataforma(300, height -100, 150, 20));
  plataformas.push(new Plataforma(500, height -400, 150, 20));
  plataformas.push(new Plataforma(300, height -700, 150, 20));
  plataformas.push(new Plataforma(500, height -1000, 150, 20));
  plataformas.push(new Plataforma(300, height -1300, 150, 20));
  plataformas.push(new Plataforma(500, height -1600, 150, 20));

  
  inimigos.push(new Inimigo(300, height -120, 50, 50, 5, 0)); 
  inimigos.push(new Inimigo(500, height -370, 50, 50, -5, 0)); 
  inimigos.push(new Inimigo(300, height -670, 50, 50, 5, 0)); 
  inimigos.push(new Inimigo(500, height -970, 50, 50, -5, 0)); 
  inimigos.push(new Inimigo(300, height -1270, 50, 50, 5, 0)); 
  inimigos.push(new Inimigo(500, height -1570, 50, 50, 10, 0)); 
  jogador=new Player (300,-100,15,10);
  portal=new Portal (500,height -2000,50,50);
  
}


function nivel3() {
  plataformas = [];
  inimigos = [];

  plataformas.push(new Plataforma(150, height -150, 200, 20));
  plataformas.push(new Plataforma(400, height -300, 250, 20));
  plataformas.push(new Plataforma(650, height -450, 300, 20));
  plataformas.push(new Plataforma(100, height -600, 150, 20));
  plataformas.push(new Plataforma(500, height -750, 200, 20));
  inimigos.push(new Inimigo(200, height -160, 50, 50, 2, 0));
  inimigos.push(new Inimigo(450, height -310, 50, 50, -2, 0));
  inimigos.push(new Inimigo(700, height -460, 50, 50, 2, 0));
  inimigos.push(new Inimigo(150, height -610, 50, 50, -2, 0));
  inimigos.push(new Inimigo(550, height -760, 50, 50, 2, 0));
  jogador = new Player(300, -100, 15, 10);
  portal = new Portal(500, height -2000, 50, 50);
}

function nivel4() {
  plataformas = []; 
  inimigos = []; 
  plataformas.push(new Plataforma(100, height -100, 200, 20));
  plataformas.push(new Plataforma(400, height -300, 250, 20));
  plataformas.push(new Plataforma(700, height -500, 300, 20));
  inimigos.push(new Inimigo(200, height -160, 50, 50, 2, 0));
  inimigos.push(new Inimigo(450, height -310, 50, 50, -2, 0));
  jogador = new Player(300, 200, 15, 10);
  portal = new Portal(500, height -800, 50, 50);
}
