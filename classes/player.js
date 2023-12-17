class Player extends Sprite {
    constructor({ position, src, frame,scale , animation }) {
        super({ position: position, src: src, frame: frame ,scale:scale})
        this.velocity = { x: 0, y: 0 };
        this.collision = FloorCollision2d;
        
        this.animation=animation;
        for(let key in this.animation){
            const image = new Image()
            image.src=this.animation[key].src,
            this.animation[key].image=image
        }
        this.hitbox = {
            position: {
                x: this.position.x +34,
                y: this.position.y+25
            },
            width: 15,
            height: 28
        }
    }
    switchSprite(key){
        if(this.image === this.animation[key].image) return
        this.image=this.animation[key].image
        this.frame=this.animation[key].frame
        this.FrameBuffer=this.animation[key].FrameBuffer
    }
    
    update() {
        this.updateFrames();
        this.draw();
        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkforhorizontalcollision();
        this.applyGravity();
        this.updateHitbox();
        this.checkforverticalcollision();
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x +34,
                y: this.position.y+25
            },
            width: 15,
            height: 28
        }
    }

    applyGravity() {
        this.velocity.y += 0.1;
        this.position.y += this.velocity.y;
        

    }
    checkforverticalcollision() {
        for (let i = 0; i < this.collision.length; i++) {
            const collison = this.collision[i]
            if (collide({
                object1: this.hitbox, object2: collison
            })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;

                    const offset =this.hitbox.height+this.hitbox.position.y-this.position.y
                    this.position.y = collison.position.y-offset-0.01;
                    break
                }
                if (this.velocity.y < 0) {
                    const offset =this.hitbox.position.y-this.position.y
                    this.velocity.y = 0;
                    this.position.y = collison.position.y + collison.height -offset+ 0.01
                    break
                }
            }
        }
    }
    checkforhorizontalcollision() {
        for (let i = 0; i < this.collision.length; i++) {
            const collison = this.collision[i]
            if (collide({
                object1: this.hitbox,
                object2: collison
            })) {
                if (this.velocity.x > 0) {
                    const offset =this.hitbox.position.x-this.position.x+this.hitbox.width
                    this.velocity.x = 0;
                    this.position.x = collison.position.x - offset - 0.01
                    break
                }
                if (this.velocity.x < 0) {
                    const offset =(this.hitbox.position.x-this.position.x)
                    this.velocity.x = 0;
                    this.position.x = collison.position.x  +collison.width-offset + 0.01
                    break
                }
            }
        }
    }
}
