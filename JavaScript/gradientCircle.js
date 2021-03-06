import THREE from 'proxy/three'

const gradientCircle = (r, restDensity, color) => {
  const textureQuality = 5;
  const s = 2 ** textureQuality / 2;
  const circleGeometry = new THREE.CircleGeometry(r, 8);
  const canvas = document.createElement("canvas");
  canvas.width = s * 2;
  canvas.height = s * 2;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(s, s, 0, s, s, s);
  gradient.addColorStop(
    0.1,
    `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, ${.1})`
  );
  gradient.addColorStop(
    0.5,
    `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, ${.1 / restDensity})`
  );
  gradient.addColorStop(
    0.8,
    `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, 0)`
  );

  ctx.arc(s, s, s, 0, 2 * Math.PI);

  ctx.fillStyle = gradient;
  ctx.fill();

  const gradientTexture = new THREE.Texture(canvas);
  gradientTexture.needsUpdate = true;

  const material = new THREE.MeshBasicMaterial({
    map: gradientTexture
  });

  material.transparent = true;

  // material.blending = Multiply;

  const gradientMesh = new THREE.Mesh(circleGeometry, material);

  return gradientMesh;
};

export default gradientCircle;
