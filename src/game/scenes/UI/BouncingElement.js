export default class BouncingElement {
    constructor(element, bounceSpeed, bounceCap) {
        this.element = element;
        this.originalPos = element.y;
        this.bounceSpeed = bounceSpeed;
        this.bounceCap = bounceCap;
    }
    // 📝 Getters and setters ✨
    getElement() {
        return this.element;
    }
    setElement(element) {
        this.element = element;
    }

    getBounceSpeed() {
        return this.bounceSpeed;
    }
    setBounceSpeed(bounceSpeed) {
        this.bounceSpeed = bounceSpeed;
    }

    getBounceCap() {
        return this.bounceCap;
    }
    setBounceCap(bounceCap) {
        this.bounceCap = bounceCap;
    }

    // 🔄 Instance methods 🏀
    bounce() {
        // 🔼🔽 Bounce up and down in loop
        if ((this.element.y < this.bounceCap) || (this.bounceSpeed < 0 && this.element.y > this.originalPos)) {
            // 🔄 Change direction
            this.bounceSpeed *= -1;
        }
        this.element.setY(this.element.y - this.bounceSpeed);
    }
}