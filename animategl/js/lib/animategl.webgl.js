/*!
 * AnimateGL animategl.webgl.js includes:
 * OGL 0.0.90 | Nathan Gordon | Unlicense | https://github.com/oframe/ogl
 * See NOTICES.md for the licence texts.
 */
"use strict";
(self["animateglChunks"] = self["animateglChunks"] || []).push([[88],{

/***/ 243:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "MAX_DPR": () => (/* binding */ MAX_DPR),
  "attach": () => (/* binding */ attach)
});

;// CONCATENATED MODULE: ./node_modules/ogl/src/math/functions/Vec3Func.js
const EPSILON = 0.000001;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
function Vec3Func_length(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
}

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
function set(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
}

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
}

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
}

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
}

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
function scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
}

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
function distance(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];
    return Math.sqrt(x * x + y * y + z * z);
}

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
function squaredDistance(a, b) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    let z = b[2] - a[2];
    return x * x + y * y + z * z;
}

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function squaredLength(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    return x * x + y * y + z * z;
}

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
function negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
}

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
function inverse(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    out[2] = 1.0 / a[2];
    return out;
}

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
function normalize(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let len = x * x + y * y + z * z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
    }
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
    return out;
}

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
function cross(out, a, b) {
    let ax = a[0],
        ay = a[1],
        az = a[2];
    let bx = b[0],
        by = b[1],
        bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
}

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
function lerp(out, a, b, t) {
    let ax = a[0];
    let ay = a[1];
    let az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
}

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
function transformMat4(out, a, m) {
    let x = a[0],
        y = a[1],
        z = a[2];
    let w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
}

/**
 * Same as above but doesn't apply translation.
 * Useful for rays.
 */
function scaleRotateMat4(out, a, m) {
    let x = a[0],
        y = a[1],
        z = a[2];
    let w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z) / w;
    return out;
}

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat3} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
function transformMat3(out, a, m) {
    let x = a[0],
        y = a[1],
        z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
}

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
function transformQuat(out, a, q) {
    // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed

    let x = a[0],
        y = a[1],
        z = a[2];
    let qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3];

    let uvx = qy * z - qz * y;
    let uvy = qz * x - qx * z;
    let uvz = qx * y - qy * x;

    let uuvx = qy * uvz - qz * uvy;
    let uuvy = qz * uvx - qx * uvz;
    let uuvz = qx * uvy - qy * uvx;

    let w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2;

    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2;

    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
}

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
const angle = (function () {
    const tempA = [0, 0, 0];
    const tempB = [0, 0, 0];

    return function (a, b) {
        copy(tempA, a);
        copy(tempB, b);

        normalize(tempA, tempA);
        normalize(tempB, tempB);

        let cosine = dot(tempA, tempB);

        if (cosine > 1.0) {
            return 0;
        } else if (cosine < -1.0) {
            return Math.PI;
        } else {
            return Math.acos(cosine);
        }
    };
})();

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/math/Vec3.js


class Vec3 extends Array {
    constructor(x = 0, y = x, z = x) {
        super(x, y, z);
        return this;
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    get z() {
        return this[2];
    }

    set x(v) {
        this[0] = v;
    }

    set y(v) {
        this[1] = v;
    }

    set z(v) {
        this[2] = v;
    }

    set(x, y = x, z = x) {
        if (x.length) return this.copy(x);
        set(this, x, y, z);
        return this;
    }

    copy(v) {
        copy(this, v);
        return this;
    }

    add(va, vb) {
        if (vb) add(this, va, vb);
        else add(this, this, va);
        return this;
    }

    sub(va, vb) {
        if (vb) subtract(this, va, vb);
        else subtract(this, this, va);
        return this;
    }

    multiply(v) {
        if (v.length) multiply(this, this, v);
        else scale(this, this, v);
        return this;
    }

    divide(v) {
        if (v.length) divide(this, this, v);
        else scale(this, this, 1 / v);
        return this;
    }

    inverse(v = this) {
        inverse(this, v);
        return this;
    }

    // Can't use 'length' as Array.prototype uses it
    len() {
        return Vec3Func_length(this);
    }

    distance(v) {
        if (v) return distance(this, v);
        else return Vec3Func_length(this);
    }

    squaredLen() {
        return squaredLength(this);
    }

    squaredDistance(v) {
        if (v) return squaredDistance(this, v);
        else return squaredLength(this);
    }

    negate(v = this) {
        negate(this, v);
        return this;
    }

    cross(va, vb) {
        if (vb) cross(this, va, vb);
        else cross(this, this, va);
        return this;
    }

    scale(v) {
        scale(this, this, v);
        return this;
    }

    normalize() {
        normalize(this, this);
        return this;
    }

    dot(v) {
        return dot(this, v);
    }

    equals(v) {
        return exactEquals(this, v);
    }

    applyMatrix3(mat3) {
        transformMat3(this, this, mat3);
        return this;
    }

    applyMatrix4(mat4) {
        transformMat4(this, this, mat4);
        return this;
    }

    scaleRotateMatrix4(mat4) {
        scaleRotateMat4(this, this, mat4);
        return this;
    }

    applyQuaternion(q) {
        transformQuat(this, this, q);
        return this;
    }

    angle(v) {
        return angle(this, v);
    }

    lerp(v, t) {
        lerp(this, this, v, t);
        return this;
    }

    clone() {
        return new Vec3(this[0], this[1], this[2]);
    }

    fromArray(a, o = 0) {
        this[0] = a[o];
        this[1] = a[o + 1];
        this[2] = a[o + 2];
        return this;
    }

    toArray(a = [], o = 0) {
        a[o] = this[0];
        a[o + 1] = this[1];
        a[o + 2] = this[2];
        return a;
    }

    transformDirection(mat4) {
        const x = this[0];
        const y = this[1];
        const z = this[2];

        this[0] = mat4[0] * x + mat4[4] * y + mat4[8] * z;
        this[1] = mat4[1] * x + mat4[5] * y + mat4[9] * z;
        this[2] = mat4[2] * x + mat4[6] * y + mat4[10] * z;

        return this.normalize();
    }
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/core/Renderer.js


// TODO: Handle context loss https://www.khronos.org/webgl/wiki/HandlingContextLost

// Not automatic - devs to use these methods manually
// gl.colorMask( colorMask, colorMask, colorMask, colorMask );
// gl.clearColor( r, g, b, a );
// gl.stencilMask( stencilMask );
// gl.stencilFunc( stencilFunc, stencilRef, stencilMask );
// gl.stencilOp( stencilFail, stencilZFail, stencilZPass );
// gl.clearStencil( stencil );

const tempVec3 = new Vec3();
let ID = 1;

class Renderer {
    constructor({
        canvas = document.createElement('canvas'),
        width = 300,
        height = 150,
        dpr = 1,
        alpha = false,
        depth = true,
        stencil = false,
        antialias = false,
        premultipliedAlpha = false,
        preserveDrawingBuffer = false,
        powerPreference = 'default',
        autoClear = true,
        webgl = 2,
    } = {}) {
        const attributes = { alpha, depth, stencil, antialias, premultipliedAlpha, preserveDrawingBuffer, powerPreference };
        this.dpr = dpr;
        this.alpha = alpha;
        this.color = true;
        this.depth = depth;
        this.stencil = stencil;
        this.premultipliedAlpha = premultipliedAlpha;
        this.autoClear = autoClear;
        this.id = ID++;

        // Attempt WebGL2 unless forced to 1, if not supported fallback to WebGL1
        if (webgl === 2) this.gl = canvas.getContext('webgl2', attributes);
        this.isWebgl2 = !!this.gl;
        if (!this.gl) this.gl = canvas.getContext('webgl', attributes);
        if (!this.gl) console.error('unable to create webgl context');

        // Attach renderer to gl so that all classes have access to internal state functions
        this.gl.renderer = this;

        // initialise size values
        this.setSize(width, height);

        // gl state stores to avoid redundant calls on methods used internally
        this.state = {};
        this.state.blendFunc = { src: this.gl.ONE, dst: this.gl.ZERO };
        this.state.blendEquation = { modeRGB: this.gl.FUNC_ADD };
        this.state.cullFace = null;
        this.state.frontFace = this.gl.CCW;
        this.state.depthMask = true;
        this.state.depthFunc = this.gl.LESS;
        this.state.premultiplyAlpha = false;
        this.state.flipY = false;
        this.state.unpackAlignment = 4;
        this.state.framebuffer = null;
        this.state.viewport = { x: 0, y: 0, width: null, height: null };
        this.state.textureUnits = [];
        this.state.activeTextureUnit = 0;
        this.state.boundBuffer = null;
        this.state.uniformLocations = new Map();

        // store requested extensions
        this.extensions = {};

        // Initialise extra format types
        if (this.isWebgl2) {
            this.getExtension('EXT_color_buffer_float');
            this.getExtension('OES_texture_float_linear');
        } else {
            this.getExtension('OES_texture_float');
            this.getExtension('OES_texture_float_linear');
            this.getExtension('OES_texture_half_float');
            this.getExtension('OES_texture_half_float_linear');
            this.getExtension('OES_element_index_uint');
            this.getExtension('OES_standard_derivatives');
            this.getExtension('EXT_sRGB');
            this.getExtension('WEBGL_depth_texture');
            this.getExtension('WEBGL_draw_buffers');
        }
        this.getExtension('WEBGL_compressed_texture_astc');
        this.getExtension('EXT_texture_compression_bptc');
        this.getExtension('WEBGL_compressed_texture_s3tc');
        this.getExtension('WEBGL_compressed_texture_etc1');
        this.getExtension('WEBGL_compressed_texture_pvrtc');
        this.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc');

        // Create method aliases using extension (WebGL1) or native if available (WebGL2)
        this.vertexAttribDivisor = this.getExtension('ANGLE_instanced_arrays', 'vertexAttribDivisor', 'vertexAttribDivisorANGLE');
        this.drawArraysInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawArraysInstanced', 'drawArraysInstancedANGLE');
        this.drawElementsInstanced = this.getExtension('ANGLE_instanced_arrays', 'drawElementsInstanced', 'drawElementsInstancedANGLE');
        this.createVertexArray = this.getExtension('OES_vertex_array_object', 'createVertexArray', 'createVertexArrayOES');
        this.bindVertexArray = this.getExtension('OES_vertex_array_object', 'bindVertexArray', 'bindVertexArrayOES');
        this.deleteVertexArray = this.getExtension('OES_vertex_array_object', 'deleteVertexArray', 'deleteVertexArrayOES');
        this.drawBuffers = this.getExtension('WEBGL_draw_buffers', 'drawBuffers', 'drawBuffersWEBGL');

        // Store device parameters
        this.parameters = {};
        this.parameters.maxTextureUnits = this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
        this.parameters.maxAnisotropy = this.getExtension('EXT_texture_filter_anisotropic')
            ? this.gl.getParameter(this.getExtension('EXT_texture_filter_anisotropic').MAX_TEXTURE_MAX_ANISOTROPY_EXT)
            : 0;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height;

        this.gl.canvas.width = width * this.dpr;
        this.gl.canvas.height = height * this.dpr;

        Object.assign(this.gl.canvas.style, {
            width: width + 'px',
            height: height + 'px',
        });
    }

    setViewport(width, height, x = 0, y = 0) {
        if (this.state.viewport.width === width && this.state.viewport.height === height) return;
        this.state.viewport.width = width;
        this.state.viewport.height = height;
        this.state.viewport.x = x;
        this.state.viewport.y = y;
        this.gl.viewport(x, y, width, height);
    }

    setScissor(width, height, x = 0, y = 0) {
        this.gl.scissor(x, y, width, height);
    }

    enable(id) {
        if (this.state[id] === true) return;
        this.gl.enable(id);
        this.state[id] = true;
    }

    disable(id) {
        if (this.state[id] === false) return;
        this.gl.disable(id);
        this.state[id] = false;
    }

    setBlendFunc(src, dst, srcAlpha, dstAlpha) {
        if (
            this.state.blendFunc.src === src &&
            this.state.blendFunc.dst === dst &&
            this.state.blendFunc.srcAlpha === srcAlpha &&
            this.state.blendFunc.dstAlpha === dstAlpha
        )
            return;
        this.state.blendFunc.src = src;
        this.state.blendFunc.dst = dst;
        this.state.blendFunc.srcAlpha = srcAlpha;
        this.state.blendFunc.dstAlpha = dstAlpha;
        if (srcAlpha !== undefined) this.gl.blendFuncSeparate(src, dst, srcAlpha, dstAlpha);
        else this.gl.blendFunc(src, dst);
    }

    setBlendEquation(modeRGB, modeAlpha) {
        modeRGB = modeRGB || this.gl.FUNC_ADD;
        if (this.state.blendEquation.modeRGB === modeRGB && this.state.blendEquation.modeAlpha === modeAlpha) return;
        this.state.blendEquation.modeRGB = modeRGB;
        this.state.blendEquation.modeAlpha = modeAlpha;
        if (modeAlpha !== undefined) this.gl.blendEquationSeparate(modeRGB, modeAlpha);
        else this.gl.blendEquation(modeRGB);
    }

    setCullFace(value) {
        if (this.state.cullFace === value) return;
        this.state.cullFace = value;
        this.gl.cullFace(value);
    }

    setFrontFace(value) {
        if (this.state.frontFace === value) return;
        this.state.frontFace = value;
        this.gl.frontFace(value);
    }

    setDepthMask(value) {
        if (this.state.depthMask === value) return;
        this.state.depthMask = value;
        this.gl.depthMask(value);
    }

    setDepthFunc(value) {
        if (this.state.depthFunc === value) return;
        this.state.depthFunc = value;
        this.gl.depthFunc(value);
    }

    activeTexture(value) {
        if (this.state.activeTextureUnit === value) return;
        this.state.activeTextureUnit = value;
        this.gl.activeTexture(this.gl.TEXTURE0 + value);
    }

    bindFramebuffer({ target = this.gl.FRAMEBUFFER, buffer = null } = {}) {
        if (this.state.framebuffer === buffer) return;
        this.state.framebuffer = buffer;
        this.gl.bindFramebuffer(target, buffer);
    }

    getExtension(extension, webgl2Func, extFunc) {
        // if webgl2 function supported, return func bound to gl context
        if (webgl2Func && this.gl[webgl2Func]) return this.gl[webgl2Func].bind(this.gl);

        // fetch extension once only
        if (!this.extensions[extension]) {
            this.extensions[extension] = this.gl.getExtension(extension);
        }

        // return extension if no function requested
        if (!webgl2Func) return this.extensions[extension];

        // Return null if extension not supported
        if (!this.extensions[extension]) return null;

        // return extension function, bound to extension
        return this.extensions[extension][extFunc].bind(this.extensions[extension]);
    }

    sortOpaque(a, b) {
        if (a.renderOrder !== b.renderOrder) {
            return a.renderOrder - b.renderOrder;
        } else if (a.program.id !== b.program.id) {
            return a.program.id - b.program.id;
        } else if (a.zDepth !== b.zDepth) {
            return a.zDepth - b.zDepth;
        } else {
            return b.id - a.id;
        }
    }

    sortTransparent(a, b) {
        if (a.renderOrder !== b.renderOrder) {
            return a.renderOrder - b.renderOrder;
        }
        if (a.zDepth !== b.zDepth) {
            return b.zDepth - a.zDepth;
        } else {
            return b.id - a.id;
        }
    }

    sortUI(a, b) {
        if (a.renderOrder !== b.renderOrder) {
            return a.renderOrder - b.renderOrder;
        } else if (a.program.id !== b.program.id) {
            return a.program.id - b.program.id;
        } else {
            return b.id - a.id;
        }
    }

    getRenderList({ scene, camera, frustumCull, sort }) {
        let renderList = [];

        if (camera && frustumCull) camera.updateFrustum();

        // Get visible
        scene.traverse((node) => {
            if (!node.visible) return true;
            if (!node.draw) return;

            if (frustumCull && node.frustumCulled && camera) {
                if (!camera.frustumIntersectsMesh(node)) return;
            }

            renderList.push(node);
        });

        if (sort) {
            const opaque = [];
            const transparent = []; // depthTest true
            const ui = []; // depthTest false

            renderList.forEach((node) => {
                // Split into the 3 render groups
                if (!node.program.transparent) {
                    opaque.push(node);
                } else if (node.program.depthTest) {
                    transparent.push(node);
                } else {
                    ui.push(node);
                }

                node.zDepth = 0;

                // Only calculate z-depth if renderOrder unset and depthTest is true
                if (node.renderOrder !== 0 || !node.program.depthTest || !camera) return;

                // update z-depth
                node.worldMatrix.getTranslation(tempVec3);
                tempVec3.applyMatrix4(camera.projectionViewMatrix);
                node.zDepth = tempVec3.z;
            });

            opaque.sort(this.sortOpaque);
            transparent.sort(this.sortTransparent);
            ui.sort(this.sortUI);

            renderList = opaque.concat(transparent, ui);
        }

        return renderList;
    }

    render({ scene, camera, target = null, update = true, sort = true, frustumCull = true, clear }) {
        if (target === null) {
            // make sure no render target bound so draws to canvas
            this.bindFramebuffer();
            this.setViewport(this.width * this.dpr, this.height * this.dpr);
        } else {
            // bind supplied render target and update viewport
            this.bindFramebuffer(target);
            this.setViewport(target.width, target.height);
        }

        if (clear || (this.autoClear && clear !== false)) {
            // Ensure depth buffer writing is enabled so it can be cleared
            if (this.depth && (!target || target.depth)) {
                this.enable(this.gl.DEPTH_TEST);
                this.setDepthMask(true);
            }
            this.gl.clear(
                (this.color ? this.gl.COLOR_BUFFER_BIT : 0) |
                    (this.depth ? this.gl.DEPTH_BUFFER_BIT : 0) |
                    (this.stencil ? this.gl.STENCIL_BUFFER_BIT : 0)
            );
        }

        // updates all scene graph matrices
        if (update) scene.updateMatrixWorld();

        // Update camera separately, in case not in scene graph
        if (camera) camera.updateMatrixWorld();

        // Get render list - entails culling and sorting
        const renderList = this.getRenderList({ scene, camera, frustumCull, sort });

        renderList.forEach((node) => {
            node.draw({ camera });
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/math/functions/Vec4Func.js
const Vec4Func_EPSILON = 0.000001;

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
function Vec4Func_copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
}

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
function Vec4Func_set(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
}

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
function Vec4Func_add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
}

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
function Vec4Func_scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
}

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
function Vec4Func_length(a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let w = a[3];
    return Math.sqrt(x * x + y * y + z * z + w * w);
}

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
function Vec4Func_normalize(out, a) {
    let x = a[0];
    let y = a[1];
    let z = a[2];
    let w = a[3];
    let len = x * x + y * y + z * z + w * w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
    }
    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
    return out;
}

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
function Vec4Func_dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
function Vec4Func_lerp(out, a, b, t) {
    let ax = a[0];
    let ay = a[1];
    let az = a[2];
    let aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/math/functions/QuatFunc.js


/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
function identity(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
}

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    let s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
}

/**
 * Multiplies two quats
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
function QuatFunc_multiply(out, a, b) {
    let ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    let bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
}

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateX(out, a, rad) {
    rad *= 0.5;

    let ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    let bx = Math.sin(rad),
        bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
}

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateY(out, a, rad) {
    rad *= 0.5;

    let ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    let by = Math.sin(rad),
        bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
}

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
function rotateZ(out, a, rad) {
    rad *= 0.5;

    let ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    let bz = Math.sin(rad),
        bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
}

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
function slerp(out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    let ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    let bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];

    let omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if (cosom < 0.0) {
        cosom = -cosom;
        bx = -bx;
        by = -by;
        bz = -bz;
        bw = -bw;
    }
    // calculate coefficients
    if (1.0 - cosom > 0.000001) {
        // standard case (slerp)
        omega = Math.acos(cosom);
        sinom = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {
        // "from" and "to" quaternions are very close
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;

    return out;
}

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
function invert(out, a) {
    let a0 = a[0],
        a1 = a[1],
        a2 = a[2],
        a3 = a[3];
    let dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    let invDot = dot ? 1.0 / dot : 0;

    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0 * invDot;
    out[1] = -a1 * invDot;
    out[2] = -a2 * invDot;
    out[3] = a3 * invDot;
    return out;
}

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
function conjugate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
}

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
function fromMat3(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    let fTrace = m[0] + m[4] + m[8];
    let fRoot;

    if (fTrace > 0.0) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0); // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot; // 1/(4w)
        out[0] = (m[5] - m[7]) * fRoot;
        out[1] = (m[6] - m[2]) * fRoot;
        out[2] = (m[1] - m[3]) * fRoot;
    } else {
        // |w| <= 1/2
        let i = 0;
        if (m[4] > m[0]) i = 1;
        if (m[8] > m[i * 3 + i]) i = 2;
        let j = (i + 1) % 3;
        let k = (i + 2) % 3;

        fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
        out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
        out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }

    return out;
}

/**
 * Creates a quaternion from the given euler angle x, y, z.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} euler Angles to rotate around each axis in degrees.
 * @param {String} order detailing order of operations. Default 'XYZ'.
 * @returns {quat} out
 * @function
 */
function fromEuler(out, euler, order = 'YXZ') {
    let sx = Math.sin(euler[0] * 0.5);
    let cx = Math.cos(euler[0] * 0.5);
    let sy = Math.sin(euler[1] * 0.5);
    let cy = Math.cos(euler[1] * 0.5);
    let sz = Math.sin(euler[2] * 0.5);
    let cz = Math.cos(euler[2] * 0.5);

    if (order === 'XYZ') {
        out[0] = sx * cy * cz + cx * sy * sz;
        out[1] = cx * sy * cz - sx * cy * sz;
        out[2] = cx * cy * sz + sx * sy * cz;
        out[3] = cx * cy * cz - sx * sy * sz;
    } else if (order === 'YXZ') {
        out[0] = sx * cy * cz + cx * sy * sz;
        out[1] = cx * sy * cz - sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
    } else if (order === 'ZXY') {
        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz + sx * sy * cz;
        out[3] = cx * cy * cz - sx * sy * sz;
    } else if (order === 'ZYX') {
        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
    } else if (order === 'YZX') {
        out[0] = sx * cy * cz + cx * sy * sz;
        out[1] = cx * sy * cz + sx * cy * sz;
        out[2] = cx * cy * sz - sx * sy * cz;
        out[3] = cx * cy * cz - sx * sy * sz;
    } else if (order === 'XZY') {
        out[0] = sx * cy * cz - cx * sy * sz;
        out[1] = cx * sy * cz - sx * cy * sz;
        out[2] = cx * cy * sz + sx * sy * cz;
        out[3] = cx * cy * cz + sx * sy * sz;
    }

    return out;
}

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
const QuatFunc_copy = Vec4Func_copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
const QuatFunc_set = Vec4Func_set;

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
const QuatFunc_add = Vec4Func_add;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
const QuatFunc_scale = Vec4Func_scale;

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
const QuatFunc_dot = Vec4Func_dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
const QuatFunc_lerp = Vec4Func_lerp;

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 */
const QuatFunc_length = Vec4Func_length;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
const QuatFunc_normalize = Vec4Func_normalize;

;// CONCATENATED MODULE: ./node_modules/ogl/src/math/Quat.js


class Quat extends Array {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        super(x, y, z, w);
        this.onChange = () => {};
        return this;
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    get z() {
        return this[2];
    }

    get w() {
        return this[3];
    }

    set x(v) {
        this[0] = v;
        this.onChange();
    }

    set y(v) {
        this[1] = v;
        this.onChange();
    }

    set z(v) {
        this[2] = v;
        this.onChange();
    }

    set w(v) {
        this[3] = v;
        this.onChange();
    }

    identity() {
        identity(this);
        this.onChange();
        return this;
    }

    set(x, y, z, w) {
        if (x.length) return this.copy(x);
        QuatFunc_set(this, x, y, z, w);
        this.onChange();
        return this;
    }

    rotateX(a) {
        rotateX(this, this, a);
        this.onChange();
        return this;
    }

    rotateY(a) {
        rotateY(this, this, a);
        this.onChange();
        return this;
    }

    rotateZ(a) {
        rotateZ(this, this, a);
        this.onChange();
        return this;
    }

    inverse(q = this) {
        invert(this, q);
        this.onChange();
        return this;
    }

    conjugate(q = this) {
        conjugate(this, q);
        this.onChange();
        return this;
    }

    copy(q) {
        QuatFunc_copy(this, q);
        this.onChange();
        return this;
    }

    normalize(q = this) {
        QuatFunc_normalize(this, q);
        this.onChange();
        return this;
    }

    multiply(qA, qB) {
        if (qB) {
            QuatFunc_multiply(this, qA, qB);
        } else {
            QuatFunc_multiply(this, this, qA);
        }
        this.onChange();
        return this;
    }

    dot(v) {
        return QuatFunc_dot(this, v);
    }

    fromMatrix3(matrix3) {
        fromMat3(this, matrix3);
        this.onChange();
        return this;
    }

    fromEuler(euler) {
        fromEuler(this, euler, euler.order);
        return this;
    }

    fromAxisAngle(axis, a) {
        setAxisAngle(this, axis, a);
        return this;
    }

    slerp(q, t) {
        slerp(this, this, q, t);
        return this;
    }

    fromArray(a, o = 0) {
        this[0] = a[o];
        this[1] = a[o + 1];
        this[2] = a[o + 2];
        this[3] = a[o + 3];
        return this;
    }

    toArray(a = [], o = 0) {
        a[o] = this[0];
        a[o + 1] = this[1];
        a[o + 2] = this[2];
        a[o + 3] = this[3];
        return a;
    }
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/math/functions/Mat4Func.js
const Mat4Func_EPSILON = 0.000001;

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function Mat4Func_copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
}

/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function Mat4Func_set(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
}

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
function Mat4Func_identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        let a01 = a[1],
            a02 = a[2],
            a03 = a[3];
        let a12 = a[6],
            a13 = a[7];
        let a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }

    return out;
}

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
function Mat4Func_invert(out, a) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    let a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    let a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    let a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
}

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
function determinant(a) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    let a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    let a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    let a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
}

/**
 * Multiplies two mat4s
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function Mat4Func_multiply(out, a, b) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    let a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    let a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    let a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    // Cache only the current line of the second matrix
    let b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
}

/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
function translate(out, a, v) {
    let x = v[0],
        y = v[1],
        z = v[2];
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];

        out[0] = a00;
        out[1] = a01;
        out[2] = a02;
        out[3] = a03;
        out[4] = a10;
        out[5] = a11;
        out[6] = a12;
        out[7] = a13;
        out[8] = a20;
        out[9] = a21;
        out[10] = a22;
        out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
}

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
function Mat4Func_scale(out, a, v) {
    let x = v[0],
        y = v[1],
        z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
}

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
function rotate(out, a, rad, axis) {
    let x = axis[0],
        y = axis[1],
        z = axis[2];
    let len = Math.hypot(x, y, z);
    let s, c, t;
    let a00, a01, a02, a03;
    let a10, a11, a12, a13;
    let a20, a21, a22, a23;
    let b00, b01, b02;
    let b10, b11, b12;
    let b20, b21, b22;

    if (Math.abs(len) < Mat4Func_EPSILON) {
        return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) {
        // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
}

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
function getTranslation(out, mat) {
    out[0] = mat[12];
    out[1] = mat[13];
    out[2] = mat[14];

    return out;
}

/**
 * Returns the scaling factor component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslationScale
 *  with a normalized Quaternion paramter, the returned vector will be
 *  the same as the scaling vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive scaling factor component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
function getScaling(out, mat) {
    let m11 = mat[0];
    let m12 = mat[1];
    let m13 = mat[2];
    let m21 = mat[4];
    let m22 = mat[5];
    let m23 = mat[6];
    let m31 = mat[8];
    let m32 = mat[9];
    let m33 = mat[10];

    out[0] = Math.hypot(m11, m12, m13);
    out[1] = Math.hypot(m21, m22, m23);
    out[2] = Math.hypot(m31, m32, m33);

    return out;
}

function getMaxScaleOnAxis(mat) {
    let m11 = mat[0];
    let m12 = mat[1];
    let m13 = mat[2];
    let m21 = mat[4];
    let m22 = mat[5];
    let m23 = mat[6];
    let m31 = mat[8];
    let m32 = mat[9];
    let m33 = mat[10];

    const x = m11 * m11 + m12 * m12 + m13 * m13;
    const y = m21 * m21 + m22 * m22 + m23 * m23;
    const z = m31 * m31 + m32 * m32 + m33 * m33;

    return Math.sqrt(Math.max(x, y, z));
}

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
const getRotation = (function () {
    const temp = [0, 0, 0];

    return function (out, mat) {
        let scaling = temp;
        getScaling(scaling, mat);

        let is1 = 1 / scaling[0];
        let is2 = 1 / scaling[1];
        let is3 = 1 / scaling[2];

        let sm11 = mat[0] * is1;
        let sm12 = mat[1] * is2;
        let sm13 = mat[2] * is3;
        let sm21 = mat[4] * is1;
        let sm22 = mat[5] * is2;
        let sm23 = mat[6] * is3;
        let sm31 = mat[8] * is1;
        let sm32 = mat[9] * is2;
        let sm33 = mat[10] * is3;

        let trace = sm11 + sm22 + sm33;
        let S = 0;

        if (trace > 0) {
            S = Math.sqrt(trace + 1.0) * 2;
            out[3] = 0.25 * S;
            out[0] = (sm23 - sm32) / S;
            out[1] = (sm31 - sm13) / S;
            out[2] = (sm12 - sm21) / S;
        } else if (sm11 > sm22 && sm11 > sm33) {
            S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
            out[3] = (sm23 - sm32) / S;
            out[0] = 0.25 * S;
            out[1] = (sm12 + sm21) / S;
            out[2] = (sm31 + sm13) / S;
        } else if (sm22 > sm33) {
            S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
            out[3] = (sm31 - sm13) / S;
            out[0] = (sm12 + sm21) / S;
            out[1] = 0.25 * S;
            out[2] = (sm23 + sm32) / S;
        } else {
            S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
            out[3] = (sm12 - sm21) / S;
            out[0] = (sm31 + sm13) / S;
            out[1] = (sm23 + sm32) / S;
            out[2] = 0.25 * S;
        }

        return out;
    };
})();

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     let quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
function fromRotationTranslationScale(out, q, v, s) {
    // Quaternion math
    let x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let xy = x * y2;
    let xz = x * z2;
    let yy = y * y2;
    let yz = y * z2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;
    let sx = s[0];
    let sy = s[1];
    let sz = s[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
}

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */
function fromQuat(out, q) {
    let x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let yx = y * x2;
    let yy = y * y2;
    let zx = z * x2;
    let zy = z * y2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
}

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function perspective(out, fovy, aspect, near, far) {
    let f = 1.0 / Math.tan(fovy / 2);
    let nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = 2 * far * near * nf;
    out[15] = 0;
    return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
function ortho(out, left, right, bottom, top, near, far) {
    let lr = 1 / (left - right);
    let bt = 1 / (bottom - top);
    let nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
}

/**
 * Generates a matrix that makes something look at something else.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} target Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
function targetTo(out, eye, target, up) {
    let eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2];

    let z0 = eyex - target[0],
        z1 = eyey - target[1],
        z2 = eyez - target[2];

    let len = z0 * z0 + z1 * z1 + z2 * z2;
    if (len === 0) {
        // eye and target are in the same position
        z2 = 1;
    } else {
        len = 1 / Math.sqrt(len);
        z0 *= len;
        z1 *= len;
        z2 *= len;
    }

    let x0 = upy * z2 - upz * z1,
        x1 = upz * z0 - upx * z2,
        x2 = upx * z1 - upy * z0;

    len = x0 * x0 + x1 * x1 + x2 * x2;
    if (len === 0) {
        // up and z are parallel
        if (upz) {
            upx += 1e-6;
        } else if (upy) {
            upz += 1e-6;
        } else {
            upy += 1e-6;
        }
        (x0 = upy * z2 - upz * z1), (x1 = upz * z0 - upx * z2), (x2 = upx * z1 - upy * z0);

        len = x0 * x0 + x1 * x1 + x2 * x2;
    }

    len = 1 / Math.sqrt(len);
    x0 *= len;
    x1 *= len;
    x2 *= len;

    out[0] = x0;
    out[1] = x1;
    out[2] = x2;
    out[3] = 0;
    out[4] = z1 * x2 - z2 * x1;
    out[5] = z2 * x0 - z0 * x2;
    out[6] = z0 * x1 - z1 * x0;
    out[7] = 0;
    out[8] = z0;
    out[9] = z1;
    out[10] = z2;
    out[11] = 0;
    out[12] = eyex;
    out[13] = eyey;
    out[14] = eyez;
    out[15] = 1;
    return out;
}

/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function Mat4Func_add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
function Mat4Func_subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */
function multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/math/Mat4.js


class Mat4 extends Array {
    constructor(
        m00 = 1,
        m01 = 0,
        m02 = 0,
        m03 = 0,
        m10 = 0,
        m11 = 1,
        m12 = 0,
        m13 = 0,
        m20 = 0,
        m21 = 0,
        m22 = 1,
        m23 = 0,
        m30 = 0,
        m31 = 0,
        m32 = 0,
        m33 = 1
    ) {
        super(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
        return this;
    }

    get x() {
        return this[12];
    }

    get y() {
        return this[13];
    }

    get z() {
        return this[14];
    }

    get w() {
        return this[15];
    }

    set x(v) {
        this[12] = v;
    }

    set y(v) {
        this[13] = v;
    }

    set z(v) {
        this[14] = v;
    }

    set w(v) {
        this[15] = v;
    }

    set(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
        if (m00.length) return this.copy(m00);
        Mat4Func_set(this, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33);
        return this;
    }

    translate(v, m = this) {
        translate(this, m, v);
        return this;
    }

    rotate(v, axis, m = this) {
        rotate(this, m, v, axis);
        return this;
    }

    scale(v, m = this) {
        Mat4Func_scale(this, m, typeof v === 'number' ? [v, v, v] : v);
        return this;
    }

    multiply(ma, mb) {
        if (mb) {
            Mat4Func_multiply(this, ma, mb);
        } else {
            Mat4Func_multiply(this, this, ma);
        }
        return this;
    }

    identity() {
        Mat4Func_identity(this);
        return this;
    }

    copy(m) {
        Mat4Func_copy(this, m);
        return this;
    }

    fromPerspective({ fov, aspect, near, far } = {}) {
        perspective(this, fov, aspect, near, far);
        return this;
    }

    fromOrthogonal({ left, right, bottom, top, near, far }) {
        ortho(this, left, right, bottom, top, near, far);
        return this;
    }

    fromQuaternion(q) {
        fromQuat(this, q);
        return this;
    }

    setPosition(v) {
        this.x = v[0];
        this.y = v[1];
        this.z = v[2];
        return this;
    }

    inverse(m = this) {
        Mat4Func_invert(this, m);
        return this;
    }

    compose(q, pos, scale) {
        fromRotationTranslationScale(this, q, pos, scale);
        return this;
    }

    getRotation(q) {
        getRotation(q, this);
        return this;
    }

    getTranslation(pos) {
        getTranslation(pos, this);
        return this;
    }

    getScaling(scale) {
        getScaling(scale, this);
        return this;
    }

    getMaxScaleOnAxis() {
        return getMaxScaleOnAxis(this);
    }

    lookAt(eye, target, up) {
        targetTo(this, eye, target, up);
        return this;
    }

    determinant() {
        return determinant(this);
    }

    fromArray(a, o = 0) {
        this[0] = a[o];
        this[1] = a[o + 1];
        this[2] = a[o + 2];
        this[3] = a[o + 3];
        this[4] = a[o + 4];
        this[5] = a[o + 5];
        this[6] = a[o + 6];
        this[7] = a[o + 7];
        this[8] = a[o + 8];
        this[9] = a[o + 9];
        this[10] = a[o + 10];
        this[11] = a[o + 11];
        this[12] = a[o + 12];
        this[13] = a[o + 13];
        this[14] = a[o + 14];
        this[15] = a[o + 15];
        return this;
    }

    toArray(a = [], o = 0) {
        a[o] = this[0];
        a[o + 1] = this[1];
        a[o + 2] = this[2];
        a[o + 3] = this[3];
        a[o + 4] = this[4];
        a[o + 5] = this[5];
        a[o + 6] = this[6];
        a[o + 7] = this[7];
        a[o + 8] = this[8];
        a[o + 9] = this[9];
        a[o + 10] = this[10];
        a[o + 11] = this[11];
        a[o + 12] = this[12];
        a[o + 13] = this[13];
        a[o + 14] = this[14];
        a[o + 15] = this[15];
        return a;
    }
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/math/functions/EulerFunc.js
// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
function fromRotationMatrix(out, m, order = 'YXZ') {
    if (order === 'XYZ') {
        out[1] = Math.asin(Math.min(Math.max(m[8], -1), 1));
        if (Math.abs(m[8]) < 0.99999) {
            out[0] = Math.atan2(-m[9], m[10]);
            out[2] = Math.atan2(-m[4], m[0]);
        } else {
            out[0] = Math.atan2(m[6], m[5]);
            out[2] = 0;
        }
    } else if (order === 'YXZ') {
        out[0] = Math.asin(-Math.min(Math.max(m[9], -1), 1));
        if (Math.abs(m[9]) < 0.99999) {
            out[1] = Math.atan2(m[8], m[10]);
            out[2] = Math.atan2(m[1], m[5]);
        } else {
            out[1] = Math.atan2(-m[2], m[0]);
            out[2] = 0;
        }
    } else if (order === 'ZXY') {
        out[0] = Math.asin(Math.min(Math.max(m[6], -1), 1));
        if (Math.abs(m[6]) < 0.99999) {
            out[1] = Math.atan2(-m[2], m[10]);
            out[2] = Math.atan2(-m[4], m[5]);
        } else {
            out[1] = 0;
            out[2] = Math.atan2(m[1], m[0]);
        }
    } else if (order === 'ZYX') {
        out[1] = Math.asin(-Math.min(Math.max(m[2], -1), 1));
        if (Math.abs(m[2]) < 0.99999) {
            out[0] = Math.atan2(m[6], m[10]);
            out[2] = Math.atan2(m[1], m[0]);
        } else {
            out[0] = 0;
            out[2] = Math.atan2(-m[4], m[5]);
        }
    } else if (order === 'YZX') {
        out[2] = Math.asin(Math.min(Math.max(m[1], -1), 1));
        if (Math.abs(m[1]) < 0.99999) {
            out[0] = Math.atan2(-m[9], m[5]);
            out[1] = Math.atan2(-m[2], m[0]);
        } else {
            out[0] = 0;
            out[1] = Math.atan2(m[8], m[10]);
        }
    } else if (order === 'XZY') {
        out[2] = Math.asin(-Math.min(Math.max(m[4], -1), 1));
        if (Math.abs(m[4]) < 0.99999) {
            out[0] = Math.atan2(m[6], m[5]);
            out[1] = Math.atan2(m[8], m[0]);
        } else {
            out[0] = Math.atan2(-m[9], m[10]);
            out[1] = 0;
        }
    }

    return out;
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/math/Euler.js



const tmpMat4 = new Mat4();

class Euler extends Array {
    constructor(x = 0, y = x, z = x, order = 'YXZ') {
        super(x, y, z);
        this.order = order;
        this.onChange = () => {};
        return this;
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    get z() {
        return this[2];
    }

    set x(v) {
        this[0] = v;
        this.onChange();
    }

    set y(v) {
        this[1] = v;
        this.onChange();
    }

    set z(v) {
        this[2] = v;
        this.onChange();
    }

    set(x, y = x, z = x) {
        if (x.length) return this.copy(x);
        this[0] = x;
        this[1] = y;
        this[2] = z;
        this.onChange();
        return this;
    }

    copy(v) {
        this[0] = v[0];
        this[1] = v[1];
        this[2] = v[2];
        this.onChange();
        return this;
    }

    reorder(order) {
        this.order = order;
        this.onChange();
        return this;
    }

    fromRotationMatrix(m, order = this.order) {
        fromRotationMatrix(this, m, order);
        return this;
    }

    fromQuaternion(q, order = this.order) {
        tmpMat4.fromQuaternion(q);
        return this.fromRotationMatrix(tmpMat4, order);
    }

    toArray(a = [], o = 0) {
        a[o] = this[0];
        a[o + 1] = this[1];
        a[o + 2] = this[2];
        return a;
    }
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/core/Transform.js





class Transform {
    constructor() {
        this.parent = null;
        this.children = [];
        this.visible = true;

        this.matrix = new Mat4();
        this.worldMatrix = new Mat4();
        this.matrixAutoUpdate = true;

        this.position = new Vec3();
        this.quaternion = new Quat();
        this.scale = new Vec3(1);
        this.rotation = new Euler();
        this.up = new Vec3(0, 1, 0);

        this.rotation.onChange = () => this.quaternion.fromEuler(this.rotation);
        this.quaternion.onChange = () => this.rotation.fromQuaternion(this.quaternion);
    }

    setParent(parent, notifyParent = true) {
        if (this.parent && parent !== this.parent) this.parent.removeChild(this, false);
        this.parent = parent;
        if (notifyParent && parent) parent.addChild(this, false);
    }

    addChild(child, notifyChild = true) {
        if (!~this.children.indexOf(child)) this.children.push(child);
        if (notifyChild) child.setParent(this, false);
    }

    removeChild(child, notifyChild = true) {
        if (!!~this.children.indexOf(child)) this.children.splice(this.children.indexOf(child), 1);
        if (notifyChild) child.setParent(null, false);
    }

    updateMatrixWorld(force) {
        if (this.matrixAutoUpdate) this.updateMatrix();
        if (this.worldMatrixNeedsUpdate || force) {
            if (this.parent === null) this.worldMatrix.copy(this.matrix);
            else this.worldMatrix.multiply(this.parent.worldMatrix, this.matrix);
            this.worldMatrixNeedsUpdate = false;
            force = true;
        }

        for (let i = 0, l = this.children.length; i < l; i++) {
            this.children[i].updateMatrixWorld(force);
        }
    }

    updateMatrix() {
        this.matrix.compose(this.quaternion, this.position, this.scale);
        this.worldMatrixNeedsUpdate = true;
    }

    traverse(callback) {
        // Return true in callback to stop traversing children
        if (callback(this)) return;
        for (let i = 0, l = this.children.length; i < l; i++) {
            this.children[i].traverse(callback);
        }
    }

    decompose() {
        this.matrix.getTranslation(this.position);
        this.matrix.getRotation(this.quaternion);
        this.matrix.getScaling(this.scale);
        this.rotation.fromQuaternion(this.quaternion);
    }

    lookAt(target, invert = false) {
        if (invert) this.matrix.lookAt(this.position, target, this.up);
        else this.matrix.lookAt(target, this.position, this.up);
        this.matrix.getRotation(this.quaternion);
        this.rotation.fromQuaternion(this.quaternion);
    }
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/core/Camera.js




const tempMat4 = new Mat4();
const tempVec3a = new Vec3();
const tempVec3b = new Vec3();

class Camera extends Transform {
    constructor(gl, { near = 0.1, far = 100, fov = 45, aspect = 1, left, right, bottom, top, zoom = 1 } = {}) {
        super();

        Object.assign(this, { near, far, fov, aspect, left, right, bottom, top, zoom });

        this.projectionMatrix = new Mat4();
        this.viewMatrix = new Mat4();
        this.projectionViewMatrix = new Mat4();
        this.worldPosition = new Vec3();

        // Use orthographic if left/right set, else default to perspective camera
        this.type = left || right ? 'orthographic' : 'perspective';

        if (this.type === 'orthographic') this.orthographic();
        else this.perspective();
    }

    perspective({ near = this.near, far = this.far, fov = this.fov, aspect = this.aspect } = {}) {
        Object.assign(this, { near, far, fov, aspect });
        this.projectionMatrix.fromPerspective({ fov: fov * (Math.PI / 180), aspect, near, far });
        this.type = 'perspective';
        return this;
    }

    orthographic({
        near = this.near,
        far = this.far,
        left = this.left,
        right = this.right,
        bottom = this.bottom,
        top = this.top,
        zoom = this.zoom,
    } = {}) {
        Object.assign(this, { near, far, left, right, bottom, top, zoom });
        left /= zoom;
        right /= zoom;
        bottom /= zoom;
        top /= zoom;
        this.projectionMatrix.fromOrthogonal({ left, right, bottom, top, near, far });
        this.type = 'orthographic';
        return this;
    }

    updateMatrixWorld() {
        super.updateMatrixWorld();
        this.viewMatrix.inverse(this.worldMatrix);
        this.worldMatrix.getTranslation(this.worldPosition);

        // used for sorting
        this.projectionViewMatrix.multiply(this.projectionMatrix, this.viewMatrix);
        return this;
    }

    lookAt(target) {
        super.lookAt(target, true);
        return this;
    }

    // Project 3D coordinate to 2D point
    project(v) {
        v.applyMatrix4(this.viewMatrix);
        v.applyMatrix4(this.projectionMatrix);
        return this;
    }

    // Unproject 2D point to 3D coordinate
    unproject(v) {
        v.applyMatrix4(tempMat4.inverse(this.projectionMatrix));
        v.applyMatrix4(this.worldMatrix);
        return this;
    }

    updateFrustum() {
        if (!this.frustum) {
            this.frustum = [new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3(), new Vec3()];
        }

        const m = this.projectionViewMatrix;
        this.frustum[0].set(m[3] - m[0], m[7] - m[4], m[11] - m[8]).constant = m[15] - m[12]; // -x
        this.frustum[1].set(m[3] + m[0], m[7] + m[4], m[11] + m[8]).constant = m[15] + m[12]; // +x
        this.frustum[2].set(m[3] + m[1], m[7] + m[5], m[11] + m[9]).constant = m[15] + m[13]; // +y
        this.frustum[3].set(m[3] - m[1], m[7] - m[5], m[11] - m[9]).constant = m[15] - m[13]; // -y
        this.frustum[4].set(m[3] - m[2], m[7] - m[6], m[11] - m[10]).constant = m[15] - m[14]; // +z (far)
        this.frustum[5].set(m[3] + m[2], m[7] + m[6], m[11] + m[10]).constant = m[15] + m[14]; // -z (near)

        for (let i = 0; i < 6; i++) {
            const invLen = 1.0 / this.frustum[i].distance();
            this.frustum[i].multiply(invLen);
            this.frustum[i].constant *= invLen;
        }
    }

    frustumIntersectsMesh(node) {
        // If no position attribute, treat as frustumCulled false
        if (!node.geometry.attributes.position) return true;

        if (!node.geometry.bounds || node.geometry.bounds.radius === Infinity) node.geometry.computeBoundingSphere();

        if (!node.geometry.bounds) return true;

        const center = tempVec3a;
        center.copy(node.geometry.bounds.center);
        center.applyMatrix4(node.worldMatrix);

        const radius = node.geometry.bounds.radius * node.worldMatrix.getMaxScaleOnAxis();

        return this.frustumIntersectsSphere(center, radius);
    }

    frustumIntersectsSphere(center, radius) {
        const normal = tempVec3b;

        for (let i = 0; i < 6; i++) {
            const plane = this.frustum[i];
            const distance = normal.copy(plane).dot(center) + plane.constant;
            if (distance < -radius) return false;
        }
        return true;
    }
}

// EXTERNAL MODULE: ./js/AnimatedPlane.js + 1 modules
var AnimatedPlane = __webpack_require__(116);
;// CONCATENATED MODULE: ./node_modules/ogl/src/core/Texture.js
// TODO: delete texture
// TODO: use texSubImage2D for updates (video or when loaded)
// TODO: need? encoding = linearEncoding
// TODO: support non-compressed mipmaps uploads

const emptyPixel = new Uint8Array(4);

function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}

let Texture_ID = 1;

class Texture {
    constructor(
        gl,
        {
            image,
            target = gl.TEXTURE_2D,
            type = gl.UNSIGNED_BYTE,
            format = gl.RGBA,
            internalFormat = format,
            wrapS = gl.CLAMP_TO_EDGE,
            wrapT = gl.CLAMP_TO_EDGE,
            generateMipmaps = true,
            minFilter = generateMipmaps ? gl.NEAREST_MIPMAP_LINEAR : gl.LINEAR,
            magFilter = gl.LINEAR,
            premultiplyAlpha = false,
            unpackAlignment = 4,
            flipY = target == gl.TEXTURE_2D ? true : false,
            anisotropy = 0,
            level = 0,
            width, // used for RenderTargets or Data Textures
            height = width,
        } = {}
    ) {
        this.gl = gl;
        this.id = Texture_ID++;

        this.image = image;
        this.target = target;
        this.type = type;
        this.format = format;
        this.internalFormat = internalFormat;
        this.minFilter = minFilter;
        this.magFilter = magFilter;
        this.wrapS = wrapS;
        this.wrapT = wrapT;
        this.generateMipmaps = generateMipmaps;
        this.premultiplyAlpha = premultiplyAlpha;
        this.unpackAlignment = unpackAlignment;
        this.flipY = flipY;
        this.anisotropy = Math.min(anisotropy, this.gl.renderer.parameters.maxAnisotropy);
        this.level = level;
        this.width = width;
        this.height = height;
        this.texture = this.gl.createTexture();

        this.store = {
            image: null,
        };

        // Alias for state store to avoid redundant calls for global state
        this.glState = this.gl.renderer.state;

        // State store to avoid redundant calls for per-texture state
        this.state = {};
        this.state.minFilter = this.gl.NEAREST_MIPMAP_LINEAR;
        this.state.magFilter = this.gl.LINEAR;
        this.state.wrapS = this.gl.REPEAT;
        this.state.wrapT = this.gl.REPEAT;
        this.state.anisotropy = 0;
    }

    bind() {
        // Already bound to active texture unit
        if (this.glState.textureUnits[this.glState.activeTextureUnit] === this.id) return;
        this.gl.bindTexture(this.target, this.texture);
        this.glState.textureUnits[this.glState.activeTextureUnit] = this.id;
    }

    update(textureUnit = 0) {
        const needsUpdate = !(this.image === this.store.image && !this.needsUpdate);

        // Make sure that texture is bound to its texture unit
        if (needsUpdate || this.glState.textureUnits[textureUnit] !== this.id) {
            // set active texture unit to perform texture functions
            this.gl.renderer.activeTexture(textureUnit);
            this.bind();
        }

        if (!needsUpdate) return;
        this.needsUpdate = false;

        if (this.flipY !== this.glState.flipY) {
            this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
            this.glState.flipY = this.flipY;
        }

        if (this.premultiplyAlpha !== this.glState.premultiplyAlpha) {
            this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
            this.glState.premultiplyAlpha = this.premultiplyAlpha;
        }

        if (this.unpackAlignment !== this.glState.unpackAlignment) {
            this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, this.unpackAlignment);
            this.glState.unpackAlignment = this.unpackAlignment;
        }

        if (this.minFilter !== this.state.minFilter) {
            this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.minFilter);
            this.state.minFilter = this.minFilter;
        }

        if (this.magFilter !== this.state.magFilter) {
            this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.magFilter);
            this.state.magFilter = this.magFilter;
        }

        if (this.wrapS !== this.state.wrapS) {
            this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.wrapS);
            this.state.wrapS = this.wrapS;
        }

        if (this.wrapT !== this.state.wrapT) {
            this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.wrapT);
            this.state.wrapT = this.wrapT;
        }

        if (this.anisotropy && this.anisotropy !== this.state.anisotropy) {
            this.gl.texParameterf(
                this.target,
                this.gl.renderer.getExtension('EXT_texture_filter_anisotropic').TEXTURE_MAX_ANISOTROPY_EXT,
                this.anisotropy
            );
            this.state.anisotropy = this.anisotropy;
        }

        if (this.image) {
            if (this.image.width) {
                this.width = this.image.width;
                this.height = this.image.height;
            }

            if (this.target === this.gl.TEXTURE_CUBE_MAP) {
                // For cube maps
                for (let i = 0; i < 6; i++) {
                    this.gl.texImage2D(
                        this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                        this.level,
                        this.internalFormat,
                        this.format,
                        this.type,
                        this.image[i]
                    );
                }
            } else if (ArrayBuffer.isView(this.image)) {
                // Data texture
                this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, this.image);
            } else if (this.image.isCompressedTexture) {
                // Compressed texture
                for (let level = 0; level < this.image.length; level++) {
                    this.gl.compressedTexImage2D(
                        this.target,
                        level,
                        this.internalFormat,
                        this.image[level].width,
                        this.image[level].height,
                        0,
                        this.image[level].data
                    );
                }
            } else {
                // Regular texture
                this.gl.texImage2D(this.target, this.level, this.internalFormat, this.format, this.type, this.image);
            }

            if (this.generateMipmaps) {
                // For WebGL1, if not a power of 2, turn off mips, set wrapping to clamp to edge and minFilter to linear
                if (!this.gl.renderer.isWebgl2 && (!isPowerOf2(this.image.width) || !isPowerOf2(this.image.height))) {
                    this.generateMipmaps = false;
                    this.wrapS = this.wrapT = this.gl.CLAMP_TO_EDGE;
                    this.minFilter = this.gl.LINEAR;
                } else {
                    this.gl.generateMipmap(this.target);
                }
            }

            // Callback for when data is pushed to GPU
            this.onUpdate && this.onUpdate();
        } else {
            if (this.target === this.gl.TEXTURE_CUBE_MAP) {
                // Upload empty pixel for each side while no image to avoid errors while image or video loading
                for (let i = 0; i < 6; i++) {
                    this.gl.texImage2D(
                        this.gl.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                        0,
                        this.gl.RGBA,
                        1,
                        1,
                        0,
                        this.gl.RGBA,
                        this.gl.UNSIGNED_BYTE,
                        emptyPixel
                    );
                }
            } else if (this.width) {
                // image intentionally left null for RenderTarget
                this.gl.texImage2D(this.target, this.level, this.internalFormat, this.width, this.height, 0, this.format, this.type, null);
            } else {
                // Upload empty pixel if no image to avoid errors while image or video loading
                this.gl.texImage2D(this.target, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, emptyPixel);
            }
        }
        this.store.image = this.image;
    }
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/core/Geometry.js
// attribute params
// {
//     data - typed array eg UInt16Array for indices, Float32Array
//     size - int default 1
//     instanced - default null. Pass divisor amount
//     type - gl enum default gl.UNSIGNED_SHORT for 'index', gl.FLOAT for others
//     normalized - boolean default false

//     buffer - gl buffer, if buffer exists, don't need to provide data - although needs position data for bounds calculation
//     stride - default 0 - for when passing in buffer
//     offset - default 0 - for when passing in buffer
//     count - default null - for when passing in buffer
//     min - array - for when passing in buffer
//     max - array - for when passing in buffer
// }

// TODO: fit in transform feedback



const Geometry_tempVec3 = new Vec3();

let Geometry_ID = 1;
let ATTR_ID = 1;

// To stop inifinite warnings
let isBoundsWarned = false;

class Geometry {
    constructor(gl, attributes = {}) {
        if (!gl.canvas) console.error('gl not passed as first argument to Geometry');
        this.gl = gl;
        this.attributes = attributes;
        this.id = Geometry_ID++;

        // Store one VAO per program attribute locations order
        this.VAOs = {};

        this.drawRange = { start: 0, count: 0 };
        this.instancedCount = 0;

        // Unbind current VAO so that new buffers don't get added to active mesh
        this.gl.renderer.bindVertexArray(null);
        this.gl.renderer.currentGeometry = null;

        // Alias for state store to avoid redundant calls for global state
        this.glState = this.gl.renderer.state;

        // create the buffers
        for (let key in attributes) {
            this.addAttribute(key, attributes[key]);
        }
    }

    addAttribute(key, attr) {
        this.attributes[key] = attr;

        // Set options
        attr.id = ATTR_ID++; // TODO: currently unused, remove?
        attr.size = attr.size || 1;
        attr.type =
            attr.type ||
            (attr.data.constructor === Float32Array
                ? this.gl.FLOAT
                : attr.data.constructor === Uint16Array
                ? this.gl.UNSIGNED_SHORT
                : this.gl.UNSIGNED_INT); // Uint32Array
        attr.target = key === 'index' ? this.gl.ELEMENT_ARRAY_BUFFER : this.gl.ARRAY_BUFFER;
        attr.normalized = attr.normalized || false;
        attr.stride = attr.stride || 0;
        attr.offset = attr.offset || 0;
        attr.count = attr.count || (attr.stride ? attr.data.byteLength / attr.stride : attr.data.length / attr.size);
        attr.divisor = attr.instanced || 0;
        attr.needsUpdate = false;
        attr.usage = attr.usage || this.gl.STATIC_DRAW;

        if (!attr.buffer) {
            // Push data to buffer
            this.updateAttribute(attr);
        }

        // Update geometry counts. If indexed, ignore regular attributes
        if (attr.divisor) {
            this.isInstanced = true;
            if (this.instancedCount && this.instancedCount !== attr.count * attr.divisor) {
                console.warn('geometry has multiple instanced buffers of different length');
                return (this.instancedCount = Math.min(this.instancedCount, attr.count * attr.divisor));
            }
            this.instancedCount = attr.count * attr.divisor;
        } else if (key === 'index') {
            this.drawRange.count = attr.count;
        } else if (!this.attributes.index) {
            this.drawRange.count = Math.max(this.drawRange.count, attr.count);
        }
    }

    updateAttribute(attr) {
        const isNewBuffer = !attr.buffer;
        if (isNewBuffer) attr.buffer = this.gl.createBuffer();
        if (this.glState.boundBuffer !== attr.buffer) {
            this.gl.bindBuffer(attr.target, attr.buffer);
            this.glState.boundBuffer = attr.buffer;
        }
        if (isNewBuffer) {
            this.gl.bufferData(attr.target, attr.data, attr.usage);
        } else {
            this.gl.bufferSubData(attr.target, 0, attr.data);
        }
        attr.needsUpdate = false;
    }

    setIndex(value) {
        this.addAttribute('index', value);
    }

    setDrawRange(start, count) {
        this.drawRange.start = start;
        this.drawRange.count = count;
    }

    setInstancedCount(value) {
        this.instancedCount = value;
    }

    createVAO(program) {
        this.VAOs[program.attributeOrder] = this.gl.renderer.createVertexArray();
        this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
        this.bindAttributes(program);
    }

    bindAttributes(program) {
        // Link all attributes to program using gl.vertexAttribPointer
        program.attributeLocations.forEach((location, { name, type }) => {
            // If geometry missing a required shader attribute
            if (!this.attributes[name]) {
                console.warn(`active attribute ${name} not being supplied`);
                return;
            }

            const attr = this.attributes[name];

            this.gl.bindBuffer(attr.target, attr.buffer);
            this.glState.boundBuffer = attr.buffer;

            // For matrix attributes, buffer needs to be defined per column
            let numLoc = 1;
            if (type === 35674) numLoc = 2; // mat2
            if (type === 35675) numLoc = 3; // mat3
            if (type === 35676) numLoc = 4; // mat4

            const size = attr.size / numLoc;
            const stride = numLoc === 1 ? 0 : numLoc * numLoc * numLoc;
            const offset = numLoc === 1 ? 0 : numLoc * numLoc;

            for (let i = 0; i < numLoc; i++) {
                this.gl.vertexAttribPointer(location + i, size, attr.type, attr.normalized, attr.stride + stride, attr.offset + i * offset);
                this.gl.enableVertexAttribArray(location + i);

                // For instanced attributes, divisor needs to be set.
                // For firefox, need to set back to 0 if non-instanced drawn after instanced. Else won't render
                this.gl.renderer.vertexAttribDivisor(location + i, attr.divisor);
            }
        });

        // Bind indices if geometry indexed
        if (this.attributes.index) this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.attributes.index.buffer);
    }

    draw({ program, mode = this.gl.TRIANGLES }) {
        if (this.gl.renderer.currentGeometry !== `${this.id}_${program.attributeOrder}`) {
            if (!this.VAOs[program.attributeOrder]) this.createVAO(program);
            this.gl.renderer.bindVertexArray(this.VAOs[program.attributeOrder]);
            this.gl.renderer.currentGeometry = `${this.id}_${program.attributeOrder}`;
        }

        // Check if any attributes need updating
        program.attributeLocations.forEach((location, { name }) => {
            const attr = this.attributes[name];
            if (attr.needsUpdate) this.updateAttribute(attr);
        });

        if (this.isInstanced) {
            if (this.attributes.index) {
                this.gl.renderer.drawElementsInstanced(
                    mode,
                    this.drawRange.count,
                    this.attributes.index.type,
                    this.attributes.index.offset + this.drawRange.start * 2,
                    this.instancedCount
                );
            } else {
                this.gl.renderer.drawArraysInstanced(mode, this.drawRange.start, this.drawRange.count, this.instancedCount);
            }
        } else {
            if (this.attributes.index) {
                this.gl.drawElements(mode, this.drawRange.count, this.attributes.index.type, this.attributes.index.offset + this.drawRange.start * 2);
            } else {
                this.gl.drawArrays(mode, this.drawRange.start, this.drawRange.count);
            }
        }
    }

    getPosition() {
        // Use position buffer, or min/max if available
        const attr = this.attributes.position;
        // if (attr.min) return [...attr.min, ...attr.max];
        if (attr.data) return attr;
        if (isBoundsWarned) return;
        console.warn('No position buffer data found to compute bounds');
        return (isBoundsWarned = true);
    }

    computeBoundingBox(attr) {
        if (!attr) attr = this.getPosition();
        const array = attr.data;
        const stride = attr.stride ? attr.stride / array.BYTES_PER_ELEMENT : attr.size;

        if (!this.bounds) {
            this.bounds = {
                min: new Vec3(),
                max: new Vec3(),
                center: new Vec3(),
                scale: new Vec3(),
                radius: Infinity,
            };
        }

        const min = this.bounds.min;
        const max = this.bounds.max;
        const center = this.bounds.center;
        const scale = this.bounds.scale;

        min.set(+Infinity);
        max.set(-Infinity);

        // TODO: check size of position (eg triangle with Vec2)
        for (let i = 0, l = array.length; i < l; i += stride) {
            const x = array[i];
            const y = array[i + 1];
            const z = array[i + 2];

            min.x = Math.min(x, min.x);
            min.y = Math.min(y, min.y);
            min.z = Math.min(z, min.z);

            max.x = Math.max(x, max.x);
            max.y = Math.max(y, max.y);
            max.z = Math.max(z, max.z);
        }

        scale.sub(max, min);
        center.add(min, max).divide(2);
    }

    computeBoundingSphere(attr) {
        if (!attr) attr = this.getPosition();
        const array = attr.data;
        const stride = attr.stride ? attr.stride / array.BYTES_PER_ELEMENT : attr.size;

        if (!this.bounds) this.computeBoundingBox(attr);

        let maxRadiusSq = 0;
        for (let i = 0, l = array.length; i < l; i += stride) {
            Geometry_tempVec3.fromArray(array, i);
            maxRadiusSq = Math.max(maxRadiusSq, this.bounds.center.squaredDistance(Geometry_tempVec3));
        }

        this.bounds.radius = Math.sqrt(maxRadiusSq);
    }

    remove() {
        for (let key in this.VAOs) {
            this.gl.renderer.deleteVertexArray(this.VAOs[key]);
            delete this.VAOs[key];
        }
        for (let key in this.attributes) {
            this.gl.deleteBuffer(this.attributes[key].buffer);
            delete this.attributes[key];
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/extras/Plane.js


class Plane extends Geometry {
    constructor(gl, { width = 1, height = 1, widthSegments = 1, heightSegments = 1, attributes = {} } = {}) {
        const wSegs = widthSegments;
        const hSegs = heightSegments;

        // Determine length of arrays
        const num = (wSegs + 1) * (hSegs + 1);
        const numIndices = wSegs * hSegs * 6;

        // Generate empty arrays once
        const position = new Float32Array(num * 3);
        const normal = new Float32Array(num * 3);
        const uv = new Float32Array(num * 2);
        const index = numIndices > 65536 ? new Uint32Array(numIndices) : new Uint16Array(numIndices);

        Plane.buildPlane(position, normal, uv, index, width, height, 0, wSegs, hSegs);

        Object.assign(attributes, {
            position: { size: 3, data: position },
            normal: { size: 3, data: normal },
            uv: { size: 2, data: uv },
            index: { data: index },
        });

        super(gl, attributes);
    }

    static buildPlane(position, normal, uv, index, width, height, depth, wSegs, hSegs, u = 0, v = 1, w = 2, uDir = 1, vDir = -1, i = 0, ii = 0) {
        const io = i;
        const segW = width / wSegs;
        const segH = height / hSegs;

        for (let iy = 0; iy <= hSegs; iy++) {
            let y = iy * segH - height / 2;
            for (let ix = 0; ix <= wSegs; ix++, i++) {
                let x = ix * segW - width / 2;

                position[i * 3 + u] = x * uDir;
                position[i * 3 + v] = y * vDir;
                position[i * 3 + w] = depth / 2;

                normal[i * 3 + u] = 0;
                normal[i * 3 + v] = 0;
                normal[i * 3 + w] = depth >= 0 ? 1 : -1;

                uv[i * 2] = ix / wSegs;
                uv[i * 2 + 1] = 1 - iy / hSegs;

                if (iy === hSegs || ix === wSegs) continue;
                let a = io + ix + iy * (wSegs + 1);
                let b = io + ix + (iy + 1) * (wSegs + 1);
                let c = io + ix + (iy + 1) * (wSegs + 1) + 1;
                let d = io + ix + iy * (wSegs + 1) + 1;

                index[ii * 6] = a;
                index[ii * 6 + 1] = b;
                index[ii * 6 + 2] = d;
                index[ii * 6 + 3] = b;
                index[ii * 6 + 4] = c;
                index[ii * 6 + 5] = d;
                ii++;
            }
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/math/Vec4.js


class Vec4 extends Array {
    constructor(x = 0, y = x, z = x, w = x) {
        super(x, y, z, w);
        return this;
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    get z() {
        return this[2];
    }

    get w() {
        return this[3];
    }

    set x(v) {
        this[0] = v;
    }

    set y(v) {
        this[1] = v;
    }

    set z(v) {
        this[2] = v;
    }

    set w(v) {
        this[3] = v;
    }

    set(x, y, z, w) {
        if (x.length) return this.copy(x);
        Vec4Func_set(this, x, y, z, w);
        return this;
    }

    copy(v) {
        Vec4Func_copy(this, v);
        return this;
    }

    normalize() {
        Vec4Func_normalize(this, this);
        return this;
    }

    multiply(v) {
        Vec4Func_scale(this, this, v);
        return this;
    }

    dot(v) {
        return Vec4Func_dot(this, v);
    }

    fromArray(a, o = 0) {
        this[0] = a[o];
        this[1] = a[o + 1];
        this[2] = a[o + 2];
        this[3] = a[o + 3];
        return this;
    }

    toArray(a = [], o = 0) {
        a[o] = this[0];
        a[o + 1] = this[1];
        a[o + 2] = this[2];
        a[o + 3] = this[3];
        return a;
    }
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/math/functions/Vec2Func.js
const Vec2Func_EPSILON = 0.000001;

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
function Vec2Func_copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
}

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
function Vec2Func_set(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
}

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function Vec2Func_add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
}

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function Vec2Func_subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
}

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function Vec2Func_multiply(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
}

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function Vec2Func_divide(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
}

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
function Vec2Func_scale(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
}

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
function Vec2Func_distance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x * x + y * y);
}

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
function Vec2Func_squaredDistance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x * x + y * y;
}

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
function Vec2Func_length(a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x * x + y * y);
}

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
function Vec2Func_squaredLength(a) {
    var x = a[0],
        y = a[1];
    return x * x + y * y;
}

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
function Vec2Func_negate(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
}

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
function Vec2Func_inverse(out, a) {
    out[0] = 1.0 / a[0];
    out[1] = 1.0 / a[1];
    return out;
}

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
function Vec2Func_normalize(out, a) {
    var x = a[0],
        y = a[1];
    var len = x * x + y * y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
    }
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    return out;
}

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
function Vec2Func_dot(a, b) {
    return a[0] * b[0] + a[1] * b[1];
}

/**
 * Computes the cross product of two vec2's
 * Note that the cross product returns a scalar
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} cross product of a and b
 */
function Vec2Func_cross(a, b) {
    return a[0] * b[1] - a[1] * b[0];
}

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
function Vec2Func_lerp(out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
}

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
}

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
function transformMat2d(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
}

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
function Vec2Func_transformMat3(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
}

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
function Vec2Func_transformMat4(out, a, m) {
    let x = a[0];
    let y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
}

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
function Vec2Func_exactEquals(a, b) {
    return a[0] === b[0] && a[1] === b[1];
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/math/Vec2.js


class Vec2 extends Array {
    constructor(x = 0, y = x) {
        super(x, y);
        return this;
    }

    get x() {
        return this[0];
    }

    get y() {
        return this[1];
    }

    set x(v) {
        this[0] = v;
    }

    set y(v) {
        this[1] = v;
    }

    set(x, y = x) {
        if (x.length) return this.copy(x);
        Vec2Func_set(this, x, y);
        return this;
    }

    copy(v) {
        Vec2Func_copy(this, v);
        return this;
    }

    add(va, vb) {
        if (vb) Vec2Func_add(this, va, vb);
        else Vec2Func_add(this, this, va);
        return this;
    }

    sub(va, vb) {
        if (vb) Vec2Func_subtract(this, va, vb);
        else Vec2Func_subtract(this, this, va);
        return this;
    }

    multiply(v) {
        if (v.length) Vec2Func_multiply(this, this, v);
        else Vec2Func_scale(this, this, v);
        return this;
    }

    divide(v) {
        if (v.length) Vec2Func_divide(this, this, v);
        else Vec2Func_scale(this, this, 1 / v);
        return this;
    }

    inverse(v = this) {
        Vec2Func_inverse(this, v);
        return this;
    }

    // Can't use 'length' as Array.prototype uses it
    len() {
        return Vec2Func_length(this);
    }

    distance(v) {
        if (v) return Vec2Func_distance(this, v);
        else return Vec2Func_length(this);
    }

    squaredLen() {
        return this.squaredDistance();
    }

    squaredDistance(v) {
        if (v) return Vec2Func_squaredDistance(this, v);
        else return Vec2Func_squaredLength(this);
    }

    negate(v = this) {
        Vec2Func_negate(this, v);
        return this;
    }

    cross(va, vb) {
        if (vb) return Vec2Func_cross(va, vb);
        return Vec2Func_cross(this, va);
    }

    scale(v) {
        Vec2Func_scale(this, this, v);
        return this;
    }

    normalize() {
        Vec2Func_normalize(this, this);
        return this;
    }

    dot(v) {
        return Vec2Func_dot(this, v);
    }

    equals(v) {
        return Vec2Func_exactEquals(this, v);
    }

    applyMatrix3(mat3) {
        Vec2Func_transformMat3(this, this, mat3);
        return this;
    }

    applyMatrix4(mat4) {
        Vec2Func_transformMat4(this, this, mat4);
        return this;
    }

    lerp(v, a) {
        Vec2Func_lerp(this, this, v, a);
        return this;
    }

    clone() {
        return new Vec2(this[0], this[1]);
    }

    fromArray(a, o = 0) {
        this[0] = a[o];
        this[1] = a[o + 1];
        return this;
    }

    toArray(a = [], o = 0) {
        a[o] = this[0];
        a[o + 1] = this[1];
        return a;
    }
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/math/functions/Mat3Func.js
const Mat3Func_EPSILON = 0.000001;

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
function fromMat4(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
}

/**
 * Calculates a 3x3 matrix from the given quaternion
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat3} out
 */
function Mat3Func_fromQuat(out, q) {
    let x = q[0],
        y = q[1],
        z = q[2],
        w = q[3];
    let x2 = x + x;
    let y2 = y + y;
    let z2 = z + z;

    let xx = x * x2;
    let yx = y * x2;
    let yy = y * y2;
    let zx = z * x2;
    let zy = z * y2;
    let zz = z * z2;
    let wx = w * x2;
    let wy = w * y2;
    let wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
}

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function Mat3Func_copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
}

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
function Mat3Func_set(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
}

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
function Mat3Func_identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function Mat3Func_transpose(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        let a01 = a[1],
            a02 = a[2],
            a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }

    return out;
}

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
function Mat3Func_invert(out, a) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    let a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    let a20 = a[6],
        a21 = a[7],
        a22 = a[8];

    let b01 = a22 * a11 - a12 * a21;
    let b11 = -a22 * a10 + a12 * a20;
    let b21 = a21 * a10 - a11 * a20;

    // Calculate the determinant
    let det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
}

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
function Mat3Func_determinant(a) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    let a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    let a20 = a[6],
        a21 = a[7],
        a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
}

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function Mat3Func_multiply(out, a, b) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2];
    let a10 = a[3],
        a11 = a[4],
        a12 = a[5];
    let a20 = a[6],
        a21 = a[7],
        a22 = a[8];

    let b00 = b[0],
        b01 = b[1],
        b02 = b[2];
    let b10 = b[3],
        b11 = b[4],
        b12 = b[5];
    let b20 = b[6],
        b21 = b[7],
        b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
}

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
function Mat3Func_translate(out, a, v) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        x = v[0],
        y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
}

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
function Mat3Func_rotate(out, a, rad) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a10 = a[3],
        a11 = a[4],
        a12 = a[5],
        a20 = a[6],
        a21 = a[7],
        a22 = a[8],
        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
}

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
function Mat3Func_scale(out, a, v) {
    let x = v[0],
        y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
}

/**
 * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {mat4} a Mat4 to derive the normal matrix from
 *
 * @returns {mat3} out
 */
function normalFromMat4(out, a) {
    let a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    let a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    let a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    let a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15];

    let b00 = a00 * a11 - a01 * a10;
    let b01 = a00 * a12 - a02 * a10;
    let b02 = a00 * a13 - a03 * a10;
    let b03 = a01 * a12 - a02 * a11;
    let b04 = a01 * a13 - a03 * a11;
    let b05 = a02 * a13 - a03 * a12;
    let b06 = a20 * a31 - a21 * a30;
    let b07 = a20 * a32 - a22 * a30;
    let b08 = a20 * a33 - a23 * a30;
    let b09 = a21 * a32 - a22 * a31;
    let b10 = a21 * a33 - a23 * a31;
    let b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
}

/**
 * Generates a 2D projection matrix with the given bounds
 *
 * @param {mat3} out mat3 frustum matrix will be written into
 * @param {number} width Width of your gl context
 * @param {number} height Height of gl context
 * @returns {mat3} out
 */
function projection(out, width, height) {
    out[0] = 2 / width;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = -2 / height;
    out[5] = 0;
    out[6] = -1;
    out[7] = 1;
    out[8] = 1;
    return out;
}

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function Mat3Func_add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
}

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
function Mat3Func_subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
}

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
function Mat3Func_multiplyScalar(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/math/Mat3.js


class Mat3 extends Array {
    constructor(m00 = 1, m01 = 0, m02 = 0, m10 = 0, m11 = 1, m12 = 0, m20 = 0, m21 = 0, m22 = 1) {
        super(m00, m01, m02, m10, m11, m12, m20, m21, m22);
        return this;
    }

    set(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
        if (m00.length) return this.copy(m00);
        Mat3Func_set(this, m00, m01, m02, m10, m11, m12, m20, m21, m22);
        return this;
    }

    translate(v, m = this) {
        Mat3Func_translate(this, m, v);
        return this;
    }

    rotate(v, m = this) {
        Mat3Func_rotate(this, m, v);
        return this;
    }

    scale(v, m = this) {
        Mat3Func_scale(this, m, v);
        return this;
    }

    multiply(ma, mb) {
        if (mb) {
            Mat3Func_multiply(this, ma, mb);
        } else {
            Mat3Func_multiply(this, this, ma);
        }
        return this;
    }

    identity() {
        Mat3Func_identity(this);
        return this;
    }

    copy(m) {
        Mat3Func_copy(this, m);
        return this;
    }

    fromMatrix4(m) {
        fromMat4(this, m);
        return this;
    }

    fromQuaternion(q) {
        Mat3Func_fromQuat(this, q);
        return this;
    }

    fromBasis(vec3a, vec3b, vec3c) {
        this.set(vec3a[0], vec3a[1], vec3a[2], vec3b[0], vec3b[1], vec3b[2], vec3c[0], vec3c[1], vec3c[2]);
        return this;
    }

    inverse(m = this) {
        Mat3Func_invert(this, m);
        return this;
    }

    getNormalMatrix(m) {
        normalFromMat4(this, m);
        return this;
    }
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/core/Mesh.js




let Mesh_ID = 0;

class Mesh extends Transform {
    constructor(gl, { geometry, program, mode = gl.TRIANGLES, frustumCulled = true, renderOrder = 0 } = {}) {
        super();
        if (!gl.canvas) console.error('gl not passed as first argument to Mesh');
        this.gl = gl;
        this.id = Mesh_ID++;
        this.geometry = geometry;
        this.program = program;
        this.mode = mode;

        // Used to skip frustum culling
        this.frustumCulled = frustumCulled;

        // Override sorting to force an order
        this.renderOrder = renderOrder;
        this.modelViewMatrix = new Mat4();
        this.normalMatrix = new Mat3();
        this.beforeRenderCallbacks = [];
        this.afterRenderCallbacks = [];
    }

    onBeforeRender(f) {
        this.beforeRenderCallbacks.push(f);
        return this;
    }

    onAfterRender(f) {
        this.afterRenderCallbacks.push(f);
        return this;
    }

    draw({ camera } = {}) {
        this.beforeRenderCallbacks.forEach((f) => f && f({ mesh: this, camera }));
        if (camera) {
            // Add empty matrix uniforms to program if unset
            if (!this.program.uniforms.modelMatrix) {
                Object.assign(this.program.uniforms, {
                    modelMatrix: { value: null },
                    viewMatrix: { value: null },
                    modelViewMatrix: { value: null },
                    normalMatrix: { value: null },
                    projectionMatrix: { value: null },
                    cameraPosition: { value: null },
                });
            }

            // Set the matrix uniforms
            this.program.uniforms.projectionMatrix.value = camera.projectionMatrix;
            this.program.uniforms.cameraPosition.value = camera.worldPosition;
            this.program.uniforms.viewMatrix.value = camera.viewMatrix;
            this.modelViewMatrix.multiply(camera.viewMatrix, this.worldMatrix);
            this.normalMatrix.getNormalMatrix(this.modelViewMatrix);
            this.program.uniforms.modelMatrix.value = this.worldMatrix;
            this.program.uniforms.modelViewMatrix.value = this.modelViewMatrix;
            this.program.uniforms.normalMatrix.value = this.normalMatrix;
        }

        // determine if faces need to be flipped - when mesh scaled negatively
        let flipFaces = this.program.cullFace && this.worldMatrix.determinant() < 0;
        this.program.use({ flipFaces });
        this.geometry.draw({ mode: this.mode, program: this.program });
        this.afterRenderCallbacks.forEach((f) => f && f({ mesh: this, camera }));
    }
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/core/RenderTarget.js
// TODO: test stencil and depth


class RenderTarget {
    constructor(
        gl,
        {
            width = gl.canvas.width,
            height = gl.canvas.height,
            target = gl.FRAMEBUFFER,
            color = 1, // number of color attachments
            depth = true,
            stencil = false,
            depthTexture = false, // note - stencil breaks
            wrapS = gl.CLAMP_TO_EDGE,
            wrapT = gl.CLAMP_TO_EDGE,
            minFilter = gl.LINEAR,
            magFilter = minFilter,
            type = gl.UNSIGNED_BYTE,
            format = gl.RGBA,
            internalFormat = format,
            unpackAlignment,
            premultiplyAlpha,
        } = {}
    ) {
        this.gl = gl;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.buffer = this.gl.createFramebuffer();
        this.target = target;
        this.gl.bindFramebuffer(this.target, this.buffer);

        this.textures = [];
        const drawBuffers = [];

        // create and attach required num of color textures
        for (let i = 0; i < color; i++) {
            this.textures.push(
                new Texture(gl, {
                    width,
                    height,
                    wrapS,
                    wrapT,
                    minFilter,
                    magFilter,
                    type,
                    format,
                    internalFormat,
                    unpackAlignment,
                    premultiplyAlpha,
                    flipY: false,
                    generateMipmaps: false,
                })
            );
            this.textures[i].update();
            this.gl.framebufferTexture2D(this.target, this.gl.COLOR_ATTACHMENT0 + i, this.gl.TEXTURE_2D, this.textures[i].texture, 0 /* level */);
            drawBuffers.push(this.gl.COLOR_ATTACHMENT0 + i);
        }

        // For multi-render targets shader access
        if (drawBuffers.length > 1) this.gl.renderer.drawBuffers(drawBuffers);

        // alias for majority of use cases
        this.texture = this.textures[0];

        // note depth textures break stencil - so can't use together
        if (depthTexture && (this.gl.renderer.isWebgl2 || this.gl.renderer.getExtension('WEBGL_depth_texture'))) {
            this.depthTexture = new Texture(gl, {
                width,
                height,
                minFilter: this.gl.NEAREST,
                magFilter: this.gl.NEAREST,
                format: this.gl.DEPTH_COMPONENT,
                internalFormat: gl.renderer.isWebgl2 ? this.gl.DEPTH_COMPONENT16 : this.gl.DEPTH_COMPONENT,
                type: this.gl.UNSIGNED_INT,
            });
            this.depthTexture.update();
            this.gl.framebufferTexture2D(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0 /* level */);
        } else {
            // Render buffers
            if (depth && !stencil) {
                this.depthBuffer = this.gl.createRenderbuffer();
                this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer);
                this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);
                this.gl.framebufferRenderbuffer(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthBuffer);
            }

            if (stencil && !depth) {
                this.stencilBuffer = this.gl.createRenderbuffer();
                this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.stencilBuffer);
                this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.STENCIL_INDEX8, width, height);
                this.gl.framebufferRenderbuffer(this.target, this.gl.STENCIL_ATTACHMENT, this.gl.RENDERBUFFER, this.stencilBuffer);
            }

            if (depth && stencil) {
                this.depthStencilBuffer = this.gl.createRenderbuffer();
                this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthStencilBuffer);
                this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_STENCIL, width, height);
                this.gl.framebufferRenderbuffer(this.target, this.gl.DEPTH_STENCIL_ATTACHMENT, this.gl.RENDERBUFFER, this.depthStencilBuffer);
            }
        }

        this.gl.bindFramebuffer(this.target, null);
    }

    setSize(width, height) {
        if (this.width === width && this.height === height) return;

        this.width = width;
        this.height = height;
        this.gl.bindFramebuffer(this.target, this.buffer);

        for (let i = 0; i < this.textures.length; i++) {
            this.textures[i].width = width;
            this.textures[i].height = height;
            this.textures[i].needsUpdate = true;
            this.textures[i].update();
            this.gl.framebufferTexture2D(this.target, this.gl.COLOR_ATTACHMENT0 + i, this.gl.TEXTURE_2D, this.textures[i].texture, 0 /* level */);
        }

        if (this.depthTexture) {
            this.depthTexture.width = width;
            this.depthTexture.height = height;
            this.depthTexture.needsUpdate = true;
            this.depthTexture.update();
            this.gl.framebufferTexture2D(this.target, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0 /* level */);
        } else {
            if (this.depthBuffer) {
                this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer);
                this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, width, height);
            }

            if (this.stencilBuffer) {
                this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.stencilBuffer);
                this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.STENCIL_INDEX8, width, height);
            }

            if (this.depthStencilBuffer) {
                this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthStencilBuffer);
                this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_STENCIL, width, height);
            }
        }

        this.gl.bindFramebuffer(this.target, null);
    }
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/core/Program.js
// TODO: upload empty texture if null ? maybe not
// TODO: upload identity matrix if null ?
// TODO: sampler Cube

let Program_ID = 1;

// cache of typed arrays used to flatten uniform arrays
const arrayCacheF32 = {};

class Program {
    constructor(
        gl,
        {
            vertex,
            fragment,
            uniforms = {},

            transparent = false,
            cullFace = gl.BACK,
            frontFace = gl.CCW,
            depthTest = true,
            depthWrite = true,
            depthFunc = gl.LESS,
        } = {}
    ) {
        if (!gl.canvas) console.error('gl not passed as fist argument to Program');
        this.gl = gl;
        this.uniforms = uniforms;
        this.id = Program_ID++;

        if (!vertex) console.warn('vertex shader not supplied');
        if (!fragment) console.warn('fragment shader not supplied');

        // Store program state
        this.transparent = transparent;
        this.cullFace = cullFace;
        this.frontFace = frontFace;
        this.depthTest = depthTest;
        this.depthWrite = depthWrite;
        this.depthFunc = depthFunc;
        this.blendFunc = {};
        this.blendEquation = {};

        // set default blendFunc if transparent flagged
        if (this.transparent && !this.blendFunc.src) {
            if (this.gl.renderer.premultipliedAlpha) this.setBlendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
            else this.setBlendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        }

        // compile vertex shader and log errors
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertex);
        gl.compileShader(vertexShader);
        if (gl.getShaderInfoLog(vertexShader) !== '') {
            console.warn(`${gl.getShaderInfoLog(vertexShader)}\nVertex Shader\n${addLineNumbers(vertex)}`);
        }

        // compile fragment shader and log errors
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragment);
        gl.compileShader(fragmentShader);
        if (gl.getShaderInfoLog(fragmentShader) !== '') {
            console.warn(`${gl.getShaderInfoLog(fragmentShader)}\nFragment Shader\n${addLineNumbers(fragment)}`);
        }

        // compile program and log errors
        this.program = gl.createProgram();
        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            return console.warn(gl.getProgramInfoLog(this.program));
        }

        // Remove shader once linked
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);

        // Get active uniform locations
        this.uniformLocations = new Map();
        let numUniforms = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        for (let uIndex = 0; uIndex < numUniforms; uIndex++) {
            let uniform = gl.getActiveUniform(this.program, uIndex);
            this.uniformLocations.set(uniform, gl.getUniformLocation(this.program, uniform.name));

            // split uniforms' names to separate array and struct declarations
            const split = uniform.name.match(/(\w+)/g);

            uniform.uniformName = split[0];

            if (split.length === 3) {
                uniform.isStructArray = true;
                uniform.structIndex = Number(split[1]);
                uniform.structProperty = split[2];
            } else if (split.length === 2 && isNaN(Number(split[1]))) {
                uniform.isStruct = true;
                uniform.structProperty = split[1];
            }
        }

        // Get active attribute locations
        this.attributeLocations = new Map();
        const locations = [];
        const numAttribs = gl.getProgramParameter(this.program, gl.ACTIVE_ATTRIBUTES);
        for (let aIndex = 0; aIndex < numAttribs; aIndex++) {
            const attribute = gl.getActiveAttrib(this.program, aIndex);
            const location = gl.getAttribLocation(this.program, attribute.name);
            locations[location] = attribute.name;
            this.attributeLocations.set(attribute, location);
        }
        this.attributeOrder = locations.join('');
    }

    setBlendFunc(src, dst, srcAlpha, dstAlpha) {
        this.blendFunc.src = src;
        this.blendFunc.dst = dst;
        this.blendFunc.srcAlpha = srcAlpha;
        this.blendFunc.dstAlpha = dstAlpha;
        if (src) this.transparent = true;
    }

    setBlendEquation(modeRGB, modeAlpha) {
        this.blendEquation.modeRGB = modeRGB;
        this.blendEquation.modeAlpha = modeAlpha;
    }

    applyState() {
        if (this.depthTest) this.gl.renderer.enable(this.gl.DEPTH_TEST);
        else this.gl.renderer.disable(this.gl.DEPTH_TEST);

        if (this.cullFace) this.gl.renderer.enable(this.gl.CULL_FACE);
        else this.gl.renderer.disable(this.gl.CULL_FACE);

        if (this.blendFunc.src) this.gl.renderer.enable(this.gl.BLEND);
        else this.gl.renderer.disable(this.gl.BLEND);

        if (this.cullFace) this.gl.renderer.setCullFace(this.cullFace);
        this.gl.renderer.setFrontFace(this.frontFace);
        this.gl.renderer.setDepthMask(this.depthWrite);
        this.gl.renderer.setDepthFunc(this.depthFunc);
        if (this.blendFunc.src)
            this.gl.renderer.setBlendFunc(this.blendFunc.src, this.blendFunc.dst, this.blendFunc.srcAlpha, this.blendFunc.dstAlpha);
        this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB, this.blendEquation.modeAlpha);
    }

    use({ flipFaces = false } = {}) {
        let textureUnit = -1;
        const programActive = this.gl.renderer.currentProgram === this.id;

        // Avoid gl call if program already in use
        if (!programActive) {
            this.gl.useProgram(this.program);
            this.gl.renderer.currentProgram = this.id;
        }

        // Set only the active uniforms found in the shader
        this.uniformLocations.forEach((location, activeUniform) => {
            let name = activeUniform.uniformName;

            // get supplied uniform
            let uniform = this.uniforms[name];

            // For structs, get the specific property instead of the entire object
            if (activeUniform.isStruct) {
                uniform = uniform[activeUniform.structProperty];
                name += `.${activeUniform.structProperty}`;
            }
            if (activeUniform.isStructArray) {
                uniform = uniform[activeUniform.structIndex][activeUniform.structProperty];
                name += `[${activeUniform.structIndex}].${activeUniform.structProperty}`;
            }

            if (!uniform) {
                return warn(`Active uniform ${name} has not been supplied`);
            }

            if (uniform && uniform.value === undefined) {
                return warn(`${name} uniform is missing a value parameter`);
            }

            if (uniform.value.texture) {
                textureUnit = textureUnit + 1;

                // Check if texture needs to be updated
                uniform.value.update(textureUnit);
                return setUniform(this.gl, activeUniform.type, location, textureUnit);
            }

            // For texture arrays, set uniform as an array of texture units instead of just one
            if (uniform.value.length && uniform.value[0].texture) {
                const textureUnits = [];
                uniform.value.forEach((value) => {
                    textureUnit = textureUnit + 1;
                    value.update(textureUnit);
                    textureUnits.push(textureUnit);
                });

                return setUniform(this.gl, activeUniform.type, location, textureUnits);
            }

            setUniform(this.gl, activeUniform.type, location, uniform.value);
        });

        this.applyState();
        if (flipFaces) this.gl.renderer.setFrontFace(this.frontFace === this.gl.CCW ? this.gl.CW : this.gl.CCW);
    }

    remove() {
        this.gl.deleteProgram(this.program);
    }
}

function setUniform(gl, type, location, value) {
    value = value.length ? flatten(value) : value;
    const setValue = gl.renderer.state.uniformLocations.get(location);

    // Avoid redundant uniform commands
    if (value.length) {
        if (setValue === undefined || setValue.length !== value.length) {
            // clone array to store as cache
            gl.renderer.state.uniformLocations.set(location, value.slice(0));
        } else {
            if (arraysEqual(setValue, value)) return;

            // Update cached array values
            setValue.set ? setValue.set(value) : setArray(setValue, value);
            gl.renderer.state.uniformLocations.set(location, setValue);
        }
    } else {
        if (setValue === value) return;
        gl.renderer.state.uniformLocations.set(location, value);
    }

    switch (type) {
        case 5126:
            return value.length ? gl.uniform1fv(location, value) : gl.uniform1f(location, value); // FLOAT
        case 35664:
            return gl.uniform2fv(location, value); // FLOAT_VEC2
        case 35665:
            return gl.uniform3fv(location, value); // FLOAT_VEC3
        case 35666:
            return gl.uniform4fv(location, value); // FLOAT_VEC4
        case 35670: // BOOL
        case 5124: // INT
        case 35678: // SAMPLER_2D
        case 35680:
            return value.length ? gl.uniform1iv(location, value) : gl.uniform1i(location, value); // SAMPLER_CUBE
        case 35671: // BOOL_VEC2
        case 35667:
            return gl.uniform2iv(location, value); // INT_VEC2
        case 35672: // BOOL_VEC3
        case 35668:
            return gl.uniform3iv(location, value); // INT_VEC3
        case 35673: // BOOL_VEC4
        case 35669:
            return gl.uniform4iv(location, value); // INT_VEC4
        case 35674:
            return gl.uniformMatrix2fv(location, false, value); // FLOAT_MAT2
        case 35675:
            return gl.uniformMatrix3fv(location, false, value); // FLOAT_MAT3
        case 35676:
            return gl.uniformMatrix4fv(location, false, value); // FLOAT_MAT4
    }
}

function addLineNumbers(string) {
    let lines = string.split('\n');
    for (let i = 0; i < lines.length; i++) {
        lines[i] = i + 1 + ': ' + lines[i];
    }
    return lines.join('\n');
}

function flatten(a) {
    const arrayLen = a.length;
    const valueLen = a[0].length;
    if (valueLen === undefined) return a;
    const length = arrayLen * valueLen;
    let value = arrayCacheF32[length];
    if (!value) arrayCacheF32[length] = value = new Float32Array(length);
    for (let i = 0; i < arrayLen; i++) value.set(a[i], i * valueLen);
    return value;
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0, l = a.length; i < l; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function setArray(a, b) {
    for (let i = 0, l = a.length; i < l; i++) {
        a[i] = b[i];
    }
}

let warnCount = 0;
function warn(message) {
    if (warnCount > 100) return;
    console.warn(message);
    warnCount++;
    if (warnCount > 100) console.warn('More than 100 program warnings - stopping logs.');
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/extras/Triangle.js


class Triangle extends Geometry {
    constructor(gl, { attributes = {} } = {}) {
        Object.assign(attributes, {
            position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
        });

        super(gl, attributes);
    }
}

;// CONCATENATED MODULE: ./node_modules/ogl/src/extras/Post.js
// TODO: Destroy render targets if size changed and exists






class Post {
    constructor(
        gl,
        {
            width,
            height,
            dpr,
            wrapS = gl.CLAMP_TO_EDGE,
            wrapT = gl.CLAMP_TO_EDGE,
            minFilter = gl.LINEAR,
            magFilter = gl.LINEAR,
            geometry = new Triangle(gl),
            targetOnly = null,
        } = {}
    ) {
        this.gl = gl;

        this.options = { wrapS, wrapT, minFilter, magFilter };

        this.passes = [];

        this.geometry = geometry;

        this.uniform = { value: null };
        this.targetOnly = targetOnly;

        const fbo = (this.fbo = {
            read: null,
            write: null,
            swap: () => {
                let temp = fbo.read;
                fbo.read = fbo.write;
                fbo.write = temp;
            },
        });

        this.resize({ width, height, dpr });
    }

    addPass({ vertex = defaultVertex, fragment = defaultFragment, uniforms = {}, textureUniform = 'tMap', enabled = true } = {}) {
        uniforms[textureUniform] = { value: this.fbo.read.texture };

        const program = new Program(this.gl, { vertex, fragment, uniforms });
        const mesh = new Mesh(this.gl, { geometry: this.geometry, program });

        const pass = {
            mesh,
            program,
            uniforms,
            enabled,
            textureUniform,
        };

        this.passes.push(pass);
        return pass;
    }

    resize({ width, height, dpr } = {}) {
        if (dpr) this.dpr = dpr;
        if (width) {
            this.width = width;
            this.height = height || width;
        }

        dpr = this.dpr || this.gl.renderer.dpr;
        width = Math.floor((this.width || this.gl.renderer.width) * dpr);
        height = Math.floor((this.height || this.gl.renderer.height) * dpr);

        this.options.width = width;
        this.options.height = height;

        this.fbo.read = new RenderTarget(this.gl, this.options);
        this.fbo.write = new RenderTarget(this.gl, this.options);
    }

    // Uses same arguments as renderer.render, with addition of optional texture passed in to avoid scene render
    render({ scene, camera, texture, target = null, update = true, sort = true, frustumCull = true }) {
        const enabledPasses = this.passes.filter((pass) => pass.enabled);

        if (!texture) {
            this.gl.renderer.render({
                scene,
                camera,
                target: enabledPasses.length || (!target && this.targetOnly) ? this.fbo.write : target,
                update,
                sort,
                frustumCull,
            });
            this.fbo.swap();
        }

        enabledPasses.forEach((pass, i) => {
            pass.mesh.program.uniforms[pass.textureUniform].value = !i && texture ? texture : this.fbo.read.texture;
            this.gl.renderer.render({
                scene: pass.mesh,
                target: i === enabledPasses.length - 1 && (target || !this.targetOnly) ? target : this.fbo.write,
                clear: true,
            });
            this.fbo.swap();
        });

        this.uniform.value = this.fbo.read.texture;
    }
}

const defaultVertex = /* glsl */ `
    attribute vec2 uv;
    attribute vec2 position;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }
`;

const defaultFragment = /* glsl */ `
    precision highp float;

    uniform sampler2D tMap;
    varying vec2 vUv;

    void main() {
        gl_FragColor = texture2D(tMap, vUv);
    }
`;

;// CONCATENATED MODULE: ./js/TargetPool.js
// Render targets shared by the elements of a layer (webgl chunk). Each element draws its passes into two targets (an
// OGL Post's read and write buffers), but only while its mesh is shown: an entrance playing, an effect running.
// Elements take two from the pool then and give them back when the mesh hides, so a page holds about two targets
// per element on screen at once, not two (and, before, more on every resize) for every element on the page. A free
// target of another size is resized in place (its texture and depth storage reallocated) rather than created new.


// Free targets kept for reuse; more are deleted
const KEEP = 4;

class TargetPool {
    constructor(gl) {
        this.gl = gl;
        this.free = [];
        this.created = 0;
        this.live = 0;
    }

    // A target of width × height device pixels: a free one of that size, else any free one resized, else a new one
    get(width, height, options) {
        let index = this.free.findIndex((t) => t.width === width && t.height === height && t.depth === !!options.depth);
        if (index === -1) index = this.free.findIndex((t) => t.depth === !!options.depth);
        if (index !== -1) {
            const target = this.free.splice(index, 1)[0];
            target.setSize(width, height);
            return target;
        }
        this.created++;
        this.live++;
        const target = new RenderTarget(this.gl, { ...options, width, height });
        // Not an element's own texture, which releaseGL() deletes (WebGLPlane.js)
        target.textures.forEach((texture) => (texture.pooled = true));
        return target;
    }

    put(target) {
        if (!target || this.dropped) return;
        this.free.push(target);
        while (this.free.length > KEEP) this.delete(this.free.shift());
    }

    delete(target) {
        const gl = this.gl;
        this.live--;
        gl.deleteFramebuffer(target.buffer);
        target.textures.forEach((texture) => gl.deleteTexture(texture.texture));
        if (target.depthTexture) gl.deleteTexture(target.depthTexture.texture);
        [target.depthBuffer, target.stencilBuffer, target.depthStencilBuffer].forEach((buffer) => buffer && gl.deleteRenderbuffer(buffer));
    }

    // After the context is lost: its objects are gone with it, so they're dropped, not deleted
    drop() {
        this.dropped = true;
        this.free = [];
        this.live = 0;
    }
}

// OGL's Post with its two targets from a pool, taken by acquire() (render() does) and given back by release(). A
// resize changes the size the next targets are taken at, and resizes the held ones in place: OGL's Post made two
// new targets on every resize and never deleted the old ones.
class PooledPost extends Post {
    constructor(gl, pool, { depth = false, programs = null, ...options } = {}) {
        super(gl, options);
        this.pool = pool;
        // The layer's ProgramCache: its passes share their programs with the other elements' (ProgramCache.js)
        this.programs = programs;
        this.options.depth = depth;
    }

    // The size only: no targets until acquire()
    resize({ width, height, dpr } = {}) {
        if (dpr) this.dpr = dpr;
        if (width) {
            this.width = width;
            this.height = height || width;
        }
        dpr = this.dpr || this.gl.renderer.dpr;
        this.options.width = Math.max(1, Math.floor((this.width || this.gl.renderer.width) * dpr));
        this.options.height = Math.max(1, Math.floor((this.height || this.gl.renderer.height) * dpr));
        if (this.fbo.read) {
            this.fbo.read.setSize(this.options.width, this.options.height);
            this.fbo.write.setSize(this.options.width, this.options.height);
        }
    }

    // Takes the targets, if not held. True when newly taken: what they hold is another element's, so draw again
    acquire() {
        if (this.fbo.read) return false;
        const { width, height } = this.options;
        this.fbo.read = this.pool.get(width, height, this.options);
        this.fbo.write = this.pool.get(width, height, this.options);
        return true;
    }

    release() {
        if (!this.fbo.read) return;
        this.pool.put(this.fbo.read);
        this.pool.put(this.fbo.write);
        this.fbo.read = this.fbo.write = null;
        this.uniform.value = null;
    }

    // OGL's addPass() reads the read target's texture, and there may be none yet: render() sets it on each pass anyway.
    // With a ProgramCache, OGL's addPass() with the program from it
    addPass(options = {}) {
        if (this.programs) {
            const { vertex = passVertex, fragment = passFragment, uniforms = {}, textureUniform = 'tMap', enabled = true } = options;
            uniforms[textureUniform] = { value: null };
            const program = this.programs.get({ vertex, fragment, uniforms });
            const pass = { mesh: new Mesh(this.gl, { geometry: this.geometry, program }), program, uniforms, enabled, textureUniform };
            this.passes.push(pass);
            return pass;
        }
        const held = this.fbo.read;
        if (!held) this.fbo.read = { texture: null };
        const pass = super.addPass(options);
        if (!held) this.fbo.read = null;
        return pass;
    }

    render(options) {
        this.acquire();
        return super.render(options);
    }
}

// OGL's Post default pass shaders (OGL 0.0.90, extras/Post.js), which it doesn't export
const passVertex = /* glsl */ `
    attribute vec2 uv;
    attribute vec2 position;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }
`;

const passFragment = /* glsl */ `
    precision highp float;

    uniform sampler2D tMap;
    varying vec2 vUv;

    void main() {
        gl_FragColor = texture2D(tMap, vUv);
    }
`;

;// CONCATENATED MODULE: ./js/animations/Animation.js
class Animation {
    constructor(program, texture, options){
        this.animatedIn = false
		this.options = options || {}
        this.passes = program.passes
        this.program = program
        this.texture = texture
        this.animationParams = {
            offsetX: 0,
            offsetY: 0,
            scaleX: 1,
            scaleY: 1,
            strength: 0,
            opacity: 1
        }
		// Params with efault values
		this.params = {
			progress: 0,
			velocity: 0,
			translateX: 0,
			translateY: 0,
			translateZ: 0
		}
        // this.enabled = false
    }

    play(){
        
        // console.log("Animation::play")
    }

    render(){
        // console.log("Animation::render")

    }

    mouseMove(){
        // console.log("Animation::mouseMove")
    }

    onScroll(){
        // console.log("Animation::onScroll")
    }

    mouseOver(){

    }

    mouseOut(){
        
    }

    enable(){
        this.enabled = true
    }

    disable(){
        this.enabled = false
    }

}
// EXTERNAL MODULE: ./node_modules/animejs/lib/anime.es.js
var anime_es = __webpack_require__(30);
// EXTERNAL MODULE: ./js/utils/functions.js
var functions = __webpack_require__(442);
// EXTERNAL MODULE: ./js/easings.js
var easings = __webpack_require__(314);
;// CONCATENATED MODULE: ./js/animations/InAnimation.js






class InAnimation extends Animation {
    constructor(program, texture, options) {
        super(program, texture, options)
        this.delay = this.options.delay || 0
    }

    play(options) {

        super.play()

        if(options)
            this.options = (0,functions/* extend */.l7)({}, this.options, options)

        this.duration = this.options.in.duration
        this.delay = this.options.in.delay

        if (this.animejs) this.animejs.remove(this.animationParams)

        const self = this
        let begun = false

        this.lastTime = 0
        this.animationParams.progress = 0
        this.animationParams.velocity = 0

		this.params.progress = 0

        this.animejs = (0,anime_es/* default */.Z)({
            targets: this.animationParams,
            offset: 0,
			progress: 1,
            // easing: this.options.easing,
            duration: this.duration, // ignored by a spring easing, which sets its own (easings.js)
			easing: (0,easings/* resolveEasing */.q)(this.options.in.easing),
			// duration: agl.options.in.duration,
            delay: this.delay,
			begin: function(){
				begun = true
				self.options.onStart()
			},
            change: function () {
                self.started = true
                // if(this.currentTime > 0){
				// 	self.params.velocity = 1000 * (self.animationParams.progress - self.params.progress) / (this.currentTime - self.lastTime)
                //     self.lastTime = this.currentTime
                // }
				self.params.progress = self.animationParams.progress
            },
            complete: function () {
				// anime.js skips begin when its first frame is already past the end (a slow first frame, a short
				// duration): the entrance still starts before it ends
				if (!begun) self.options.onStart()
				begun = false
				self.params.progress = 1
				self.params.velocity = 0
				self.options.onComplete()
            }
        });

    }

	reset(){
		this.params.progress = 0
	}

    render() {

	}
}
;// CONCATENATED MODULE: ./js/shaders/vertex.js
const vertex = /* glsl */ `

precision mediump float;

attribute vec3 position;
attribute vec2 uv;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
varying vec2 vUv;
uniform vec2 scale;
uniform float radius;
uniform float strength; // reversed progress 
uniform float bend;
uniform float stretch;
uniform float curl;
uniform float progress;
// uniform float offset;
// uniform float angle;
uniform float origin;
uniform float fisheye;
uniform sampler2D tAlphaMap;
uniform float displacement;
uniform float scrollDisplacement;
uniform float planeW;
uniform float planeH;
uniform float planeX;
uniform float planeY;
uniform float tAspect;
uniform vec3 translate;
uniform vec3 rotate;
uniform vec2 p1;
uniform vec2 p2;
uniform vec2 p3;
uniform vec2 p4;
uniform float easeX;
uniform float easeY;

#define PI 3.1415926535897932384626433832795

//@agl vertex-head

float ease(float type, float value){
	if(type == 1.){
		return 1. - sin(value * PI / 2. + PI / 2.);
	}else if(type == 2.){
		return sin(value * PI / 2.);
	}else if(type == 3.){
		return 1. - sin(value * PI);
	}else{
		return value;
	}
}

void main() {
    vUv = uv;
	vec3 pos = position;

	// vec4 colorAlpha = texture2D(tAlphaMap, uv);

	// pos.z += colorAlpha.r * displacement * .1;

	// pos.x *= scale.x;
	// pos.y *= scale.y;

	if(curl != 0.){
		// constraint LEFT

		float bendOrigin = 1. - curl; // 0 - from left

		// if(pos.x > bendOrigin){

			// pos.x -= bendOrigin;

			//rotate before bend

			// float rot = angle - PI / 2.;
			float rot = - PI / 2.;
			mat2 m = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));
			pos.xy *= m;

			if(pos.x > bendOrigin){
				pos.x -= bendOrigin;

				// float r = radius / strength;
				float r = radius * pow(curl, .5) / curl;
				float x = pos.x ;
				float a = x / r ;
				pos.z = (1. - cos(a)) * r;
				pos.x = sin(a) * r;
				pos.x += bendOrigin;
			}

			//rotate back after bend
			m = mat2(cos(-rot), -sin(-rot), sin(-rot), cos(-rot));
			pos.xy *= m;

			// pos.x += bendOrigin;

		// }

		//constraint RIGHT

		// pos.x += .5;

		// float r = radius / strength;
		// float x = 1. - pos.x;
		// float a = x / r ;
		// pos.z = (1. - cos(a)) * r;
		// pos.x = 1. - sin(a) * r;

		// pos.x -= .5;

		//bend end

		// pos.z += pow(1. - (pos.x - (1. - strength)), 2.);

	}




	// pos.x += pow(pos.x, 2.) * (scale.x - 1.);
	// pos.y += pow(1. + pos.y, 1.5) ;
	// pos.y += pow(1. + pos.y, 2.) * ( scale.y - 1.);

	// vec2 offsetxy = vec2(offset * sin(angle), offset  * cos(angle));

	// pos += vec3(offsetxy, 0.);


	//   pos += vec3(.5 + offset.x, -.5 + offset.y, 0.);


	// mat2 m = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
	// pos -= vec3(.5, -.5, 0.);
	// pos.xy *= m;
	// pos += vec3(.5, -.5, 0.);


	//test scale
	//   pos.x += pow(pos.x, 3.) * (scale.x - 1.);


	// test
	float screenY;
	if(fisheye != 0.){
		screenY = (pos.y) * planeH + planeY - .5; 
		pos.z += sin((screenY) * PI) * fisheye;
	}

	// Effects (AnimateGL.registerEffect and registerHoverEffect, with a shader) deform pos here
	//@agl vertex

	//center 3D bend in / out based on scroll


	// pos.z += strength * 3. * smoothstep(-.5, .5, pos.x) * smoothstep(-.5, .5, pos.y);
	// pos.x += strength * 3. * smoothstep(-.5, .5, pos.x);
	// pos.z += 5. * strength * cos(pos.x * M_PI / 2.) * cos(pos.y * M_PI / 2.);

	// pos.z -= 1. * strength + 3. * (sin((pos.x - .5)* M_PI * .5)) * (sin((pos.y - .5)* M_PI * .5)) * strength;
	// pos.z = -2. * strength + (.5 * (sin((pos.x - .5)* M_PI * 1.)) * (sin((pos.y - .5)* M_PI * 1.)))* sin(strength * M_PI);
		
	// pos.z += - 3. * ( sin(((uv.x) * M_PI / 2.)) + sin(((uv.y) * M_PI / 2.))) * sin(strength * M_PI);
	// if(strength > .3)
	// 	pos.z -= pow(strength - .3, 2.) * 10.;


	vec3 start = pos;

	if (rotate.x != 0. || rotate.y != 0. || rotate.z != 0.) {
		float asp = 64. / 40.;
		start.x *= asp;

		if (rotate.x != 0.) {
			float cosX = cos(rotate.x);
			float sinX = sin(rotate.x);
			mat2 m1 = mat2(cosX, -sinX, sinX, cosX);
			start.yz *= m1;
		}

		if (rotate.y != 0.) {
			float cosY = cos(rotate.y);
			float sinY = sin(rotate.y);
			mat2 m2 = mat2(cosY, -sinY, sinY, cosY);
			start.xz *= m2;
		}

		if (rotate.z != 0.) {
			float cosZ = cos(rotate.z);
			float sinZ = sin(rotate.z);
			mat2 m3 = mat2(cosZ, -sinZ, sinZ, cosZ);
			start.xy *= m3;
		}

		start.x /= asp;
	}

	start += translate;

	// progress is 1 once the entrance has ended. Easings that overshoot take it past 1, and ones that anticipate
	// below 0: without corner timings the element moves past its place (or starts further out) and back, which is
	// the point of a spring or an elastic easing, except along z, where going past the camera would turn it inside
	// out. With corner timings each corner's smoothstep stays within its start and end.
	if(progress != 1.){
		if (p1.x != 0. || p2.x != 0. || p3.x != 0. || p4.x != 0. || 
			p1.y != 1. || p2.y != 1. || p3.y != 1. || p4.y != 1. ){
			float xEase = ease(easeX, uv.x);
			float yEase = ease(easeY, uv.y);

			float currentPos = mix(
				mix(smoothstep(p1.x, p1.y, progress), smoothstep(p2.x, p2.y, progress), xEase),
				mix(smoothstep(p3.x, p3.y, progress), smoothstep(p4.x, p4.y, progress), xEase),
				yEase
			);

			pos = mix(start, pos, currentPos);
		} else {
			float z = mix(start.z, pos.z, clamp(progress, 0., 1.));
			pos = mix(start, pos, progress);
			pos.z = z;
		}
	} 

	// if(displacement != 0.){

		// vec2 displacement_xy = vec2(displacement * sin(angle), displacement * cos(angle));
		// pos.xy += (1. - colorAlpha.r) * displacement_xy;

	// }


  
	gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

`;

;// CONCATENATED MODULE: ./js/shaders/fragment.js
const fragment = /* glsl */ `
    precision highp float;
    uniform sampler2D tMap;
    uniform float tScale;
    uniform vec4 cornerRadius1;
    uniform vec4 cornerRadius2;
    uniform vec2 planeSize;
    varying vec2 vUv;
    // 1 inside the corner with radii r (fractions of the plane) whose outer point is at corner, 0 outside it,
    // smoothed over about a pixel. p and corner are from the top left, as CSS measures
    float cornerMask(vec2 p, vec2 corner, vec2 r) {
        if(r.x <= 0. || r.y <= 0.) return 1.;
        // Distance from the corner, so only the corner's own r.x by r.y box is cut
        vec2 d = abs(p - corner);
        if(d.x >= r.x || d.y >= r.y) return 1.;
        float len = length((r - d) / r);
        // Distance outside the ellipse, roughly in device pixels
        float px = (len - 1.) * min(r.x * planeSize.x, r.y * planeSize.y);
        return clamp(.5 - px, 0., 1.);
    }
    // The element's border-radius: cornerRadius1 is top left and top right, cornerRadius2 bottom right and
    // bottom left. The radii are fractions of the plane's size, so the corners follow the plane as it bends
    float roundedCorners() {
        vec2 p = vec2(vUv.x, 1. - vUv.y);
        return cornerMask(p, vec2(0., 0.), cornerRadius1.xy)
            * cornerMask(p, vec2(1., 0.), cornerRadius1.zw)
            * cornerMask(p, vec2(1., 1.), cornerRadius2.xy)
            * cornerMask(p, vec2(0., 1.), cornerRadius2.zw);
    }
    // From element space (vUv, the mouse) into a texture cropped to the element: scale is the texture's aspect ratio
    // over the element's, 1 for none
    vec2 cropTo(vec2 p, float scale) {
        p -= .5;
        if(scale < 1.)
            p.y *= scale;
        else if (scale > 1.)
            p.x /= scale;
        return p + .5;
    }
    vec2 crop(vec2 p) {
        return cropTo(p, tScale);
    }
    // Textures are uploaded premultiplied (premultiplyAlpha): a sample back to straight alpha, as the effects work in
    vec4 straight(vec4 c) {
        return c.a > 0. ? vec4(c.rgb / c.a, c.a) : c;
    }
    //@agl fragment-head
    void main() {
        // Effects (AnimateGL.registerEffect and registerHoverEffect, with a shader) are spliced in at the //@agl lines
        // (AnimatedPlane.shaderSource). They work in element space, p from the bottom left like the mouse, and then
        // map into the texture, so they stay centred on the mouse when the image is cropped to the element. aspect
        // makes distances round on the element; flow moves the texture read.
        vec2 aspect = vec2(planeSize.x / max(planeSize.y, 1.), 1.);
        vec2 p = vUv;
        vec2 flow = vec2(0.);
        //@agl fragment-uv
        vec2 uv = crop(p);
        // Straight alpha for the effects, multiplied once below. Multiplied a second time, text without a background
        // of its own drew bolder (dark) or thinner (light) than the page. Effects that sample a texture themselves
        // pass it through straight() too.
        vec4 color = straight(texture2D(tMap, uv - flow));
        //@agl fragment-color
        color.a *= roundedCorners();
        gl_FragColor = vec4(color.rgb * color.a, color.a);
    }
`;


;// CONCATENATED MODULE: ./js/shaders/fade.js
const fade_fragment = /* glsl */`

// precision highp float;
precision mediump float;

uniform sampler2D tMap;
uniform sampler2D tAlphaMap;
uniform sampler2D tTransition;
uniform float strength;
uniform float progress;
uniform float speed;
uniform float threshold;
uniform float displacement;
uniform float angle;
uniform float tAspect;
uniform vec2 uDirection;
uniform float planeW;
uniform float planeH;
uniform float planeX;
uniform float planeY;
uniform float alphaMapAngle;
uniform vec3 velocity;

// uniform float scroll;

varying vec2 vUv;

// distance from line (pt1, pt2 and point pt3)
float dist(vec2 pt1, vec2 pt2, vec2 pt3){
   vec2 v1 = pt2 - pt1; //line vector
   vec2 v2 = pt1 - pt3;
   vec2 v3 = vec2(v1.y,-v1.x);
   return abs(dot(v2,normalize(v3)));
}

vec2 vectorFromAngle(float angleDeg) {
    float angleRad = radians(angleDeg);
    return vec2(cos(angleRad), sin(angleRad));
}

void main() {
    vec2 uv = vUv;
	/*
	vec2 uvAlphaMap = uv;
	if( tAspect > 1. ){
		uvAlphaMap -= .5;
		uvAlphaMap.y /= tAspect;
		uvAlphaMap += .5;
	} 
	
    vec4 colorAlpha = texture2D(tAlphaMap, uvAlphaMap);

    float spread = 0.01;
    vec4 colorAlpha2 = texture2D(tAlphaMap, uvAlphaMap + vec2(spread, spread));
    vec4 colorAlpha3 = texture2D(tAlphaMap, uvAlphaMap + vec2(-spread, spread));
    vec4 colorAlpha4 = texture2D(tAlphaMap, uvAlphaMap + vec2(spread, -spread));
    vec4 colorAlpha5 = texture2D(tAlphaMap, uvAlphaMap + vec2(-spread, -spread));
	colorAlpha = (colorAlpha + colorAlpha2 + colorAlpha3 + colorAlpha4 + colorAlpha5) / 5.;

    float d = 1. - (colorAlpha.r + colorAlpha.g + colorAlpha.b) / 3.; 
	
*/

	vec4 color = texture2D(tMap, uv);

	float distMax = 1.;

	float d = 0.;
	if(alphaMapAngle == 0.){
		d = uv.x;
	}else if(alphaMapAngle == 180.){
		d = 1. - uv.x;
	}else if(alphaMapAngle == 90.){
		d = uv.y;
	}else if(alphaMapAngle == 270.){
		d = 1. - uv.y;
	}else if(alphaMapAngle == 45.){
		d = (uv.y * uv.y + uv.x * uv.x) / 2.;
	}else if(alphaMapAngle == 135.){
		d = (uv.y * uv.y + (1. - uv.x) * (1. - uv.x)) / 2.;
	}else if(alphaMapAngle == 225.){
		d = ((1. - uv.y) * (1. - uv.y) + (1. - uv.x) * (1. - uv.x)) / 2.;
	}else if(alphaMapAngle == 315.){
		d = (uv.x * uv.x + (1. - uv.y) * (1. - uv.y)) / 2.;
	}else if(alphaMapAngle == -1.){
		d = (color.r + color.g + color.b) / 3.;
	}else if(alphaMapAngle == -2.){
		d = (1. - (color.r + color.g + color.b) / 3.);
	}else if(alphaMapAngle == -4.){
		d = distance(uv, vec2(.5)) / (sqrt(2.) * .5);
	}else if(alphaMapAngle == -8.){
		d = distance(uv, vec2(.0)) / sqrt(2.);
	}else if(alphaMapAngle == -7.){
		d = distance(uv, vec2(1., 0.)) / sqrt(2.);
	}else if(alphaMapAngle == -6.){
		d = distance(uv, vec2(0., 1.)) / sqrt(2.);
	}else if(alphaMapAngle == -5.){
		d = distance(uv, vec2(1., 1.)) / sqrt(2.);
	}


	//test
	// float d = 1.;


	// d *= distance(uv, vec2(.0)) / ( sqrt(2.) / 1.); // distance from uv to point 
	// d = pow(d, 3.);
	// d *= dist(vec2(0., 0.), vec2(0., 1.), uv); //distance form uv to line de,fined by two points


	// d *= uv.x;
	// d *= uv.y;

    //displacement
	float dis = displacement;
	// dis = 1.; // test displacement
    if(dis != 0.){
        vec2 displacement_xy = vec2(dis * sin(angle), -dis * cos(angle));
        uv -= .5;
        uv -= d * strength * displacement_xy; 
        uv += .5;
        if(uv.x < 0. || uv.x > 1. || uv.y < 0. || uv.y > 1.) discard;
    }

	/** RGB split */
	// vec2 direction = vectorFromAngle(alphaMapAngle);
    // vec4 colorR = texture2D(tMap, uv + velocity.xy);
    // vec4 colorGBA = texture2D(tMap, uv);
    // vec4 colorBA = texture2D(tMap, uv - velocity.xy );
	// vec4 color = vec4(colorR.r, colorGBA.gba);

	



	// d *= color.r / progress;

    // vec2 distanceVector = uv - uDirection;
    // float dist;
  
    
    // dist = sqrt(dot(distanceVector, distanceVector));

    /*
    if(uDirection.y == .5 )
        dist = uv.x;
    else if(uDirection.x == .5 )
        dist = uv.y;
    else if(uDirection.x == -.5 )
        dist = 1. - uv.y;
    else if(uDirection.y == -.5 )
        dist = 1. - uv.x;
    // bottom right
    else if(uDirection.x == 1. && uDirection.y == 0.){
        dist = abs(-uv.x + uv.y + 1.) / sqrt(2.);
        distMax = sqrt(2.);
    }
    // top right
    else if(uDirection.x == 1. && uDirection.y == 1.){
        dist = abs(uv.x + uv.y - 2.) / sqrt(2.);
        distMax = sqrt(2.);
    }
    // top left
    else if(uDirection.x == 0. && uDirection.y == 1.){
        dist = abs(-uv.x + uv.y - 1.) / sqrt(2.);
        distMax = sqrt(2.);
    }
    // bottom left
    else if(uDirection.x == 0. && uDirection.y == 0.){
        dist = abs(uv.x + uv.y) / sqrt(2.);
        distMax = sqrt(2.);
    }

    */

    // d = dist;

	
	// strips 
	/*
	float stripes = 3.;
	float stripesDelay = .0;
	float duration = 1. - stripesDelay * (stripes - 1.);
	float progressStripes = (progress - floor((1. - uv.y) * stripes) * stripesDelay) / duration;  
	*/

    if(progress != 1.){

		if(threshold >= 3.){

            color *= progress;

        }else{
            // color.rgb /= .2 + .8 * smoothstep(dist, dist + s, progress * distMax * (1. + s));
            // color.a *= smoothstep(d, d + threshold, progressStripes * distMax * (1. + threshold));        
            // color.a *= smoothstep(d, d + threshold, progress * (1. + threshold));    

			// The fade scales the alpha: inside smoothstep, anti-aliased edges (text) were raised until the end, so text looked bolder while it faded in.
			// The colour is premultiplied (the frame drawn by fragment.js), so all of it is scaled: scaling only the
			// alpha left light areas at full brightness over what's behind until the end.
			color *= smoothstep(0., 1., (progress * (1. + threshold) - d) / threshold);
		}
    }

    gl_FragColor = color;    
}

`;
;// CONCATENATED MODULE: ./js/passes/Fade.js



class FadePass{
    constructor(post, options){
        
        return post.addPass({
            fragment: fade_fragment,
            uniforms: {
                strength: { value: 1 },
                progress: { value: 0 },
                speed: { value: 0 },
                velocity: { value: new Vec3(0) },
                tAlphaMap: { value: null },
                threshold: { value: options.fade.threshold},
                // brightness: { value: 1},
                displacement: { value: 0},
                angle: { value: 0},
                planeW: {value: 0},
                planeH: {value: 0},
                planeX: {value: 0},
                planeY: {value: 0},
                // scroll: {value: 0},
				tAspect: { value: 1},
				alphaMapAngle: { value: 0}, // from left to right

            },
            transparent: true,
        });
    }
}
;// CONCATENATED MODULE: ./js/WebGLPlane.js
// The webgl chunk's half of an animated element (AnimatedPlane.js has the core's): drawing it with WebGL. Its methods
// are copied onto AnimatedPlane's prototype when the chunk loads (webgl.js), replacing the core's stubs, so `this` is
// the element's AnimatedPlane and Pro's effects keep using plane.program, plane.texture and plane.gl as before.








// playHover()'s amount at t, 0 to 1 through it: eases up to 1 over the first 35%, holds, eases back to 0 over the last 35%
function playbackAmount(t) {
    const edge = Math.min(t, 1 - t) / 0.35;
    if (edge >= 1) return 1;
    return Math.max(0, edge * edge * (3 - 2 * edge));
}
const programOptions = {
    depthTest: false, // Render meshes that were added later to scene in front
    transparent: true,
    // depthFunc: gl.ALWAYS,
    // Don't cull faces so that plane is double sided - default is gl.BACK
    cullFace: null,
};


// Browsers paint a box's edges and its content (boxes, text, images) on whole device pixels: a box at y 100.29 at 2x
// is painted at device pixel 201. Measured in Chromium on a Mac's 2x screen, 26 Oct 2026. Chrome under Playwright's
// deviceScaleFactor (the 25 Oct measurement, which made this whole CSS pixels in Chromium) scales a 1x layout, so
// there it paints on whole CSS pixels: that's emulation, not a real 2x screen.

// A CSS length rounded to whole device pixels, half up as the browser rounds. devicePixelRatio is a float (1.8 at 90%
// zoom on a 2x screen is 1.7999999523), so an edge exactly half a device pixel in (188.0556 x 1.8 = 338.5) came out a
// hair under and rounded down, a device pixel off the element: the tiny bias puts it back.
function roundDevice(v, dpr) {
    return Math.round(v * dpr + 1e-3) / dpr;
}

// The rect with its edges rounded where the browser paints the element: the plane covers the same pixels as the
// element, imageTexture() draws an image into them as the browser does, and renderHTMLToCanvas() draws the element
// from that corner, so nothing moves when the element comes back after its entrance
function snapRect(rect, dpr) {
    const d = dpr || 1;
    const round = (v) => roundDevice(v, d);
    const x = round(rect.left);
    const y = round(rect.top);
    return new DOMRect(x, y, round(rect.right) - x, round(rect.bottom) - y);
}

// Only macOS draws text with -webkit-font-smoothing (-moz-osx-font-smoothing in Firefox)
const MAC = typeof navigator !== 'undefined' && /Macintosh/.test(navigator.userAgent);

// Whether an element or any element in it has thin font smoothing (antialiased or grayscale) on a Mac
function thinSmoothing(element) {
    if (!MAC || !element) return false;
    const thin = (el) => {
        const style = getComputedStyle(el);
        const value = style.getPropertyValue('-webkit-font-smoothing') || style.getPropertyValue('-moz-osx-font-smoothing');
        return value === 'antialiased' || value === 'grayscale';
    };
    return thin(element) || Array.prototype.some.call(element.querySelectorAll('*'), thin);
}

// A computed style's four border radii: top left, top right, bottom right, bottom left
function cornerRadii(style) {
    return [style.borderTopLeftRadius, style.borderTopRightRadius, style.borderBottomRightRadius, style.borderBottomLeftRadius];
}

// Four computed radii as (x, y) pixels in a w by h box. Radii that don't fit the box are scaled down together, as CSS
// does (9999px makes a pill). A radius computed as calc() (a length plus a percentage) isn't parsed and stays square
function cornerPixels(values, w, h) {
    const corners = values.map(function (value) {
        const parts = (value || '0').split(' ');
        const size = function (part, length) {
            const n = parseFloat(part) || 0;
            return part.endsWith('%') ? (n / 100) * length : n;
        };
        return [size(parts[0], w), size(parts[1] || parts[0], h)];
    });
    const [tl, tr, br, bl] = corners;
    const f = Math.min(1, w / (tl[0] + tr[0]), w / (bl[0] + br[0]), h / (tl[1] + bl[1]), h / (tr[1] + br[1])) || 0;
    return corners.map(function (c) {
        return [c[0] * f, c[1] * f];
    });
}

class WebGLPlane {
    initAnimationParams() {
        this.animationParams = {
            translateX: 0,
            translateY: 0,
            translateZ: 0,
        };
    }

    init3d() {
        if (this.texture) return;
        const gl = this.gl;
        this.texture = new Texture(gl, {
            // wrapS: gl.MIRRORED_REPEAT,
            // wrapT: gl.MIRRORED_REPEAT,
            premultiplyAlpha: true,
            // An image is already drawn at the element's size (imageTexture()): mipmaps would only blur it
            generateMipmaps: false,
            minFilter: gl.LINEAR,
        });

        const geometry = new Plane(gl, {
            widthSegments: 20,
            heightSegments: 20,
        });

        this.programSource = this.shaderSource();
        // Compiled once for the elements with the same shaders, each with its own uniforms (ProgramCache.js)
        this.program = this.layer.programs.get({
            ...this.programSource,
            uniforms: {
                tMap: { value: this.texture },
                tAspect: { value: 2 },
                tScale: { value: 1 },
                cornerRadius1: { value: new Vec4(0, 0, 0, 0) },
                cornerRadius2: { value: new Vec4(0, 0, 0, 0) },
                planeSize: { value: new Vec2(1, 1) },
                // offset: { value: 0 },
                translate: { value: new Vec3(0, 0, 0) },
                rotate: { value: new Vec3(0, 0, 0) },
                displacement: { value: 0 },
                scrollDisplacement: { value: 0 },
                scale: { value: new Vec2(1, 1) },
                resolution: { value: new Vec2(300, 300) },
                uMouse: { value: new Vec2(10, 10) },
                radius: { value: 0.5 },
                strength: { value: 0.5 },
                progress: { value: 0.5 },
                center: { value: new Vec2(0.7, 0.7) },
                direction: { value: new Vec2(-0.001, -0.001) },
                time: { value: 0 },
                angle: { value: 0 },
                bend: { value: 0 },
                fisheye: { value: 0 },
                stretch: { value: 0 },
                curl: { value: 0 },
                tAlphaMap: { value: this.texture },
                planeW: { value: 0 },
                planeH: { value: 0 },
                planeX: { value: 0 },
                planeY: { value: 0 },
                p1: { value: new Vec2(0, 1) },
                p2: { value: new Vec2(0, 1) },
                p3: { value: new Vec2(0, 1) },
                p4: { value: new Vec2(0, 1) },
                easeX: { value: 1 },
                easeY: { value: 1 },
            },
            ...programOptions,
        });
        this.addEffectUniforms();

        // this.program.rect = new Vec4()
        // Its two render targets come from the layer's pool while the mesh is shown (TargetPool.js)
        this.post = new PooledPost(gl, this.layer.pool, {
            dpr: this.layer.dpr,
            targetOnly: true,
            programs: this.layer.programs,
        });

        // add initial pass, to render texture for other passes
        this.post.addPass({
            transparent: true,
        });

        this.alphaMap = new Texture(gl, {});

        this.passes = {};

        this.passes.fade = new FadePass(this.post, this.options.in);
        this.passes.fade.uniforms.tAlphaMap.value = this.alphaMap;

        // this.liquidPass = new LiquidPass(this.post)
        // this.liquidPass.enabled = false

        this.mesh = new Mesh(gl, { geometry, program: this.program });
        this.hideMesh();

        this.zPosition = 0;

        this.initAnimationParams();
        this.initAnimations();

        // Created again after a lost context, or after the element came back to the page: the images it had
        if (this.restoreImages) {
            this.restoreImages = false;
            if (this.textureImg.complete && this.textureImg.naturalWidth) this.applyTextures();
            if (this.noEntrance) {
                this.options.in.fade.enabled = false;
                this.animations.in.params.progress = 1;
            } else if (this.animatedIn && !this.entranceAnimamtionPlaying) {
                // The entrance has played: the effects draw its end state
                this.animations.in.params.progress = 1;
            }
        }
    }

    // The loaded image (or the HTML drawn by html2canvas) as the texture, and the alpha map
    applyTextures() {
        const textureImg = this.textureImg;
        this.post.passes.forEach(function (pass) {
            if (pass.uniforms.tAspect) pass.uniforms.tAspect.value = textureImg.naturalWidth / textureImg.naturalHeight;
        });
        this.texture.image = this.imageTexture(textureImg);
        this.alphaMap.image = this.alphaMapImg;
        this.layer.wake();
    }

    // An image as the texture, drawn into a canvas of the element's size in device pixels the way the browser draws
    // the image itself: cropped as object-fit: cover crops it, with its edges on whole device pixels. The plane then shows
    // it pixel for pixel, the same as the image when the animation ends. Drawn whole and scaled by the GPU (with
    // mipmaps), it looked softer. Anything else (the HTML drawn by html2canvas) is returned as it is.
    imageTexture(img) {
        if (!this.isImage || !img || !img.naturalWidth || !img.naturalHeight) return img;
        const dpr = this.layer.dpr;
        const rect = this.domElement.getBoundingClientRect();
        const box = snapRect(rect, dpr);
        // The image's content box, from the element's unrounded box as the browser computes it
        let width = rect.width;
        let height = rect.height;
        if (getComputedStyle(this.domElement).objectFit === 'cover') {
            const scale = Math.max(rect.width / img.naturalWidth, rect.height / img.naturalHeight);
            width = img.naturalWidth * scale;
            height = img.naturalHeight * scale;
        }
        const left = rect.left + (rect.width - width) / 2;
        const top = rect.top + (rect.height - height) / 2;
        // Its edges on whole device pixels, as the browser paints it (snapRect())
        const round = (v) => roundDevice(v, dpr);
        const x = round(left);
        const y = round(top);
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(box.width * dpr));
        canvas.height = Math.max(1, Math.round(box.height * dpr));
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, (x - box.x) * dpr, (y - box.y) * dpr, (round(left + width) - x) * dpr, (round(top + height) - y) * dpr);
        this.textureSource = img;
        return canvas;
    }

    // Lets go of the element's WebGL objects (deleting them, unless they were lost with the context): when it
    // leaves the page, or after a lost context. init3d() creates them again when the element is drawn next.
    releaseGL(lost) {
        if (!this.mesh) return;
        this.hideMesh();
        if (this.mesh.parent) this.mesh.setParent(null);
        // A hover effect's own WebGL objects (Pro's field of the mouse's moves, proFeatures.js)
        if (this.hoverField) {
            if (!lost && this.hoverField.remove) this.hoverField.remove();
            this.hoverField = null;
        }
        if (!lost) {
            const gl = this.gl;
            // Textures it uses, its own and an effect's (a second image, a field), but not the pool's targets
            const textures = new Set([this.texture, this.alphaMap]);
            for (const program of [this.program, ...this.post.passes.map((pass) => pass.program)]) {
                for (const name in program.uniforms) {
                    const value = program.uniforms[name].value;
                    if (value instanceof Texture && !value.pooled) textures.add(value);
                }
            }
            textures.forEach((texture) => gl.deleteTexture(texture.texture));
            this.post.passes.forEach((pass) => pass.program.remove());
            this.post.geometry.remove();
            this.mesh.geometry.remove();
            this.program.remove();
        }
        this.mesh = this.program = this.programSource = this.texture = this.alphaMap = this.post = this.passes = null;
        this.animations.in = null;
        this.postWidth = this.postHeight = 0;
        this.cornerRadiusKey = null;
        this.textureSource = null;
        // The effects' init() runs again, for their own objects
        this.scrollEffectStarted = this.hoverEffectStarted = false;
        this.restoreImages = true;
    }

    // The context is lost: nothing can be drawn, so each element is shown as itself (skipEntrance() shows the
    // ones whose entrance starts meanwhile)
    onContextLost() {
        this.dropEffects();
        this.hideMesh();
        this.hoverPlayback = null;
        if (this.needsWebGL() && !(this.manual && !this.playRequested())) this.showDomElement();
    }

    // The context is back, without any of the objects: they're created again as the elements are drawn. Elements
    // that haven't played their entrance yet hide again, to play it on entering the view.
    onContextRestored() {
        this.releaseGL(true);
        if (!this.started || this.detached || this.failed || !this.needsWebGL()) return;
        if (this.noEntrance) {
            this.animatedIn = false;
            this.effectsReady = false;
            if (this.inViewport) this.prepareEffects();
        } else if (this.options.in.lockToScrollbar) {
            if (this.inViewport) {
                this.viewportEntered = false;
                this.hideDomElement();
                this.onViewportEnter();
            }
        } else if (!this.animatedIn && !this.inViewport) {
            this.hideDomElement();
        }
    }

    // An entrance starting while the context is lost: the element is shown as itself, with the entrance's events
    skipEntrance() {
        this.showDomElement();
        if (this.options.in.live || this.options.in.lockToScrollbar) return;
        this.onEntranceAnimationStart();
        this.onEntranceAnimationEnd();
    }

    // Without an entrance (agl-in-none): loads the image and leaves the mesh as an entrance ends, so the effects
    // can draw it in the element's place (AnimatedPlane.prepareEffects())
    async prepareEffectsWebGL() {
        if (this.animatedIn || !this.isImage || !(this.hoverEffect || this.scrollEffect) || this.layer.contextLost) return;
        this.animatedIn = true;
        const resets = this.resets;
        if (!this.mesh) this.init3d();
        if (!this.mesh.parent) this.mesh.setParent(this.scene);
        try {
            await this.loadTextures();
        } catch (error) {
            console.warn('AnimateGL:', error);
            this.failed = true;
            return;
        }
        // reset() or a class change while waiting
        if (this.resets !== resets || !this.noEntrance) return;
        // Lost meanwhile: prepared again once it's restored
        if (this.layer.contextLost) return (this.animatedIn = false);
        // Restored meanwhile, or it left the page and came back: its objects are created again
        if (!this.mesh) this.init3d();
        if (!this.mesh.parent) this.mesh.setParent(this.scene);
        this.texture.image = this.imageTexture(this.textureImg);
        this.options.in.fade.enabled = false;
        this.animations.in.params.progress = 1;
        this.updateUniformValues();
        this.effectsReady = true;
        this.layer.wake();
    }

    // The plane's shaders: the core's, with the shader chunks of this element's effects spliced in at the //@agl
    // lines. An effect's shader is { uniforms, vertexHead, vertex, fragmentHead, fragmentUv, fragmentColor }:
    // uniforms maps names to their starting values (a number, [x, y] for a vec2, null for a texture, which starts as
    // the element's own, or a function of the plane that returns one); vertexHead and fragmentHead hold declarations and functions (a string or an array of them,
    // each added once, so effects can share one); vertex deforms pos; fragmentUv moves p (element space, 0 to 1 from
    // the bottom left) or flow (subtracted from the texture coordinate); fragmentColor changes color, read at uv.
    shaderSource() {
        const parts = { 'vertex-head': [], vertex: [], 'fragment-head': [], 'fragment-uv': [], 'fragment-color': [] };
        const keys = { vertexHead: 'vertex-head', vertex: 'vertex', fragmentHead: 'fragment-head', fragmentUv: 'fragment-uv', fragmentColor: 'fragment-color' };
        for (const effect of [this.entranceEffect, this.scrollEffect, this.hoverEffect]) {
            const shader = effect && effect.shader;
            if (!shader) continue;
            for (const key in keys) {
                for (const chunk of [].concat(shader[key] || [])) {
                    const list = parts[keys[key]];
                    if (!list.includes(chunk)) list.push(chunk);
                }
            }
        }
        const splice = (source) => source.replace(/^[ \t]*\/\/@agl ([a-z-]+)[ \t]*$/gm, (line, name) => (parts[name] || []).join('\n'));
        return { vertex: splice(vertex), fragment: splice(fragment) };
    }

    // The uniforms of this element's effects that the program doesn't have yet. A value given as a function of the
    // plane (an entrance's from its options) is set again each time, as a class change can change the options.
    addEffectUniforms() {
        const uniforms = this.program.uniforms;
        for (const effect of [this.entranceEffect, this.scrollEffect, this.hoverEffect]) {
            const values = (effect && effect.shader && effect.shader.uniforms) || {};
            for (const name in values) {
                const value = values[name];
                if (typeof value === 'function') {
                    if (uniforms[name]) uniforms[name].value = value(this);
                    else uniforms[name] = { value: value(this) };
                    continue;
                }
                if (uniforms[name]) continue;
                uniforms[name] = { value: value === null ? this.texture : Array.isArray(value) ? new Vec2(value[0], value[1]) : value };
            }
        }
    }

    // After a class change picks effects with other shaders: the program for the new source (compiled, or another
    // element's) in the same Program object, which the mesh and the animations hold, with the same uniforms
    // (ProgramCache.switch())
    updateProgram() {
        // Lost: compiled from the new classes once it's restored
        if (this.layer.contextLost) return;
        const source = this.shaderSource();
        if (source.vertex === this.programSource.vertex && source.fragment === this.programSource.fragment) return this.addEffectUniforms();
        this.layer.programs.switch(this.program, { ...source, ...programOptions });
        this.programSource = source;
        this.addEffectUniforms();
    }

    renderScrollEffect(velocity) {
        const ready = this.effectsReady && !this.failed && (this.mesh || this.restoreImages);
        const active = ready && this.inViewport && Math.abs(velocity) > 0.001;
        if (active && !this.scrollEffectActive) {
            // Its GL objects were released (lost context, or taken off the page and put back): created again
            if (!this.mesh) this.init3d();
            if (!this.scrollEffectStarted && this.scrollEffect.init) this.scrollEffect.init(this);
            this.scrollEffectStarted = true;
            this.showEffects();
            this.scrollEffectActive = true;
            this.scrollEffectVelocity = 0;
        }
        if (!this.scrollEffectActive) return;
        if (!active) {
            this.resetScrollEffect();
            return this.hideEffects();
        }
        // Eased in from 0, so the element doesn't jump into its deformed shape on the first frame
        this.scrollEffectVelocity += (velocity - this.scrollEffectVelocity) * 0.2;
        this.scrollEffect.render(this, this.scrollEffectVelocity);
    }

    // Hover effects: while the mouse is over the element (or, with AnimateGL.touchHover, a finger or pen touches it),
    // amount eases from 0 to 1, and back to 0 after it leaves or lifts; x and y are the pointer position in the
    // element, 0 to 1 from the bottom left; vx and vy its eased velocity in element sizes per second (speed their
    // length), 0 when the pointer rests; time the seconds since the effect started. An effect with resting: true is
    // drawn whenever it could run, also at amount 0 without a pointer (a reveal hides the image until the mouse comes):
    // once it has drawn 0 it's idle, and the render loop may stop.
    renderHoverEffect() {
        const ready = this.effectsReady && !this.failed && (this.mesh || this.restoreImages) && this.inViewport;
        const target = ready && this.hoverTarget ? 1 : 0;
        const resting = ready && !!this.hoverEffect.resting;
        const now = performance.now();
        // playHover(): waits until the effect could run, and ends early when it no longer can or a real pointer takes
        // over (the effect then follows that pointer from where the playback left it)
        let play = this.hoverPlayback;
        if (play && (this.hoverTarget || (play.start && !ready))) play = this.hoverPlayback = null;
        if (play && !play.start && ready) play.start = now;
        const playing = !!(play && play.start);
        if ((target || playing || resting) && !this.hoverEffectActive) {
            // Its GL objects were released (lost context, or taken off the page and put back): created again
            if (!this.mesh) this.init3d();
            if (!this.hoverEffectStarted && this.hoverEffect.init) this.hoverEffect.init(this);
            this.hoverEffectStarted = true;
            this.showEffects();
            this.hoverEffectActive = true;
            this.hoverAmount = 0;
            this.hoverVX = this.hoverVY = 0;
            this.hoverMoveX = this.hoverMoveY = 0;
            this.hoverStart = this.hoverFrame = now;
        }
        if (!this.hoverEffectActive) return;
        const dt = Math.max(now - this.hoverFrame, 1) / 1000;
        if (playing) {
            const t = (now - play.start) / play.duration;
            if (t >= 1) {
                this.hoverPlayback = null;
                this.resetHoverEffect();
                return this.hideEffects();
            }
            this.hoverAmount = playbackAmount(t);
            // The pointer that isn't there, eased along its path, so its velocity rises and falls
            const along = t * t * (3 - 2 * t);
            const x = play.from[0] + (play.to[0] - play.from[0]) * along;
            const y = play.from[1] + (play.to[1] - play.from[1]) * along;
            if (play.moved) {
                this.hoverMoveX += x - this.hoverX;
                this.hoverMoveY += y - this.hoverY;
            }
            play.moved = true;
            this.hoverX = x;
            this.hoverY = y;
        } else {
            // 0.12 of the way per frame at 60 fps, the same in time at any frame rate (capped, after a stall)
            this.hoverAmount += (target - this.hoverAmount) * (1 - Math.pow(0.88, Math.min(dt * 60, 10)));
        }
        if (!playing && !target && this.hoverAmount < 0.01) {
            if (!resting) {
                this.resetHoverEffect();
                return this.hideEffects();
            }
            if (this.hoverIdle) return;
            this.hoverIdle = true;
            this.hoverAmount = 0;
        } else this.hoverIdle = false;
        // The mouse moves since the last frame, eased: quicker to follow than to settle
        const moveX = this.hoverMoveX / dt;
        const moveY = this.hoverMoveY / dt;
        const ease = moveX || moveY ? 0.15 : 0.1;
        this.hoverVX += (moveX - this.hoverVX) * ease;
        this.hoverVY += (moveY - this.hoverVY) * ease;
        // 0 at rest, not ever smaller, so an effect can tell
        if (!moveX && !moveY && Math.hypot(this.hoverVX, this.hoverVY) < 0.005) this.hoverVX = this.hoverVY = 0;
        this.hoverMoveX = this.hoverMoveY = 0;
        this.hoverFrame = now;
        this.hoverEffect.render(this, {
            amount: this.hoverAmount,
            x: this.hoverX,
            y: this.hoverY,
            vx: this.hoverVX,
            vy: this.hoverVY,
            speed: Math.hypot(this.hoverVX, this.hoverVY),
            time: (now - this.hoverStart) / 1000,
        });
    }

    initAnimations() {
        // const passes = {fadePass: this.fadePass/*, liquidPass: this.liquidPass*/}
        const self = this;
        this.options.onStart = function () {
            self.onEntranceAnimationStart();
        };
        this.options.onComplete = function () {
            self.onEntranceAnimationEnd();
        };
        this.animations.in = new InAnimation(this.program, this.texture, this.options);
        this.timeOld = performance.now();
        this.meshVelocityLerp = {
            x: 0,
            y: 0,
            z: 0,
        };
        this.meshPositionOld = this.mesh.position;
    }

    loadScript(url) {
        return new Promise((resolve, reject) => {
            let script = document.querySelector(`script[src="${url}"]`);

            if (script) {
                if (script.dataset.loaded === 'true') {
                    resolve(script);
                } else {
                    script.addEventListener('load', () => resolve(script));
                    script.addEventListener('error', () => reject(new Error(`Failed to load script: ${url}`)));
                }
                return;
            }

            script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.type = 'application/javascript';
            script.onload = () => {
                script.dataset.loaded = 'true';
                resolve(script);
            };
            script.onerror = () => {
                script.dataset.loaded = 'false';
                reject(new Error(`Failed to load script: ${url}`));
            };
            document.head.appendChild(script);
        });
    }

    // A WebGL entrance, from AnimatedPlane.animeIn() once the chunk has loaded: resets is the count of reset() calls
    // it started with, so a reset() while it waits calls it off
    async animeInWebGL(options, resets) {
        if (this.layer.contextLost) return this.skipEntrance();
        if (!this.mesh) this.init3d();
        if (!this.mesh.parent) this.mesh.setParent(this.scene);

        this.initAnimationParams();

        this.animations.in.reset(); // reset animation progress to 0 to update uniforms on next enter frame

        if (this.htmlToCanvas) {
            try {
                await this.loadScript(this.layer.html2canvasUrl);
                // Taken ahead (prefetchSnapshot()) at another size, after a resize while out of view: taken again
                if (this.snapshotSize && this.snapshotSize !== this.snapshotKey()) {
                    await Promise.resolve(this.renderHTMLToCanvasPromise).catch(() => {});
                    this.textureImg = new Image();
                    this.renderHTMLToCanvasPromise = null;
                }
                this.snapshotSize = null;
                if (!this.textureImg.src) {
                    this.renderHTMLToCanvasPromise = this.renderHTMLToCanvasPromise || this.renderHTMLToCanvas();
                    await this.renderHTMLToCanvasPromise;
                    // One started before html2canvas had loaded made no snapshot: the image would never load,
                    // and the entrance never play with the element hidden
                    if (!this.textureImg.src) await (this.renderHTMLToCanvasPromise = this.renderHTMLToCanvas());
                }
            } catch (error) {
                // html2canvas failed to load or render: show the element without the WebGL effect
                console.warn('AnimateGL:', error);
                this.failed = true;
                this.hideMesh();
                this.showDomElement();
                return;
            }
        }

        try {
            await this.loadTextures();
        } catch (error) {
            // The image can't be drawn with WebGL (broken, or on another domain without CORS headers): shown as
            // itself, with the entrance's events
            console.warn('AnimateGL:', error);
            if (this.resets !== resets) return;
            this.failed = true;
            this.hideMesh();
            return this.skipEntrance();
        }
        // reset() while waiting: this entrance was called off
        if (this.resets !== resets) return;
        // The context was lost while waiting (and maybe restored, without the objects)
        if (this.layer.contextLost) return this.skipEntrance();
        if (!this.mesh) this.init3d();
        if (!this.mesh.parent) this.mesh.setParent(this.scene);

        this.applyTextures();

        if (!this.options.in.live && !this.options.in.lockToScrollbar) {
            this.updatePositions();
            this.updateOffset();
            this.animations.in.play(options);
        }
    }

    loadTextures() {
        const textureLoadingPromisses = [
            this.loadImage(this.textureImg) /*,
			this.loadImage(this.alphaMapImg)*/,
        ];
        return Promise.all(textureLoadingPromisses);
    }

    getCanvas(width, height, domElement) {
        // if(this.canvasForRenderingHTML){

        // 	ctx = null;
        // }
        // if (!this.canvasForRenderingHTML) {
        // 	if (this.useOffscreenCanvas && typeof OffscreenCanvas != 'undefined') {
        // 		this.canvasForRenderingHTML = new OffscreenCanvas(width, height)
        // 	} else {
        // 		this.canvasForRenderingHTML = document.createElement('canvas')
        // 	}
        // }else{
        // 	let ctx = this.canvasForRenderingHTML.getContext('2d');
        // 	ctx.clearRect(0, 0, this.canvasForRenderingHTML.width, this.canvasForRenderingHTML.height);
        // }
        // this.canvasForRenderingHTML.width = width
        // this.canvasForRenderingHTML.height = height
        // return this.canvasForRenderingHTML;

        // console.log("getCanvas() ", width, height)

        // A canvas element for text with thin smoothing on a Mac: html2canvas draws it with the element's
        // -webkit-font-smoothing only on a canvas of the document (setCanvasFont(), drawThinText() in
        // tools/html2canvas-pro.mjs), and on an OffscreenCanvas it came out bolder than the page's
        let canvas;
        if (typeof OffscreenCanvas != 'undefined' && !thinSmoothing(domElement)) {
            canvas = new OffscreenCanvas(width, height);
        } else {
            canvas = document.createElement('canvas');
        }
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }

    // The element's size (CSS pixels, rounded) and the canvas's devicePixelRatio: a snapshot taken ahead is used if
    // they match
    snapshotKey() {
        // Unsnapped: the snapped size flips by a pixel with the element's position (updatePositions())
        const box = this.originalDomElement.getBoundingClientRect();
        return Math.round(box.width) + 'x' + Math.round(box.height) + '@' + this.layer.dpr;
    }

    // An element drawn with html2canvas, a screen before it comes into view (AnimatedPlane's snapshot observer):
    // its snapshot is taken in idle time, so its entrance finds it ready. Taken on entering the view, it was a long
    // task (about 60 ms on an M5) just as the entrance started, while the page scrolled.
    prefetchSnapshot() {
        // Not before this layer's own loadWebGL() (a second AnimateGL instance gets these methods from the first's):
        // it sets html2canvas's URL, and the entrance takes the snapshot then
        if (!this.layer.html2canvasUrl) return;
        if (this.prefetching || this.isCSSAnimation || this.noEntrance || this.animatedIn || this.textureImg.src || this.renderHTMLToCanvasPromise) return;
        // Waits for play(): it may never come
        if (this.manual && !this.playRequested()) return;
        this.prefetching = true;
        const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 100));
        const take = () => {
            this.prefetching = false;
            // Taken meanwhile by the entrance, or no longer drawn with html2canvas
            if (this.detached || this.layer.contextLost || this.isCSSAnimation || this.noEntrance || this.textureImg.src || this.renderHTMLToCanvasPromise) return;
            this.snapshotSize = this.snapshotKey();
            this.renderHTMLToCanvasPromise = this.renderHTMLToCanvas();
            // The entrance awaits the same promise and handles a failure (shown without WebGL)
            this.renderHTMLToCanvasPromise.catch(() => {});
        };
        this.loadScript(this.layer.html2canvasUrl).then(
            () => idle(take, { timeout: 1000 }),
            () => (this.prefetching = false)
        );
    }

    async renderHTMLToCanvas() {
        const domElement = this.originalDomElement;

        if (typeof html2canvas != 'undefined') {
            // The canvas's devicePixelRatio, capped (webgl.js)
            const scale = this.layer.dpr || window.devicePixelRatio;
            // The pixels the plane covers (updatePositions()), with the element drawn from their corner, where the
            // browser paints it (snapRect()). Drawn at its unrounded place inside them, the whole element (edges and
            // text) was up to a device pixel off the page's in Chrome, and jumped when the entrance ended.
            const rect = domElement.getBoundingClientRect();
            const box = snapRect(rect, scale);
            const w = box.width * scale;
            const h = box.height * scale;

            const canvas = this.getCanvas(w, h, domElement);
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            ctx.textRendering = 'optimizeSpeed';

            const domelementOpacity = getComputedStyle(domElement).opacity;
            domElement.style.opacity = '1'; // set opacity to 1 for rendering

            domElement.classList.add('agl-html2canvas');
            const { width, height } = getComputedStyle(domElement);

            const renderPromise = html2canvas(domElement, {
                // fix for position:fixed elements - does not work
                // scrollX: 0,
                // scrollY: 200,

                backgroundColor: null,
                logging: false,
                scale: scale,
                // From the snapped corner
                x: 0,
                y: 0,
                width: box.width,
                height: box.height,
                windowWidth: window.innerWidth - (window.innerWidth - document.documentElement.clientWidth),
                // useCORS: true,
                // removeContainer: false,
                // foreignObjectRendering: false, // if set to true background not rendered
                // Clone only what the element's layout needs, to save time: the element with its content, its
                // ancestors, and the ancestors' other children without their content. Those stay so the element
                // keeps its place among its siblings (grid and flex placement, :nth-child() rules); onclone also
                // pins its size. Other iframes stay out, since html2canvas would render their whole content.
                ignoreElements: function (element) {
                    if (element.nodeName == 'IFRAME' && !domElement.contains(element)) return true;
                    if (
                        element.contains(domElement) ||
                        domElement.contains(element) ||
                        domElement === element ||
                        (element.parentNode && element.parentNode.contains(domElement)) ||
                        element.nodeName == 'HEAD' ||
                        // || element.nodeName == 'SCRIPT'
                        element.nodeName == 'STYLE' ||
                        element.nodeName == 'META' ||
                        element.nodeName == 'LINK'
                    ) {
                        return false;
                    } else {
                        return true;
                    }
                },
                onclone: function (doc, el) {
                    // The siblings in the clone are empty, so tracks and flex lines sized by content can differ:
                    // give the element the size it has on the page
                    if (width !== 'auto' && height !== 'auto') {
                        el.style.width = width;
                        el.style.height = height;
                        el.style.flex = 'none';
                    }

                    // const styleElement = doc.createElement('style');
                    // // Add the desired CSS rule
                    // styleElement.textContent = 'body { text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased;}';
                    // // Append the style element to the head of the cloned document
                    // doc.head.appendChild(styleElement);

                    // fix for invisible text in buttons - find all spans with display flex, find child spans with display static and replace with display relative
                    el.querySelectorAll('span').forEach(function (span) {
                        if (window.getComputedStyle(span).display == 'flex') {
                            el.querySelectorAll('span').forEach(function (childSpan) {
                                if (window.getComputedStyle(childSpan).position == 'static')
                                    childSpan.style.position = 'relative';
                            });
                        }
                    });

                    /* go throug all images in cloned doc
					el.querySelectorAll('img').forEach(function (img) {
					})
					*/

                    // test - add cloned doc as iframe to body for test
                    /*var iframe = document.createElement('iframe');
					document.body.appendChild(iframe);
					iframe.contentDocument.open();
					iframe.contentDocument.write(doc.documentElement.outerHTML);
					iframe.contentDocument.close();
					var iframeWidth = domElement.clientWidth + 'px';
					var iframeHeight = domElement.clientHeight + 'px';
					iframe.style.width = iframeWidth;
					iframe.style.height = iframeHeight;
					*/
                },

                canvas: canvas,
            });

            domElement.style.opacity = domelementOpacity; // reset opacity back to previous value

            const renderedCanvas = await renderPromise;

            // console.log("canvas2html canvas rendered", performance.now() - start)

            if (this.dataURL) {
                // toBlob() is throwing errors in blocks editor
                this.textureImg.src = renderedCanvas.toDataURL();
                return;
            } else {
                let blob;
                // PNG: lossless. WebP at its default quality smudged the edges of text

                if (typeof renderedCanvas.convertToBlob === 'function') {
                    blob = await renderedCanvas.convertToBlob({ type: 'image/png' });
                } else {
                    blob = await new Promise((resolve) => {
                        renderedCanvas.toBlob(resolve, 'image/png');
                    });
                }
                const url = URL.createObjectURL(blob);
                this.textureImg.addEventListener('load', function () {
                    URL.revokeObjectURL(url);
                });
                this.textureImg = new Image();
                this.textureImg.src = url;

                // test - add image to body
                /*const p = document.createElement('p')
				p.innerText = 'image blob created'
				document.body.appendChild(p)
				const img = document.createElement('img')
				img.src = url
				document.body.appendChild(img)
				img.style.maxWidth = 'initial'
				*/
                return;
            }
        }
    }

    loadImage(img) {
        return new Promise(function (resolve, reject) {
            const isLoaded = img.complete && img.naturalHeight !== 0;
            const failed = () => new Error(`couldn't load the image ${img.src} for WebGL (missing, or on another domain without CORS headers)`);

            if (isLoaded) {
                resolve(img);
            } else if (img.complete && img.src) {
                // Already failed: its error event has been and gone
                reject(failed());
            } else {
                img.addEventListener('load', function () {
                    resolve(this);
                });

                img.addEventListener('error', function () {
                    reject(failed());
                });
            }
        });
    }

    // Image aspect / element aspect, so the shader crops the texture like the image's object-fit: cover does.
    // The crop is always centred: object-position isn't followed. 1 (stretched to the box, as object-fit: fill
    // draws it) for HTML textures, images not loaded yet, and every other object-fit (contain, none and
    // scale-down aren't handled, so those images still change when the animation ends)
    // An image from imageTexture() is already cropped: a canvas, so 1 too
    getTextureScale() {
        if (!this.isImage) return 1;
        const img = this.texture.image;
        if (!img || !this.aspect) return 1;
        if (getComputedStyle(this.domElement).objectFit !== 'cover') return 1;
        // While the window is being resized, the texture drawn at the element's size before (imageTexture()) is
        // cropped to its new shape, as the browser crops the image, instead of stretched until it's drawn again
        if (!img.naturalWidth) return this.layer.resizing && img.width && img.height ? img.width / img.height / this.aspect : 1;
        if (!img.naturalHeight) return 1;
        return img.naturalWidth / img.naturalHeight / this.aspect;
    }

    // The element's border-radius as fractions of its width and height, so the shader rounds the plane's corners
    // the way the browser rounds the element: the image doesn't change shape when the animation ends.
    // A parent that clips the element with rounded corners (overflow other than visible, as a figure or a link
    // around the image often does) rounds the corners it shares with the element too.
    // cornerRadius1 is top left and top right, cornerRadius2 bottom right and bottom left, each corner as (x, y)
    updateCornerRadius(rect, dpr) {
        // border-radius is in the element's own size, before CSS transforms scale the rect
        const w = this.domElement.offsetWidth || rect.width;
        const h = this.domElement.offsetHeight || rect.height;
        const own = cornerRadii(getComputedStyle(this.domElement));
        // The parents that clip with rounded corners, found once (the nearest few, up to the body)
        if (this.domElement !== this.clipParentsOf) {
            this.clipParentsOf = this.domElement;
            this.clipParents = [];
            let parent = this.domElement.parentElement;
            for (let i = 0; parent && parent !== document.body && i < 4; i++, parent = parent.parentElement) {
                const style = getComputedStyle(parent);
                if (style.overflow !== 'visible' && cornerRadii(style).some((value) => parseFloat(value))) this.clipParents.push(parent);
            }
        }
        const clips = this.clipParents.map(function (parent) {
            return { parent, style: getComputedStyle(parent), rect: parent.getBoundingClientRect() };
        });
        // This runs on every scroll: skip the parsing while the radii, the sizes and the dpr stay the same
        let key = own.join(',') + ',' + w + ',' + h + ',' + rect.width + ',' + rect.height + ',' + dpr;
        clips.forEach(function (clip) {
            const r = clip.rect;
            key += '|' + cornerRadii(clip.style).join(',') + ',' + (r.left - rect.left) + ',' + (r.top - rect.top) + ',' + r.width + ',' + r.height;
        });
        if (key === this.cornerRadiusKey) return;
        this.cornerRadiusKey = key;
        const px = cornerPixels(own, w, h);
        // A parent's corner rounds the element's where the two meet (within a pixel of the screen), in the element's
        // own pixels: scale is the element's CSS size over its size on screen
        const sx = rect.width ? w / rect.width : 1;
        const sy = rect.height ? h / rect.height : 1;
        clips.forEach(function (clip) {
            const r = clip.rect;
            const pw = clip.parent.offsetWidth || r.width;
            const ph = clip.parent.offsetHeight || r.height;
            // The parent's radii in its own pixels, then on screen
            const parentPx = cornerPixels(cornerRadii(clip.style), pw, ph).map(function (c) {
                return [(c[0] * r.width) / (pw || 1), (c[1] * r.height) / (ph || 1)];
            });
            const meets = [
                [r.left, r.top, rect.left, rect.top],
                [r.right, r.top, rect.right, rect.top],
                [r.right, r.bottom, rect.right, rect.bottom],
                [r.left, r.bottom, rect.left, rect.bottom],
            ].map(function (m) {
                return Math.abs(m[0] - m[2]) <= 1 && Math.abs(m[1] - m[3]) <= 1;
            });
            for (let i = 0; i < 4; i++) {
                if (!meets[i]) continue;
                px[i] = [Math.max(px[i][0], parentPx[i][0] * sx), Math.max(px[i][1], parentPx[i][1] * sy)];
            }
        });
        const r = px.map(function (c) {
            return [w ? Math.min(1, c[0] / w) : 0, h ? Math.min(1, c[1] / h) : 0];
        });
        this.program.uniforms.cornerRadius1.value.set(r[0][0], r[0][1], r[1][0], r[1][1]);
        this.program.uniforms.cornerRadius2.value.set(r[2][0], r[2][1], r[3][0], r[3][1]);
        this.program.uniforms.planeSize.value.set(rect.width * dpr, rect.height * dpr);
    }

    updatePositions() {
        if (this.isCSSAnimation) {
            return;
        }

        if (!this.mesh || !this.mesh.visible) return;

        const box = this.domElement.getBoundingClientRect();
        const rect = snapRect(box, this.layer.dpr);

        this.rect = {
            x: rect.x,
            y: rect.y + this.scrollY,
            width: rect.width,
            height: rect.height,
        };
        // The canvas's devicePixelRatio, capped (webgl.js): the plane's size and position are in its pixels
        const dpr = this.layer.dpr;
        this.aspect = rect.width / rect.height;
        this.program.uniforms.tScale.value = this.getTextureScale();
        this.updateCornerRadius(rect, dpr);
        //only resize post if rect size has changed
        // if (this.postWidth != rect.width || this.postHeight != rect.height || this.canvasWidth != this.gl.canvas.width || this.canvasHeight != this.gl.canvas.height) {
        // While the window is being resized (main.js) the plane is only moved and scaled, its texture and targets
        // stretched: they're redrawn at the new size once the resize stops
        // Resized: the element's own size changed. The snapped one flips by a pixel as the page scrolls past
        // fractional positions, and each flip took a new html2canvas snapshot, on every scroll frame of an entrance.
        const resizing = this.layer.resizing && this.postWidth;
        const resized = !this.postWidth || Math.abs(box.width - this.postBoxWidth) > 0.5 || Math.abs(box.height - this.postBoxHeight) > 0.5;
        if (!resizing && resized) {
            this.post.resize({ width: rect.width, height: rect.height, dpr: dpr });
            // Held targets are resized in place, which clears them: drawn again, or a mesh at rest (a resting hover
            // effect, an effect after the entrance) showed an empty target until something else redrew it
            this.needsUpdate = true;
            // An image's texture is drawn at the element's size: again at the new one
            if (this.postWidth && this.textureSource) this.texture.image = this.imageTexture(this.textureSource);
            // this.canvasWidth = this.gl.canvas.width
            // this.canvasHeight = this.gl.canvas.height

            // redraw HTML to canvas, if plane has been resized and it is in viewport and html"canvas is enabled (and
            // loaded: the entrance takes its snapshot otherwise)
            if (this.postWidth && this.postHeight && this.htmlToCanvas && this.inViewport && typeof html2canvas != 'undefined') {
                this.textureImg = new Image();
                const self = this;
                this.renderHTMLToCanvasPromise = this.renderHTMLToCanvas();
                this.renderHTMLToCanvasPromise.then(function () {
                    self.loadImage(self.textureImg).then(function (img) {
                        if (!self.texture) return;
                        self.texture.image = img;
                        self.layer.wake();
                    });
                    // const img = new Image()
                    // img.src = self.textureImg.src
                    // document.body.appendChild(img)
                });
            }
            this.postWidth = rect.width;
            this.postHeight = rect.height;
            this.postBoxWidth = box.width;
            this.postBoxHeight = box.height;
        }

        const canvasWidth = this.gl.canvas.width;
        const canvasHeight = this.gl.canvas.height;
        const canvasRatio = canvasWidth / canvasHeight;

        // The scroll in canvas pixels, scaled as updateOffset() takes it back out (scroll / viewport size), not by
        // dpr: the canvas size is rounded to whole pixels, so at a fractional dpr (browser or app zoom) the two
        // differ by a fraction of a pixel per screen of scroll, and the plane drifted down the page
        const offsetX = (this.scrollX * canvasWidth) / window.innerWidth;
        const offsetY = (this.scrollY * canvasHeight) / this.viewportHeight;
        const planeH = (rect.height * dpr) / canvasHeight;
        const planeW = (planeH * rect.width) / rect.height;

        this.planeW = planeW;
        this.planeH = planeH;

        this.mesh.position.set(
            -0.5 * canvasRatio + (rect.x * dpr + offsetX) / canvasHeight + planeW / 2,
            0.5 - (rect.y * dpr + offsetY) / canvasHeight - planeH / 2, // move 2 px up to fix canvas offset
            this.zPosition
        );

        //planeW, planeH - percentage of screen height
        this.mesh.scale.set(planeW, planeH);
        this.s = this.mesh.scale.clone();

        this.program.uniforms.planeW.value = planeW;
        this.program.uniforms.planeH.value = planeH;
        this.program.uniforms.planeX.value = this.mesh.position.x;
        this.program.uniforms.planeY.value = this.mesh.position.y;

        if (this.animations.in && this.passes['fade']) {
            // this.animations.in.updatePositions()
            this.passes['fade'].uniforms.planeW.value = this.program.uniforms.planeW.value;
            this.passes['fade'].uniforms.planeH.value = this.program.uniforms.planeH.value;
            this.passes['fade'].uniforms.planeX.value = this.program.uniforms.planeX.value;
            this.passes['fade'].uniforms.planeY.value = this.program.uniforms.planeY.value;
        }

        // this.program.rect.set(.5 + this.mesh.position.x / canvasRatio, .5 + this.mesh.position.y - this.mesh.scale.y, this.mesh.scale.x / canvasRatio, this.mesh.scale.y)

        this.pos = {
            x: this.mesh.position.x,
            y: this.mesh.position.y,
            z: this.mesh.position.z,
        };
    }

    hideMesh() {
        if (this.mesh) {
            // A frame without it, if it was drawn
            if (this.mesh.visible) this.layer.wake();
            this.mesh.visible = false;
            this.post.passes.forEach(function (pass) {
                pass.enabled = false;
            });
            // Its render targets back to the pool
            this.post.release();
        }
    }

    showMesh() {
        if (this.failed || this.layer.contextLost) return;
        if (!this.mesh) this.init3d();
        if (!this.mesh.parent) this.mesh.setParent(this.scene);
        // this.updateUniformValues()
        this.mesh.visible = true;
        this.post.passes.forEach(function (pass) {
            pass.enabled = true;
        });
        this.layer.wake();
    }

    // The mesh at the page's scroll position: the WebGL half of AnimatedPlane.updateOffset()
    updateMeshOffset(offsetX, offsetY) {
        if (!this.mesh || !this.mesh.visible) return;

        const canvasWidth = this.gl.canvas.width;
        const canvasHeight = this.gl.canvas.height;
        const canvasRatio = canvasWidth / canvasHeight;

        // this.mesh.position.set(this.pos.x - canvasRatio * offsetX, this.pos.y + offsetY, this.pos.z)
        this.mesh.position.x = this.pos.x - canvasRatio * offsetX;
        this.mesh.position.y = this.pos.y + offsetY;

        this.p = this.mesh.position.clone();
        this.meshPosition = {
            x: this.pos.x - canvasRatio * offsetX,
            y: this.pos.y + offsetY,
            z: this.pos.z,
        };

        this.program.uniforms.planeX.value = this.mesh.position.x;
        this.program.uniforms.planeY.value = this.mesh.position.y;

        // this.program.rect.set(.5 + this.mesh.position.x / canvasRatio, .5 + this.mesh.position.y - this.mesh.scale.y, this.mesh.scale.x / canvasRatio, this.mesh.scale.y)
    }

    updateUniformValues() {
        const self = this;
        // An easing that overshoots (easeOutBack, easeOutElastic, the springs) takes the progress past 1, and one
        // that anticipates (easeInBack) below 0. The mesh follows it (vertex.js moves the element past its place
        // and back); the fade and the effect passes settle at 1 and stay there, as a fade or a blur past its end
        // has no meaning.
        const progress = this.getInParam('progress');
        const settled = Math.min(Math.max(progress, 0), 1);

        const progressOld = this.program.uniforms.progress.value;
        this.program.uniforms.progress.value = progress;
        const speed = this.program.uniforms.progress.value - progressOld;

        this.post.passes.forEach(function (pass) {
            if (pass.enabled) {
                if (pass.uniforms.hasOwnProperty('u_time')) pass.uniforms.u_time.value += 0.02;
                if (pass.uniforms.hasOwnProperty('u_radius'))
                    pass.uniforms.u_radius.value = settled * (Math.pow(2, 0.5) / 2) * 1.2;
                if (pass.uniforms.hasOwnProperty('strength')) pass.uniforms.strength.value = 1 - settled;
                if (pass.uniforms.hasOwnProperty('progress')) pass.uniforms.progress.value = settled;
                if (pass.uniforms.hasOwnProperty('speed')) pass.uniforms.speed.value = speed;
                if (pass.uniforms.hasOwnProperty('threshold')) pass.uniforms.threshold.value = self.options.in.fade.threshold;
                if (pass.uniforms.hasOwnProperty('alphaMapAngle')) {
                    pass.uniforms.alphaMapAngle.value = self.options.in.fade.alphaMapAngle;
                }
                // if (pass.uniforms.hasOwnProperty("velocity")) {
                // 	pass.uniforms.velocity.value.x = self.meshVelocityLerp.x * 50
                // 	pass.uniforms.velocity.value.y = self.meshVelocityLerp.y * 50
                // 	pass.uniforms.velocity.value.z = self.meshVelocityLerp.z * 50
                // }
            }
        });

        this.program.uniforms.strength.value = 1 - settled;
        this.program.uniforms.translate.value.x = this.options.in.translate.x;
        this.program.uniforms.translate.value.y = this.options.in.translate.y;
        this.program.uniforms.translate.value.z = this.options.in.translate.z;

        this.program.uniforms.rotate.value.x = (Math.PI * this.options.in.rotate.x) / 180;
        this.program.uniforms.rotate.value.y = (Math.PI * this.options.in.rotate.y) / 180;
        this.program.uniforms.rotate.value.z = (Math.PI * this.options.in.rotate.z) / 180;

        this.program.uniforms.p1.value.x = this.options.in.corners.start1;
        this.program.uniforms.p2.value.x = this.options.in.corners.start2;
        this.program.uniforms.p3.value.x = this.options.in.corners.start3;
        this.program.uniforms.p4.value.x = this.options.in.corners.start4;
        this.program.uniforms.p1.value.y = this.options.in.corners.end1;
        this.program.uniforms.p2.value.y = this.options.in.corners.end2;
        this.program.uniforms.p3.value.y = this.options.in.corners.end3;
        this.program.uniforms.p4.value.y = this.options.in.corners.end4;

        this.program.uniforms.easeX.value = this.options.in.corners.easeX;
        this.program.uniforms.easeY.value = this.options.in.corners.easeY;
    }

    updateUniformsFromAnimationParams() {
        // Exactly 1 once the entrance has ended (InAnimation's complete); an overshooting easing passes it before.
        // Set at 1 once more: the last frame before the end was drawn short of it, a fraction of a pixel off the
        // element, and the mesh stays over the element for a few frames after the end (onEntranceAnimationEnd())
        const progress = this.getInParam('progress');
        if (progress !== 1 || this.program.uniforms.progress.value !== 1) {
            if (!this.options.in.lockToScrollbar) this.needsUpdate = true;
            this.updateUniformValues();
        } else {
            // this.disable()
        }
    }

    getInParam(name) {
        if (this.options.in.live) return this.options.in[name];
        else return this.animations.in.params[name];
    }

    updateMeshPosition() {
        this.animationParams.translateY = 0; // ??
        if (this.meshPosition) {
            // commenting out next part of code solves the bug with invisible alement after switching animation from webgl to css to webgl
            // console.log(this.mesh.position, this.animationParams)
            this.mesh.position.set(
                this.meshPosition.x + this.animationParams.translateX,
                this.meshPosition.y + this.animationParams.translateY,
                this.meshPosition.z + this.animationParams.translateZ
            );
        }
    }

    updateMeshVelocity() {
        // mesh translate velocity, current translate =  options.translate * (1 - progress)
        this.timeNow = performance.now();
        this.deltaTime = this.timeNow - this.timeOld;
        this.timeOld = this.timeNow;
        const current = 1 - this.getInParam('progress');

        if (this.meshTranslateOld) {
            this.meshVelocity = {
                x: (this.options.in.translate.x * current - this.meshTranslateOld.x) / this.deltaTime,
                y: (this.options.in.translate.y * current - this.meshTranslateOld.y) / this.deltaTime,
                z: (this.options.in.translate.z * current - this.meshTranslateOld.z) / this.deltaTime,
            };

            this.meshVelocityLerp = {
                x: (0,functions/* lerp */.t7)(this.meshVelocityLerp.x, this.meshVelocity.x, 0.2),
                y: (0,functions/* lerp */.t7)(this.meshVelocityLerp.y, this.meshVelocity.y, 0.2),
                z: (0,functions/* lerp */.t7)(this.meshVelocityLerp.z, this.meshVelocity.z, 0.2),
            };
        }

        // console.log(this.meshVelocityLerp.x)

        this.meshTranslateOld = {
            x: this.options.in.translate.x * current,
            y: this.options.in.translate.y * current,
            z: this.options.in.translate.z * current,
        };

        // this.meshVelocity = {
        // 	x: (this.mesh.position.x - this.meshPositionOld.x) / this.deltaTime,
        // 	y: (this.mesh.position.y - this.meshPositionOld.y) / this.deltaTime,
        // 	z: (this.mesh.position.z - this.meshPositionOld.z) / this.deltaTime,
        // }

        // this.meshVelocityLerp = {
        // 	x: lerp(this.meshVelocityLerp.x, this.meshVelocity.x, .2),
        // 	y: lerp(this.meshVelocityLerp.y, this.meshVelocity.y, .2),
        // 	z: lerp(this.meshVelocityLerp.z, this.meshVelocity.z, .2)
        // }

        return;

        this.meshPositionOld = this.mesh.position.clone();
        this.velocityXY = new Vec2(this.meshVelocityLerp.x, this.meshVelocityLerp.y);

        this.program.uniforms.bend.value = this.velocityXY.len() * 100;
        // this.program.uniforms.strength.value = this.velocityXY.len() * 100

        if (this.velocityXY.len()) this.velocityAngle = Math.atan2(this.velocityXY.y, this.velocityXY.x);

        this.program.uniforms.angle.value = -(this.velocityAngle - Math.PI / 2);
    }

    updateActivePasses() {
        for (let key in this.passes) {
            if (this.options.in[key]) {
                this.passes[key].enabled = this.options.in[key].enabled;
            }
        }
    }

    render(scroll, currentFrame) {
        this.scroll = scroll;

        if (this.isCSSAnimation) return;

        if (this.scrollEffect) this.renderScrollEffect(scroll);
        if (this.hoverEffect) this.renderHoverEffect();

        // if lastRender is true, force render
        if (!this.lastRender) {
            // if (!this.visible || !this.enabled) return;
            if (!this.mesh || !this.mesh.visible) return;
        }

        this.lastRender = false;

        if (this.animations.scroll) this.animations.scroll.render(scroll);
        // console.log("mesh ", this.mesh.visible, ' domElement: ', this.domElementVisible, ' mesh position: ', this.mesh.position)
        // if(this.animations.hover) this.animations.hover.render(currentFrame)

        // update uniforms for all passes from active animation params

        this.updateActivePasses();
        this.updateUniformsFromAnimationParams();
        this.updateMeshPosition();

        // Render targets just taken from the pool hold another element's drawing
        if (this.post.acquire()) this.needsUpdate = true;
        if (!this.needsUpdate) return;

        // this.updateMeshVelocity() // out - intro bend and scroll bend are now separated

        // console.log('render');

        // render post processing passes to texture
        this.post.render({ texture: this.texture });

        // console.log(this.mesh)

        // apply the texture from post processing passes to mesh
        this.mesh.program.uniforms.tMap.value = this.post.uniform.value;

        this.needsUpdate = false;

        // this.liquidPass.uniforms.u_time.value += .02;
        // this.liquidPass.enabled = false
        // this.fadePass.enabled = false

        // this.mesh.position.y = 0
        // this.mesh.position.x = -.5

        // if (this.options.mouse.hover.enabled) {
        // 	if (this.hover) {
        // 		this.mesh.position.z = lerp(this.mesh.position.z, this.options.mouse.hover.zoom + this.zPosition, this.options.mouse.hover.ease)
        // 		this.mesh.rotation.x = lerp(this.mesh.rotation.x, this.options.mouse.hover.rotate * (- this.mouseY + .5), this.options.mouse.hover.ease)
        // 		this.mesh.rotation.y = lerp(this.mesh.rotation.y, this.options.mouse.hover.rotate * (- this.mouseX + .5), this.options.mouse.hover.ease)
        // 		this.mesh.scale.x = lerp(this.mesh.scale.x, this.s.x * this.options.mouse.hover.scale, this.options.mouse.hover.ease)
        // 		this.mesh.scale.y = lerp(this.mesh.scale.y, this.s.y * this.options.mouse.hover.scale, this.options.mouse.hover.ease)

        // 	} else {
        // 		this.mesh.position.z = lerp(this.mesh.position.z, this.zPosition, this.options.mouse.hover.ease)
        // 		this.mesh.rotation.x = lerp(this.mesh.rotation.x, 0, this.options.mouse.hover.ease)
        // 		this.mesh.rotation.y = lerp(this.mesh.rotation.y, 0, this.options.mouse.hover.ease)
        // 		this.mesh.scale.x = lerp(this.mesh.scale.x, this.s.x, this.options.mouse.hover.ease)
        // 		this.mesh.scale.y = lerp(this.mesh.scale.y, this.s.y, this.options.mouse.hover.ease)
        // 	}
        // }
    }
}

;// CONCATENATED MODULE: ./js/ProgramCache.js
// Compiled WebGL programs shared by a layer's elements (webgl chunk). Elements whose shaders end up the same (the
// core's with the same effect chunks, WebGLPlane.shaderSource(), and every element's post passes) use one WebGL
// program, compiled once, instead of compiling it each. Each still gets its own OGL Program object, with its own
// uniforms and state: OGL sets an element's uniform values before each draw, and caches what it set by uniform
// location, which the elements share with the program, so they don't see each other's values. A program is deleted
// when the last element using it lets go of it (remove()). Copies OGL Program internals (written against OGL 0.0.90),
// so check these field names when upgrading OGL.


// What a Program holds of its compiled program
const COMPILED = ['id', 'program', 'uniformLocations', 'attributeLocations', 'attributeOrder'];

class ProgramCache {
    constructor(gl) {
        this.gl = gl;
        this.entries = new Map();
    }

    // An OGL Program, as new Program(gl, options) makes, compiled only if no element uses that source yet
    get(options) {
        const { uniforms = {}, ...rest } = options;
        // Sorted keys, so the order the caller spread its options in doesn't decide sharing
        const key = JSON.stringify(Object.keys(rest).sort().map((name) => [name, rest[name]]));
        let entry = this.entries.get(key);
        let program;
        if (entry) {
            // The state new Program() sets, without compiling: the first one's, with this element's uniforms
            program = Object.assign(Object.create(Program.prototype), entry.state, {
                uniforms,
                blendFunc: { ...entry.state.blendFunc },
                blendEquation: { ...entry.state.blendEquation },
            });
        } else {
            program = new Program(this.gl, options);
            // Failed to link (OGL warned): not shared, and deleted with the element as before
            if (!program.uniformLocations) return program;
            entry = { key, state: { ...program, uniforms: null }, users: 0 };
            this.entries.set(key, entry);
        }
        entry.users++;
        program.aglKey = key;
        program.remove = removeShared;
        program.aglCache = this;
        return program;
    }

    // A program now compiled from other options (a class change picked other effects): the same Program object, which
    // the mesh and the animations hold, with the same uniforms, given the other program
    switch(program, options) {
        const next = this.get({ ...options, uniforms: program.uniforms });
        if (program.aglCache === this) this.release(program);
        else this.gl.deleteProgram(program.program);
        for (const key of [...COMPILED, 'aglKey', 'aglCache', 'remove']) program[key] = next[key];
    }

    // One element less uses the program: deleted after the last
    release(program) {
        const entry = this.entries.get(program.aglKey);
        program.aglKey = null;
        if (!entry || entry.state.program !== program.program || --entry.users) return;
        this.entries.delete(entry.key);
        this.gl.deleteProgram(entry.state.program);
    }

    // After the context is lost: its programs are gone with it, so they're dropped, not deleted
    drop() {
        this.entries = new Map();
    }
}

// A shared Program's remove(): lets go of it, deleted when no other element uses it
function removeShared() {
    if (this.aglKey && this.aglCache) this.aglCache.release(this);
}

;// CONCATENATED MODULE: ./js/shaders/glitch.js
// The glitch entrance (agl-glitch, main.js), an entrance effect's shader chunk (AnimateGL.registerEntranceEffect(),
// spliced in by WebGLPlane.shaderSource()). Bands of the element jump sideways, a few blocks shift, and red and blue
// split apart along each band. Strong at first and calm by about 90% of the entrance, with a new tear about 18 times
// over it, taken from the progress: no clock, the same each time, and it follows easings that overshoot or step.
// In the first half of an entrance of a second or longer, the element also blinks out at most twice, so never more
// than three flashes a second (WCAG 2.3.1); shorter entrances don't blink. Cheap on purpose: one pass, no loops, a
// hash per band and per block, three texture reads with the split, and nothing while the amount is 0 (once the
// entrance has ended).
const glitch = {
    // glitchBlink: whether it blinks, from the entrance's duration (WebGLPlane.addEffectUniforms())
    uniforms: { glitchIn: 1, glitchBlink: (plane) => (plane.options.in.duration >= 1000 ? 1 : 0) },
    // progress has the vertex shader's precision, as a uniform the two share must
    fragmentHead: `uniform mediump float progress;
uniform float glitchIn;
uniform float glitchBlink;
float glitchAmount;
float glitchProgress;
vec2 glitchShift;
float glitchHash(vec2 v) { return fract(sin(dot(v, vec2(12.9898, 78.233))) * 43758.5453); }
vec2 glitchUv(vec2 p, float amount, float seed) {
    float band = floor(p.y * 12. + glitchHash(vec2(seed, 3.1)) * 6.);
    float r = glitchHash(vec2(band, seed));
    // About a third of the bands move, each its own way
    float moved = step(.65, r);
    p.x += (r - .825) * moved * amount * .6;
    // A few blocks shift on their own
    vec2 cell = floor(p * vec2(5., 9.)) + seed;
    float b = glitchHash(cell);
    p += step(.93, b) * (vec2(glitchHash(cell + 7.3), b) - .5) * amount * .25;
    glitchShift = vec2((.5 + moved) * (r - .5) * .05 * amount, 0.);
    return p;
}`,
    fragmentUv: `glitchShift = vec2(0.);
glitchProgress = clamp(progress, 0., 1.);
glitchAmount = progress < 1. ? (1. - smoothstep(.5, .9, glitchProgress)) * glitchIn : 0.;
if(glitchAmount > 0.) p = glitchUv(p, glitchAmount, floor(glitchProgress * 18.) + 1.);`,
    // Red and blue sampled apart, inside the element's own shape (as Pro's colour splits do)
    fragmentColor: `if(glitchAmount > 0.) {
    if(glitchShift != vec2(0.)) {
        vec4 red = texture2D(tMap, uv + glitchShift);
        vec4 blue = texture2D(tMap, uv - glitchShift);
        color.rgb = color.a > 0. ? min(vec3(red.r, color.g * color.a, blue.b) / color.a, 1.) : vec3(0.);
    }
    if(glitchBlink > 0. && glitchProgress < .5) color.a *= step(.3, glitchHash(vec2(floor(glitchProgress * 6.), 5.7)));
}`,
};

;// CONCATENATED MODULE: ./js/webgl.js
// The webgl chunk (animategl.webgl.min.js): OGL, the shaders, the WebGL half of each element (WebGLPlane.js) and the
// render loop. The core (main.js) loads it with webglLoader.js the first time an element needs WebGL: a WebGL
// entrance, or an image whose scroll or hover effect draws it. Pages with only CSS animations never load it.








// WebGLPlane's methods on every element, replacing the core's stubs
let installed = false;
function install() {
    if (installed) return;
    installed = true;
    for (const name of Object.getOwnPropertyNames(WebGLPlane.prototype)) {
        if (name !== 'constructor') AnimatedPlane/* AnimatedPlane.prototype */.Z.prototype[name] = WebGLPlane.prototype[name];
    }
    // The core's entrance effects (agl-glitch). Under reduced motion the preset is a plain fade.
    const reducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const Animations = window.AnimateGL;
    if (Animations && Animations.registerEntranceEffect && !reducedMotion && !Animations.entranceEffects.glitch) {
        Animations.registerEntranceEffect('glitch', { shader: glitch });
    }
}

// The devicePixelRatio the canvas and the render targets are drawn at: the screen's, capped at 2. A 3x phone
// screen drew 2.25 times the pixels of 2x for a difference hard to see in an animation.
const MAX_DPR = 2;

// Adds the canvas, renderer, camera and scene to a layer (Layer.js), and starts its render loop. The loop runs only
// while something moves (an entrance, an effect, the eased scroll catching up) and stops otherwise: layer.wake()
// starts it again. A lost WebGL context (the GPU reset, too many contexts on the page) shows the elements as
// themselves until it's restored, and then everything is created again.
function attach(layer) {
    install();
    if (layer.gl) return;
    const options = layer.options;

    const canvasWrapper = document.createElement('div');
    canvasWrapper.style.position = 'absolute';
    canvasWrapper.style.top = '0';
    canvasWrapper.style.left = '0';
    canvasWrapper.className = 'agl-canvas-wrapper';
    document.body.appendChild(canvasWrapper);
    options.canvasWrapper = canvasWrapper;

    layer.dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    createGL(layer);
    const canvas = layer.canvas;
    canvasWrapper.appendChild(canvas);
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = layer.zIndex;
    canvas.style.pointerEvents = 'none';

    window.addEventListener('agl-update', function () {
        const camera = layer.camera;
        const fovRadians = (options.in.cameraFov * Math.PI) / 180;
        camera.fov = options.in.cameraFov;
        camera.perspective();
        camera.position.z = 1 / (2 * Math.tan(fovRadians / 2));
        layer.wake();
    });

    layer.resizeGL = function () {
        if (layer.contextLost) return;
        layer.renderer.setSize(layer.width, layer.height);
        layer.camera.perspective({
            aspect: layer.gl.canvas.width / layer.gl.canvas.height,
        });
        layer.wake();
    };

    // The scroll position, eased: its lag behind the page's (target - current) is the velocity of the scroll effects
    let current = window.scrollY;
    let frameId = 0;
    // Frames drawn with nothing moving: one more after the last change, so the canvas shows the end state
    let idleFrames = 0;
    layer.frames = 0;
    layer.looping = false;
    function frame(t) {
        frameId = 0;
        if (layer.contextLost) return (layer.looping = false);
        const target = window.scrollY;
        current = (0,functions/* lerp */.t7)(current, target, options.scroll.ease);
        if (Math.abs(target - current) < 0.5) current = target;
        layer.frames++;
        render(layer, (target - current) / 1000, t);
        if (current !== target || busy(layer)) idleFrames = 0;
        else idleFrames++;
        if (idleFrames < 2) frameId = requestAnimationFrame(frame);
        else layer.looping = false;
    }
    // Starts the loop if it has stopped: anything that may move or change the drawing calls it
    layer.wake = function () {
        idleFrames = 0;
        if (frameId || layer.contextLost) return;
        layer.looping = true;
        frameId = requestAnimationFrame(frame);
    };
    // Draws now, not in the next animation frame: after a resize, whose observer (main.js) runs after this frame's
    // animation frames, so the canvas (cleared by its new size) and the planes at their new places are painted with
    // the page as it has reflowed, not a frame after it
    layer.drawNow = function () {
        if (layer.contextLost) return;
        if (frameId) cancelAnimationFrame(frameId);
        layer.looping = true;
        frame(performance.now());
    };
    ['scroll', 'resize', 'agl-option-change', 'agl-animate', 'agl-init'].forEach((type) => window.addEventListener(type, () => layer.wake(), { passive: true }));

    canvas.addEventListener('webglcontextlost', function (event) {
        // Asks the browser to restore it
        event.preventDefault();
        layer.contextLost = true;
        layer.looping = false;
        if (frameId) cancelAnimationFrame(frameId);
        frameId = 0;
        layer.pool.drop();
        layer.programs.drop();
        layer.planes.forEach((plane) => plane.onContextLost && plane.onContextLost());
    });
    canvas.addEventListener('webglcontextrestored', function () {
        createGL(layer, canvas);
        layer.contextLost = false;
        layer.resizeGL();
        layer.planes.forEach((plane) => plane.onContextRestored && plane.onContextRestored());
        layer.onScroll(window.scrollX, window.scrollY);
        current = window.scrollY;
        layer.wake();
    });

    layer.resizeGL();
    layer.webglReady = true;
    layer.onScroll(window.scrollX, window.scrollY);
    layer.wake();
}

// The renderer, camera, scene and render target pool. Again on the same canvas after a lost context is restored: its
// objects are gone, and the planes create theirs again.
function createGL(layer, canvas) {
    const options = layer.options;
    const renderer = new Renderer({
        canvas,
        alpha: true,
        dpr: layer.dpr,
        premultipliedAlpha: true,
        // antialias: true,
        // stencil: true,
        // autoClear: false,
        preserveDrawingBuffer: false, // more FPS, test if has negative sideaffects
        depth: true,
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const fov = options.in.cameraFov;
    const camera = new Camera(gl, { fov: fov });
    window.camera = camera;
    const fovRadians = (fov * Math.PI) / 180;
    const cameraZ = 1 / (2 * Math.tan(fovRadians / 2));
    camera.position.set(0, 0, cameraZ);
    camera.lookAt([0, 0, 0]);

    const scene = new Transform();
    const pool = new TargetPool(gl);
    // Programs the elements share (a new cache after a lost context is restored, its programs compiled again)
    const programs = new ProgramCache(gl);

    layer.gl = gl;
    layer.renderer = renderer;
    layer.camera = camera;
    layer.scene = scene;
    layer.canvas = gl.canvas;
    layer.pool = pool;
    layer.programs = programs;
}

// Whether the next frame may differ from this one: an entrance playing, an effect running (not a resting hover effect
// that has drawn 0), or a hover playback started (one waiting for its element wakes the loop when it can start). The
// editor's live preview wakes it with each change (agl-option-change).
function busy(layer) {
    return layer.planes.some(
        (plane) =>
            !plane.isCSSAnimation &&
            (plane.entranceAnimamtionPlaying || plane.scrollEffectActive || (plane.hoverEffectActive && !plane.hoverIdle) || (plane.hoverPlayback && plane.hoverPlayback.start))
    );
}

// Draws the scene straight to the canvas. It used to go to a canvas-sized render target first and be copied to the
// canvas by a pass that changed nothing: a second full-screen draw on every frame, and a target of the canvas's size
// (with depth) held for good. With no mesh shown, nothing is drawn and the canvas is hidden, so the browser doesn't
// composite a page-sized transparent layer on every scroll frame (also once the last WebGL element turned into a CSS
// one); it's shown again with the next frame drawn on it.
function render(layer, scroll, t) {
    layer.planes.forEach(function (plane) {
        if (plane.render) plane.render(scroll, t);
    });

    const shown = layer.scene.children.some((mesh) => mesh.visible);
    if (shown) layer.renderer.render({ scene: layer.scene, camera: layer.camera });
    if (shown === layer.canvasShown) return;
    layer.canvasShown = shown;
    layer.canvas.style.visibility = shown ? '' : 'hidden';
}


/***/ })

}]);