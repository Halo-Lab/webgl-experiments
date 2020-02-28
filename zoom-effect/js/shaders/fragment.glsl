uniform float time;
uniform sampler2D image;
uniform sampler2D displacement;
uniform vec4 resolution;
uniform vec3 mouse;

varying vec2 vUv;
varying vec3 vPosition;

float map(float value,float min1,float max1,float min2,float max2)
{
    return min2+(value-min1)*(max2-min2)/(max1-min1);
}

void main(){ 
    vec2 direction=normalize(vPosition.xy-mouse.xy);
    float dist=length(vPosition-mouse);
    
    float prox=1.-map(dist,0.,.3,0.,1.);
    
    prox=clamp(prox,0.,1.);
    
    vec2 zoomedUV1=mix(vUv,mouse.xy+vec2(.2),prox*.2);
    
    vec4 color=texture2D(image,zoomedUV1);
    
    gl_FragColor=color;
}