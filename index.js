var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')

var fps = 1000/30 //30 fps
var stripeSize = 20.75
var boxes = {
    width: 80,
    height: 30,
    x: 0,
    speed: 5,
    quantity: 2,
    margin: 30,
    colors: [
        '#14f00c',
        '#dce30e',
        '#1637f5',
        '#ff0a0a',
        '#9233ff',
        '#de186b',
        '#5c4a01',
        '#1ef7e9',
    ],
    getY: function(i, j) {
        var middleOfCanvas = canvas.height / 2
        var isNumberEven = i % 2 == 0
        var shouldNumberBeNegative = isNumberEven ? -1 : 1
        var y = middleOfCanvas + (j * shouldNumberBeNegative) - (boxes.height / 2)
        return y
    }
}

// Create drawing loop 
setInterval(function() {
    // Clear background
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background black stripes
    ctx.fillStyle = '#000'
    for(var i = stripeSize; i < canvas.width; i += stripeSize * 2) {
        ctx.fillRect(i, 0, stripeSize, canvas.height)
    }

    // Draw boxes 
    for(var i = 0, j = boxes.margin; i < boxes.quantity; i++) {
        if(i >= 2 && i % 2 == 0)
            j += boxes.margin * 2
            
        ctx.fillStyle = boxes.colors[i]
        ctx.fillRect(boxes.x, boxes.getY(i, j), boxes.width, boxes.height)
    }
    
    // Alter boxes position
    boxes.x += boxes.speed

    // Reset boxes position when they reach the edges of screen
    if(boxes.x + boxes.width > canvas.width || boxes.x < 0)
        boxes.speed *= -1
}, fps)

function updateBoxes(e) {
    boxes[e.name] = parseInt(e.value)
}