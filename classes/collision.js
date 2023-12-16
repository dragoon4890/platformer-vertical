

class collision{
    constructor({position}){
        this.position=position;
        this.height=16;
        this.width=16;
    }

    draw(){
        c.fillStyle='rgba(255,0,0,0.5)'
        c.fillRect(this.position.x,this.position.y,this.height,this.width);
    }

    update(){
        this.draw();
    }
}