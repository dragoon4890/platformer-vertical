class Player extends Sprite {
    constructor({ position, src, frame,scale }) {
        super({ position: position, src: src, frame: frame ,scale:scale})
        this.velocity = { x: 0, y: 0 };
        this.collision = FloorCollision2d;

        this.hitbox = {
            position: {
                x: this.position.x +34,
                y: this.position.y+25
            },
            width: 15,
            height: 28
        }
    }

    update() {
        this.updateFrames();
        this.updateHitbox();
        c.fillStyle = 'rgba(0,255,0,0.25)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        c.fillStyle = 'rgba(255,0,0,0.5)'
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        this.draw();
        this.position.x += this.velocity.x;
        this.checkforhorizontalcollision();
        this.applyGravity();
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
        this.position.y += this.velocity.y;
        this.velocity.y += 0.1;

    }
    checkforverticalcollision() {
        for (let i = 0; i < this.collision.length; i++) {
            const collison = this.collision[i]
            if (collide({
                object1: this, object2: collison
            })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = collison.position.y - this.height - 0.01
                    break
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    this.position.y = collison.position.y + collison.height + 0.01
                    break
                }
            }
        }
    }
    checkforhorizontalcollision() {
        for (let i = 0; i < this.collision.length; i++) {
            const collison = this.collision[i]
            if (collide({
                object1: this,
                object2: collison
            })) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    this.position.x = collison.position.x - this.width - 0.01
                    break
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0;
                    this.position.x = collison.position.x + collison.width + 0.01
                    break
                }
            }
        }
    }
}
