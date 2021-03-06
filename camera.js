import {projectionMatrix, modelMatrix, viewMatrix, gl} from "./webglstart.js";
import Component from "./scenegraph/component.js";
import {glMatrix} from "./gl-matrix/index.js";
import * as vec3 from "./gl-matrix/vec3.js";
import * as mat4 from "./gl-matrix/mat4.js";

export default class Camera extends Component {
    constructor(name, position, distance, upAxis) {
        super(name);
        this.position = position;
        this.distance = distance;
        this.upAxis = upAxis;

        if (this.upAxis == null) {
            this.upAxis = vec3.fromValues(0, 1.0, 0);
        }

        this.center = vec3.create();
        this.center[0] = this.position[0];
        this.center[1] = this.position[0];
        this.center[2] = this.position[0] + this.distance;

        this.transformation = mat4.create();
        mat4.lookAt(this.transformation, this.position, this.center, this.upAxis);

        this.fieldOfView = 60;
        this.aspectRatio = gl.viewportWidth / gl.viewportHeight;
        this.near = 0.1;
        this.far = 100;

        mat4.identity(modelMatrix);
        mat4.fromTranslation(viewMatrix, [0, 0, this.distance]);
        mat4.identity(projectionMatrix);
        mat4.mul(modelMatrix, modelMatrix, this.transformation);
    }

    draw() {
        mat4.perspective(projectionMatrix, glMatrix.toRadian(this.fieldOfView), this.aspectRatio, this.near, this.far);
    }

    moveProjection() {
        mat4.perspective(projectionMatrix, glMatrix.toRadian(this.fieldOfView), this.aspectRatio, this.near, this.far);
    }

}
