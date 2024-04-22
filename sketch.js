//variáveis da bolinha
let xBolinha = 768;
let yBolinha = 364;
let diametro = 30;
let raio = diametro / 2 ;

//velocidade da bolinha
let velocidadeXBolinha = 10;
let velocidadeYBolinha = 10;


//variáveis da raquete
let xRaquete = 10;
let yRaquete = 150;
let raqueteComprimento = 20;
let raqueteAltura = 120;

//raquete do oponente
let xOponente = 1507;
let yOponente = 150;
let velocidadeYOponente;

//Placar do jogo
let pontoMeu = 0;
let pontoOponente = 0;

let chanceDeErrar = 0;

function setup() {
  createCanvas(1536, 729);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete (xOponente, yOponente);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xOponente, yOponente);
  movimentaRaqueteOponente ();
  mostraPlacar ();
  marcarPonto ();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if (xBolinha + raio> width ||
     xBolinha - raio< 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio> height ||
     yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y){
  rect(x, y, raqueteComprimento, 
      raqueteAltura);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
  yRaquete = constrain(yRaquete, 5, height - 95)
}

function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio)
  if (colidiu) {
    velocidadeXBolinha *= -1
  }
}

function movimentaRaqueteOponente () {
  velocidadeYOponente = yBolinha - yOponente - raqueteComprimento/2 - 30
  yOponente += velocidadeYOponente + chanceDeErrar
  
//  if (keyIsDown(87)){
//    yOponente -= 10;
//  }
//  if (keyIsDown(83)){
//    yOponente += 10;
//  }
    
  CalcChanceDeErrar ();
  
  yOponente = constrain(yOponente, 5, height - 95)
}

function CalcChanceDeErrar () {
  if (pontoOponente >= pontoMeu) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }

}

function mostraPlacar () {
  stroke(255);
  textAlign (CENTER);
  textSize(28);
  fill(255,140,0);
  rect(384, 10, 80, 40);
  rect(1012, 10, 80, 40);
  fill(220);
  text(pontoMeu, 424, 40);
  text(pontoOponente, 1052, 40);
}

function marcarPonto () {
  if (xBolinha - raio < 0) {
    pontoOponente +=1;
  }
  if (xBolinha + raio > width) {
    pontoMeu +=1;
  }
}


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}
