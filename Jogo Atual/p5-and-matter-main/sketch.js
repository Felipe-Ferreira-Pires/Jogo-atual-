const Motor = Matter.Engine,
      Mundo = Matter.World,
      Corpos = Matter.Bodies,
      SAT = Matter.SAT;

let motor, mundo;
let plataformas = [];
let jogador;
let inimigos = [];
let portal;
let fundo;
let fundoimg;
let nivel_atual = 1;
let transicao = false;
let tempo_transicao = 0;
const duracao_transicao = 1000;

function preload() {
    fundoimg = loadImage("image/PNG/Fundo.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    motor = Motor.create();
    mundo = motor.world;
    iniciar_nivel(nivel_atual);
}

function draw() {
    if (transicao) {
        fill("black");
        rect(0, 0, width, height);
        
        if (millis() - tempo_transicao >= duracao_transicao) {
            transicao = false;
            iniciar_nivel(nivel_atual);
        }
    } else {
        background("black");
        Motor.update(motor);
        translate(-jogador.corpo.position.x + width / 2, -jogador.corpo.position.y + height / 2);
        
        jogador.aparecer();
        plataformas.forEach(plataforma => {
            plataforma.mostrar();
            if (tocando_plataforma(jogador, plataforma)) {
                jogador.resetar_pulos();
            }
        });

        inimigos.forEach(inimigo => {
            inimigo.mostrar();
            inimigo.mover();
        });

        verificar(jogador, portal);
        portal.mostrar();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        jogador.mover(0.005);
    }
    if (keyCode === LEFT_ARROW) {
        jogador.mover(-0.005);
    }
    if (keyCode === 32) {
        jogador.pular();
    }
}

function tocando_plataforma(jogador, plataforma) {
    const posicao_jogador = jogador.corpo.position;
    const posicao_plataforma = plataforma.corpo.position;
    return posicao_jogador.y + jogador.altura / 2 >= posicao_plataforma.y - plataforma.altura / 2 &&
           posicao_jogador.x + jogador.largura / 2 >= posicao_plataforma.x - plataforma.largura / 2 &&
           posicao_jogador.x - jogador.largura / 2 <= posicao_plataforma.x + plataforma.largura / 2;
}

function iniciar_nivel(nivel) {
    console.log("Iniciando nível: ", nivel);
    plataformas = [];
    inimigos = [];

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

function nivel1() {
    fundo = createSprite(windowWidth / 2, windowHeight / 2);
    fundo.addImage(fundoimg);
    fundo.scale = 4;
    plataformas.push(new Plataforma(400, height - 300, 100, 25));
    plataformas.push(new Plataforma(60, height - 200, 100, 20));
    plataformas.push(new Plataforma(600, height - 400, 100, 20));
    plataformas.push(new Plataforma(500, height - 500, 100, 20));
    plataformas.push(new Plataforma(400, height - 600, 100, 20));
    plataformas.push(new Plataforma(350, height - 700, 100, 20));
    jogador = new Player(60, 200, 15, 10);
    inimigos.push(new Inimigo(400, height - 450, 100, 10, 10, 0));
    inimigos.push(new Inimigo(500, height - 550, 100, 10, -10, 0));
    portal = new Portal(500, height - 1200, 50, 50);
}

function nivel2() {
    plataformas.push(new Plataforma(300, height - 100, 150, 20));
    plataformas.push(new Plataforma(500, height - 400, 150, 20));
    plataformas.push(new Plataforma(300, height - 700, 150, 20));
    plataformas.push(new Plataforma(500, height - 1000, 150, 20));
    plataformas.push(new Plataforma(300, height - 1300, 150, 20));
    plataformas.push(new Plataforma(500, height - 1600, 150, 20));
    jogador = new Player(300, -100, 15, 10);
    portal = new Portal(500, height - 2000, 50, 50);
}

function nivel3() {
    plataformas.push(new Plataforma(150, height - 150, 200, 20));
    plataformas.push(new Plataforma(400, height - 300, 250, 20));
    plataformas.push(new Plataforma(650, height - 450, 300, 20));
    plataformas.push(new Plataforma(100, height - 600, 150, 20));
    plataformas.push(new Plataforma(500, height - 750, 200, 20));
    jogador = new Player(300, -100, 15, 10);
    portal = new Portal(500, height - 2000, 50, 50);
}

function nivel4() {
    plataformas.push(new Plataforma(100, height - 100, 200, 20));
    plataformas.push(new Plataforma(400, height - 300, 250, 20));
    plataformas.push(new Plataforma(700, height - 500, 300, 20));
    jogador = new Player(300, 200, 15, 10);
    portal = new Portal(500, height - 800, 50, 50);
}

function verificar(jogador, portal) {
    var colisao = SAT.collides(jogador.corpo, portal.corpo);
    if (colisao.collided) {
        nivel_atual++;
        transicao = true;
        tempo_transicao = millis();
        console.log("Mudando para o nível: ", nivel_atual);
    }
}
