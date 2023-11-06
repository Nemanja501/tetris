const MOVEMENT_SPEED = 50;
let fallenBlocks = [];


class Block{

    constructor(height, width, color, x, y){
        this.height = height;
        this.width = width;
        this.color = color;
        this.x = x;
        this.y = y;

        this.init();
    }

    init(){
        this.el = document.createElement('div');
        this.el.style.width = this.width + 'px';
        this.el.style.height = this.height + 'px';
        this.el.style.background = this.color;
        this.el.style.position = 'absolute';
        this.el.style.top = this.y + 'px';
        this.el.style.left = this.x + 'px';
        document.body.appendChild(this.el);
    }

    move(){
        let func;
        const maxY = window.innerHeight - MOVEMENT_SPEED - this.height;
        const maxX = window.innerWidth - MOVEMENT_SPEED - this.width;

        document.addEventListener('keydown', func = (event) =>{
            if(event.key == 'ArrowLeft' && this.x >= 0){
                this.x -= MOVEMENT_SPEED * 2;
                this.el.style.left = this.x + 'px';
                if(this.x < 0){
                    this.x = 0;
                    this.el.style.left = this.x + 'px';
                }
                
            }else if(event.key == 'ArrowRight' && this.x <= maxX){
                this.x += MOVEMENT_SPEED * 2;
                this.el.style.left = this.x + 'px';
            }
        });
        let intervalID = setInterval(() =>{
            this.y += MOVEMENT_SPEED;
            this.el.style.top = this.y + 'px';
            if(this.y >= maxY){
                fallenBlocks.push(this);
                clearInterval(intervalID);
                document.removeEventListener('keydown', func);
                createNewBlock();
                return;
            }
            fallenBlocks.forEach(block => {
                if((this.y + this.height + MOVEMENT_SPEED > block.y && this.x + this.width > block.x && this.x < block.x + block.width) || (this.y + this.height + MOVEMENT_SPEED > block.y && this.x == block.x)){
                    fallenBlocks.push(this);
                    clearInterval(intervalID);
                    document.removeEventListener('keydown', func);
                    createNewBlock();
                    return;
                }
            });
    
        }, 250);
    }
}

function createNewBlock(){
    const heightAndWidthValues = [[100, 100], [200, 100], [200, 200], [200, 300], [300, 100], [100, 200], [100, 300], [100, 400]];
    const spawnPoints = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700];
    const colorValues = ['red', 'blue', 'green', 'purple', 'yellow', 'teal', 'lime', 'turquoise', 'pink', 'magenta', 'orange', 'aquamarine', 'crimson', 'chocolate', 'gold', 'lavander', 'maroon', 'MediumPurple', 'MidnightBlue'];
    const heightAndWidth = heightAndWidthValues[Math.floor(Math.random() * heightAndWidthValues.length)];
    const color = colorValues[Math.floor(Math.random() * colorValues.length)];
    const x = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];

    if(checkIfPlayerLost()){
        fallenBlocks.forEach(block => {
            block.el.style.display = 'none';

        });
        let gameOverMessage = document.createElement('h1');
        gameOverMessage.style.position = 'absolute';
        gameOverMessage.innerHTML = "GAME OVER";
        gameOverMessage.style.left = "45vw";
        gameOverMessage.style.top = "45vh";
        document.body.appendChild(gameOverMessage);
        return;
    }else{
        const newBlock = new Block(heightAndWidth[0], heightAndWidth[1], color, x, 0);
        newBlock.move();
    }
}


function checkIfPlayerLost(){
    let gameOver = false;
    fallenBlocks.forEach(block => {
        if(block.y - (block.height / 2) <= 0){
            console.log('you lost');
            gameOver = true;
        }
    })
    return gameOver;
}

createNewBlock();

