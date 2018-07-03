export class PanRecognizer {
    constructor(direction, threshold, maxAngle) {
        this.dirty = false;
        this.isPan = 0;
        const radians = maxAngle * (Math.PI / 180);
        this.isDirX = direction === 'x';
        this.maxCosine = Math.cos(radians);
        this.threshold = threshold * threshold;
    }
    start(x, y) {
        this.startX = x;
        this.startY = y;
        this.isPan = 0;
        this.dirty = true;
    }
    detect(x, y) {
        if (!this.dirty) {
            return false;
        }
        const deltaX = (x - this.startX);
        const deltaY = (y - this.startY);
        const distance = deltaX * deltaX + deltaY * deltaY;
        if (distance < this.threshold) {
            return false;
        }
        const hypotenuse = Math.sqrt(distance);
        const cosine = ((this.isDirX) ? deltaX : deltaY) / hypotenuse;
        if (cosine > this.maxCosine) {
            this.isPan = 1;
        }
        else if (cosine < -this.maxCosine) {
            this.isPan = -1;
        }
        else {
            this.isPan = 0;
        }
        this.dirty = false;
        return true;
    }
    isGesture() {
        return this.isPan !== 0;
    }
    getDirection() {
        return this.isPan;
    }
}
