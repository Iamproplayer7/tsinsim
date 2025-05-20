export class Vector3 { 
    x: number = 0;
    y: number = 0;
    z: number = 0;

    constructor(...args: ([ (number | [number, number, number] | { x: number, y: number, z: number })?, number?, number? ])) {
        if(args.length === 3) {
            if(typeof args[0] == 'number' && typeof args[1] == 'number' && typeof args[2] == 'number') {
                this.x = args[0];
                this.y = args[1];
                this.z = args[2];
            }
        }
        else if(args.length === 1 && Array.isArray(args[0])) {
            this.x = args[0][0];
            this.y = args[0][1];
            this.z = args[0][2];
        }
        else if(args.length === 1 && !Array.isArray(args[0]) && typeof args[0] === 'object') {
            this.x = args[0].x;
            this.y = args[0].y;
            this.z = args[0].z;
        }

        return this;
    }

    public static clone(vector: Vector2 | Vector3) {
        if('z' in vector) {
            return new Vector3(vector.x, vector.y, vector.z);
        }

        return new Vector2(vector.x, vector.y);
    }

    public static cloneAsVector2(vector: Vector3) {
        return new Vector2(vector.x, vector.y);
    }

    set(x: number, y?: number, z?: number) {
        this.x = x;

        if(typeof y === 'number') { this.y = y; }
        if(typeof z === 'number') { this.z = z; }

        return this;
    }

    copy(vector: Vector2 | Vector3) {
        this.x = vector.x;
        this.y = vector.y;
        if('z' in vector) this.z = vector.z;

        return this;
    }

    clone() {
        return new Vector3(this.x, this.y, this.z);
    }

    cloneAsVector2() {
        return new Vector2(this.x, this.y);
    }

    add(value: number) {
        this.x += value;
        this.y += value;
        this.z += value;
        return this;
    }

    addX(value: number) { this.x += value; return this; }
    addY(value: number) { this.y += value; return this; }
    addZ(value: number) { this.z += value; return this; }

    sub(vector: Vector2  | Vector3) {
        this.x -= vector.x;
        this.y -= vector.y;
        if('z' in vector) this.z -= vector.z;

        return this;
    }

    subX(value: number) { this.x -= value; return this; }
    subY(value: number) { this.y -= value; return this; }
    subZ(value: number) { this.z -= value; return this; }

    mul(value: number) {
        this.x *= value;
        this.y *= value;
        this.z *= value;
        return this;
    }

    mulX(value: number) { this.x *= value; return this; }
    mulY(value: number) { this.y *= value; return this; }
    mulZ(value: number) { this.z *= value; return this; }

    div(value: number) {
        this.x = this.x/value;
        this.y = this.y/value;
        this.z = this.z/value;
        return this;
    }

    divX(value: number) { this.x /= value; return this; }
    divY(value: number) { this.y /= value; return this; }
    divZ(value: number) { this.z /= value; return this; }

    lengthSq() { 
        return this.x*this.x+this.y*this.y+this.z*this.z;
    }
    
    length() { 
        return Math.sqrt(this.lengthSq());
    }

    distanceTo(vector: Vector2 | Vector3) { 
        return Math.sqrt(this.distanceToSquared(vector));
    }

    distanceToSquared(vector: Vector2 | Vector3) { 
        return new Vector3(this).sub(vector).lengthSq();
    }
}

export class Vector2 { 
    x: number = 0;
    y: number = 0;

    constructor(...args: ([ (number | [number, number] | { x: number, y: number })?, number? ])) {
        if(args.length === 2) {
            if(typeof args[0] === 'number' && typeof args[1] === 'number') {
                this.x = args[0];
                this.y = args[1];
            }
        }
        else if(args.length === 1 && Array.isArray(args[0])) {
            this.x = args[0][0];
            this.y = args[0][1];
        }
        else if(args.length === 1 && !Array.isArray(args[0]) && typeof args[0] === 'object') {
            this.x = args[0].x;
            this.y = args[0].y;
        }

        return this;
    }

    public static clone(vector: Vector2 | Vector3) {
        if('z' in vector) {
            return new Vector3(vector.x, vector.y, vector.z);
        }

        return new Vector2(vector.x, vector.y);
    }

    public static cloneAsVector3(vector: Vector2) {
        return new Vector3(vector.x, vector.y, 0);
    }

    set(x: number, y?: number) {
        this.x = x;

        if(typeof y === 'number') { this.y = y; }

        return this;
    }

    copy(vector: Vector2 | Vector3) {
        this.x = vector.x;
        this.y = vector.y;

        return this;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    cloneAsVector3() {
        return new Vector3(this.x, this.y, 0);
    }

    add(value: number) {
        this.x += value;
        this.y += value;
        return this;
    }

    addX(value: number) { this.x += value; return this; }
    addY(value: number) { this.y += value; return this; }

    sub(vector: Vector2 | Vector3) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    subX(value: number) { this.x -= value; return this; }
    subY(value: number) { this.y -= value; return this; }

    mul(value: number) {
        this.x *= value;
        this.y *= value;
        return this;
    }

    mulX(value: number) { this.x *= value; return this; }
    mulY(value: number) { this.y *= value; return this; }

    div(value: number) {
        this.x /= value;
        this.y /= value;
        return this;
    }

    divX(value: number) { this.x /= value; return this; }
    divY(value: number) { this.y /= value; return this; }

    lengthSq() { 
        return this.x*this.x+this.y*this.y;
    }
    
    length() { 
        return Math.sqrt(this.lengthSq());
    }

    distanceTo(vector: Vector2 | Vector3) { 
        return Math.sqrt(this.distanceToSquared(vector));
    }

    distanceToSquared(vector: Vector2 | Vector3) { 
        return new Vector2(this).sub(vector).lengthSq();
    }
}