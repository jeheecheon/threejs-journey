uniform float uAlpha;

void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5, 0.5));
    float strength = uAlpha * (0.05 / distanceToCenter - 0.05 * 2.0);
    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);

    #include <colorspace_fragment>
}
