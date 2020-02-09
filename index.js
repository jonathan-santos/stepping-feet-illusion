var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')

var fps = 1000/30 //30 fps
var stripeSize = 20
var boxSize = {
    width: 80,
    height: 30
}
var box1 = {
    color: '#00f',
    x: 0,
    y: 180,
    speed: 5
}

var box2 = {
    color: '#ff0',
    x: 0,
    y: 260,
    speed: 5
}

setInterval(function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Making backgroud black stripes
    ctx.fillStyle = '#000'
    for(var i = 0; i < canvas.width; i += stripeSize * 2) {
        ctx.fillRect(i, 0, stripeSize, canvas.height)
    }
    
    ctx.fillStyle = box1.color
    ctx.fillRect(box1.x, box1.y, boxSize.width, boxSize.height)

    ctx.fillStyle = box2.color
    ctx.fillRect(box2.x, box2.y, boxSize.width, boxSize.height)

    if(box1.x + boxSize.width > canvas.width || box1.x < 0)
        box1.speed *= -1
    if(box2.x + boxSize.width > canvas.width || box2.x < 0)
        box2.speed *= -1

    box1.x += box1.speed
    box2.x += box2.speed
}, fps)