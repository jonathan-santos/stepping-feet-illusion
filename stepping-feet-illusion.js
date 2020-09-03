if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}

var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')

var fps = 1000/30 //30 fps
var stripeSize = 20.75
var config = {
    boxWidth: 80,
    boxHeight: 30,
    x: 0,
    boxSpeed: 5,
    boxQuantity: 2,
    boxMargin: 30,
    boxColors: [
        '#000',
        '#fff',
        '#fff',
        '#000',
        '#000',
        '#fff',
        '#fff',
        '#000',
        '#000',
        '#fff',
    ],
    stripesOpacity: 1,
    getY: function(i, j) {
        var middleOfCanvas = canvas.height / 2
        var isNumberEven = i % 2 == 0
        var shouldNumberBeNegative = isNumberEven ? -1 : 1
        var y = middleOfCanvas + (j * shouldNumberBeNegative) - (config.boxHeight / 2)
        return y
    }
}

// Create drawing loop 
setInterval(function() {
    // Clear background
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background black stripes
    ctx.fillStyle = `rgba(0, 0, 0, ${config.stripesOpacity})`
    for(var i = stripeSize; i < canvas.width; i += stripeSize * 2) {
        ctx.fillRect(i, 0, stripeSize, canvas.height)
    }

    // Draw config 
    for(var i = 0, j = config.boxMargin ; i < config.boxQuantity ; i++) {
        if(i >= 2 && i % 2 == 0)
            j += config.boxMargin  * 2
            
        ctx.fillStyle = config.boxColors[i]
        ctx.fillRect(config.x, config.getY(i, j), config.boxWidth, config.boxHeight)
    }
    
    // Alter config position
    config.x += config.boxSpeed

    // Reset config position when they reach the edges of screen
    if(config.x + config.boxWidth > canvas.width || config.x < 0)
        config.boxSpeed *= -1
}, fps)

function updateConfig(e) {
    config[e.name] = parseFloat(e.value)
}