class Sprite {
    constructor({ position, src, frame = 1,scale=1 }) {
        this.position = position;
        this.scale=scale;
        this.image = new Image();
        this.image.onload = () => {
            this.width = this.scale*(this.image.width / this.frame);
            this.height = this.scale*(this.image.height);
        }
        this.currentframe = 0
        this.image.src = src;
        this.frame = frame;
        this.FrameBuffer=10;
        this.elapsedFrame=0;


    }

    draw() {
        if (!this.image) return;
        const cropped = {
            position: {
                x: this.currentframe * (this.image.width / this.frame),
                y: 0
            },
            height: this.image.height,
            width: this.image.width / this.frame
        }
        c.drawImage(this.image,
            cropped.position.x,
            cropped.position.y,
            cropped.width,
            cropped.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    }

    update() {
        this.draw();
        
    }

    updateFrames() {
        this.elapsedFrame++
        if(this.elapsedFrame%this.frame==0){
        if (this.currentframe < this.frame - 1)
            this.currentframe++
        else
            this.currentframe = 0
    }
}

}