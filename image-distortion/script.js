window.onload = function() {
  let running = 0;

document.querySelector('body').addEventListener('click', function(){
  if(!running){
    running = 1;
    
const timeline = new TimelineMax();
timeline
	.to(displacementFilter.scale, 0.5, {y:100,x: 0.1})
	.to(displacementFilter.scale, 0.5, {y:0.1,x:0.1})
  .call(function(){
    running = 0;
    img2 = [img1, img1 = img2][0];
  });
	timeline
		.to(img2, 0.5, {alpha: 1},0.5)
    .to(img1,0.4,{alpha: 0},0.6)
	timeline
		.fromTo(img2.scale, 0.5, 
			{y:img2.scale.y*1.2},
			{y:img2.scale.y},0.5)
  }
});


const renderer = new PIXI.Application(500, 500, {backgroundColor : 0x000000});
renderer.view.width = 500;
renderer.view.height = 500;
document.getElementById("pixi").appendChild(renderer.view);
const container = new PIXI.Container();
renderer.stage.addChild(container);


let img1 = PIXI.Sprite.from('./img/cat1.jpg');
	img1.width = 500;
	img1.height = 500;
	img1.position.x = 0;
	img1.position.y = 0;
	container.addChild(img1);


let img2 = PIXI.Sprite.from('./img/cat2.jpg');
	img2.width = 500;
	img2.height = 500;
	img2.position.x = 0;
	img2.position.y = 0;
	img2.alpha = 0;
	container.addChild(img2);


const disSprite = PIXI.Sprite.from('./img/map6.jpg');
disSprite.width = 500;
disSprite.height = 500;
const displacementFilter = new PIXI.filters.DisplacementFilter(disSprite);
displacementFilter.scale.set(0.1);
container.addChild(disSprite);
container.filters = [displacementFilter];

function draw(){
	renderer.render(renderer.stage);
	window.requestAnimationFrame(draw);
}
draw();
}
