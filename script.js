// ==========================================
// CONFIGURAÇÃO DE ÁUDIO SINTETIZADO E EXTERNO
// ==========================================
const deathAudio = new Audio('https://www.myinstants.com/media/sounds/ai-que-delicia-mickey.mp3');
deathAudio.volume = 0.7;

const page3Audio = new Audio('https://www.myinstants.com/pt/instant/sobre-o-sorteio-26270/?utm_source=copy&utm_medium=share');
page3Audio.volume = 0.8;

const proximityAudio = new Audio('https://www.myinstants.com/pt/instant/hihi-michael-jackson-76976/?utm_source=copy&utm_medium=share');
proximityAudio.volume = 0.85;

let isProximityAudioPlaying = false;
let proximityAudioCooldown = false;

const AudioController = {
  ctx: null,
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },
  playStep() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(45 + Math.random() * 20, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  },
  playPickup() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  },
  playOilPickup() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  },
  playToggle() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  },
  playHeartbeat(factor) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(80, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(25, this.ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.5 * factor, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.18);
  },
  playTrackerBeep(pitch = 800) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  },
  playThunder() {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 2.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(120, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(20, this.ctx.currentTime + 2.5);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 2.5);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
    noise.stop(this.ctx.currentTime + 2.5);
  },
  playTrapSnap() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  },
  playShotgun() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3000, now);
    filter.frequency.exponentialRampToValueAtTime(80, now + 0.45);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(1.0, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(150, now);
    subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.25);
    subGain.gain.setValueAtTime(0.8, now);
    subGain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.5);
    subOsc.start(now);
    subOsc.stop(now + 0.25);
  },
  playMonsterRoar() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.6);
    gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.6);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.6);
  },
  playCustomEnemyDeath() {
    deathAudio.currentTime = 0;
    deathAudio.play().catch(e => console.log("Erro ao tocar áudio de morte:", e));
  },
  playPage3Audio() {
    page3Audio.currentTime = 0;
    page3Audio.play().catch(e => console.log("Erro ao tocar áudio da página 3:", e));
  },
  playProximityAudio() {
    if (proximityAudioCooldown) return;
    proximityAudioCooldown = true;
    isProximityAudioPlaying = true;
    proximityAudio.currentTime = 0;
    proximityAudio.play().catch(e => console.log("Erro ao tocar áudio de proximidade:", e));
    
    proximityAudio.onended = () => {
      isProximityAudioPlaying = false;
      setTimeout(() => {
        proximityAudioCooldown = false;
      }, 5000); // 5 segundos de intervalo para poder tocar novamente
    };
  }
};

// Overlay de Pânico
const panicOverlay = document.createElement('div');
panicOverlay.style.position = 'fixed';
panicOverlay.style.top = '0';
panicOverlay.style.left = '0';
panicOverlay.style.width = '100vw';
panicOverlay.style.height = '100vh';
panicOverlay.style.pointerEvents = 'none';
panicOverlay.style.boxShadow = 'inset 0 0 0px rgba(220, 38, 38, 0)';
panicOverlay.style.transition = 'box-shadow 0.1s ease';
panicOverlay.style.zIndex = '90';
document.body.appendChild(panicOverlay);

// ==========================================
// THREE.JS SETUP
// ==========================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x010305);
scene.fog = new THREE.FogExp2(0x010305, 0.035);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x080f1a, 0.45);
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight(0x1e293b, 0.3);
moonLight.position.set(50, 100, 50);
scene.add(moonLight);

const lightningLight = new THREE.PointLight(0xa5c9ff, 0, 300);
lightningLight.position.set(0, 50, 0);
scene.add(lightningLight);

let shootableObjects = [];
const bulletTracerLines = [];
const bloodParticles = [];
const bloodPuddles = [];

// ==========================================
// GERENCIADOR DE POÇAS E PARTICULAS DE SANGUE
// ==========================================
function spawnBloodPuddle(position) {
  const radius = 1.2 + Math.random() * 0.8;
  const geo = new THREE.CircleGeometry(radius, 16);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x4a0000,
    roughness: 0.2,
    metalness: 0.1,
    transparent: true,
    opacity: 0.85
  });

  const puddle = new THREE.Mesh(geo, mat);
  puddle.rotation.x = -Math.PI / 2;
  puddle.rotation.z = Math.random() * Math.PI * 2;
  puddle.position.set(position.x, 0.01, position.z);
  puddle.receiveShadow = true;

  scene.add(puddle);
  bloodPuddles.push(puddle);
}

function spawnGoreEffect(hitPoint, shotDirection) {
  const particleCount = 15;
  for (let i = 0; i < particleCount; i++) {
    const size = 0.03 + Math.random() * 0.08;
    const geo = new THREE.BoxGeometry(size, size, size);
    
    const isMeat = Math.random() > 0.5;
    const color = isMeat ? 0x3d0303 : 0x8b0000;
    const mat = new THREE.MeshBasicMaterial({ color: color });
    
    const particle = new THREE.Mesh(geo, mat);
    particle.position.copy(hitPoint);
    
    const velocity = new THREE.Vector3(
      shotDirection.x * 2 + (Math.random() - 0.5) * 3,
      Math.random() * 3 + 1,
      shotDirection.z * 2 + (Math.random() - 0.5) * 3
    );

    scene.add(particle);
    bloodParticles.push({
      mesh: particle,
      velocity: velocity,
      life: 2.0
    });
  }
}

function updateBloodParticles(delta) {
  for (let i = bloodParticles.length - 1; i >= 0; i--) {
    const p = bloodParticles[i];
    p.life -= delta;

    p.velocity.y -= 9.8 * delta;
    p.mesh.position.addScaledVector(p.velocity, delta);

    if (p.mesh.position.y <= 0.02) {
      p.mesh.position.y = 0.02;
      p.velocity.set(0, 0, 0);
    }

    if (p.life <= 0) {
      scene.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
      bloodParticles.splice(i, 1);
    }
  }
}

// ==========================================
// LANTERNA E ESPINGARDA DO JOGADOR
// ==========================================
const playerItemGroup = new THREE.Group();

const spotLight = new THREE.SpotLight(0xfff1d0, 22, 50, Math.PI / 4.8, 0.4, 1.2);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.position.set(0, 0, 0);

const spotTarget = new THREE.Object3D();
spotTarget.position.set(0, 0, -10);
playerItemGroup.add(spotTarget);
spotLight.target = spotTarget;

const pointLight = new THREE.PointLight(0xffb74d, 2, 5, 2);
pointLight.position.set(0, 0, 0.2);

const lanternMeshGroup = new THREE.Group();
const glassGeo = new THREE.CylinderGeometry(0.1, 0.12, 0.25, 8);
const glassMat = new THREE.MeshBasicMaterial({ color: 0xffda85, transparent: true, opacity: 0.8 });
const glassMesh = new THREE.Mesh(glassGeo, glassMat);

const metalGeo = new THREE.CylinderGeometry(0.13, 0.14, 0.06, 8);
const metalMat = new THREE.MeshStandardMaterial({ color: 0x1f1f1f, roughness: 0.5, metalness: 0.8 });
const topCap = new THREE.Mesh(metalGeo, metalMat);
topCap.position.y = 0.15;
const bottomCap = new THREE.Mesh(metalGeo, metalMat);
bottomCap.position.y = -0.15;

lanternMeshGroup.add(glassMesh, topCap, bottomCap);
lanternMeshGroup.position.set(-0.45, -0.35, -0.6);

const shotgunGroup = new THREE.Group();
const woodMat = new THREE.MeshStandardMaterial({ color: 0x3d2314, roughness: 0.7 });
const gunMetalMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.9, roughness: 0.2 });

const stockGeo = new THREE.BoxGeometry(0.08, 0.12, 0.4);
const stockMesh = new THREE.Mesh(stockGeo, woodMat);
stockMesh.position.set(0, -0.05, 0.2);
stockMesh.rotation.x = -0.15;
shotgunGroup.add(stockMesh);

const gunBodyGeo = new THREE.BoxGeometry(0.09, 0.1, 0.25);
const gunBodyMesh = new THREE.Mesh(gunBodyGeo, gunMetalMat);
gunBodyMesh.position.set(0, 0, -0.05);
shotgunGroup.add(gunBodyMesh);

const barrelGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.75, 8);
const barrelMesh = new THREE.Mesh(barrelGeo, gunMetalMat);
barrelMesh.rotation.x = Math.PI / 2;
barrelMesh.position.set(0, 0.02, -0.45);
shotgunGroup.add(barrelMesh);

const muzzleFlashLight = new THREE.PointLight(0xffaa33, 0, 15);
muzzleFlashLight.position.set(0, 0.02, -0.9);
shotgunGroup.add(muzzleFlashLight);

const shotgunRestPos = new THREE.Vector3(0.4, -0.3, -0.5);
const shotgunRestRot = new THREE.Euler(0, 0, 0);

let recoilZ = 0;
let recoilRotX = 0;

shotgunGroup.position.copy(shotgunRestPos);
playerItemGroup.add(spotLight, pointLight, lanternMeshGroup, shotgunGroup);
camera.add(playerItemGroup);
scene.add(camera);

let isFlashlightOn = true;
let battery = 100;
let canShoot = true;

function toggleFlashlight() {
  isFlashlightOn = !isFlashlightOn;
  spotLight.visible = isFlashlightOn;
  pointLight.visible = isFlashlightOn;
  glassMat.opacity = isFlashlightOn ? 0.8 : 0.1;
  AudioController.playToggle();
}

const raycaster = new THREE.Raycaster();

function shootGun() {
  if (!canShoot || !isGameActive || !isLocked) return;
  canShoot = false;
  AudioController.playShotgun();

  muzzleFlashLight.intensity = 30;
  setTimeout(() => { muzzleFlashLight.intensity = 0; }, 50);

  recoilZ = 0.18;
  recoilRotX = 0.25;

  const muzzleWorldPos = new THREE.Vector3();
  muzzleFlashLight.getWorldPosition(muzzleWorldPos);

  const pelletCount = 8;
  const spreadAngle = 0.06;
  let mainMonsterHit = false;

  for (let i = 0; i < pelletCount; i++) {
    const spreadX = (Math.random() - 0.5) * spreadAngle;
    const spreadY = (Math.random() - 0.5) * spreadAngle;

    raycaster.setFromCamera(new THREE.Vector2(spreadX, spreadY), camera);
    const intersects = raycaster.intersectObjects(shootableObjects, true);

    let hitPoint = new THREE.Vector3();

    if (intersects.length > 0 && intersects[0].distance < 30) {
      hitPoint.copy(intersects[0].point);
      let hitObject = intersects[0].object;

      const shotDir = raycaster.ray.direction.clone();
      spawnGoreEffect(hitPoint, shotDir);

      if (hitObject === monsterBody || hitObject.parent === monsterGroup) {
        mainMonsterHit = true;
      }

      let pEnemyData = null;
      let curr = hitObject;
      while (curr) {
        if (curr.userData && curr.userData.isPassiveEnemy) {
          pEnemyData = curr.userData.enemyData;
          break;
        }
        curr = curr.parent;
      }

      if (pEnemyData && pEnemyData.isAlive) {
        pEnemyData.hp -= 50;

        const pushDir = new THREE.Vector3().subVectors(pEnemyData.group.position, camera.position).normalize();
        pEnemyData.group.position.addScaledVector(pushDir, 1.5);

        if (pEnemyData.hp <= 0) {
          pEnemyData.isAlive = false;
          pEnemyData.group.rotation.x = Math.PI / 2;
          pEnemyData.group.position.y = 0.2;
          pBodyMat.color.setHex(0x1a0505);

          AudioController.playCustomEnemyDeath();
          spawnBloodPuddle(pEnemyData.group.position);
        } else {
          AudioController.playMonsterRoar();
        }
      }
    } else {
      hitPoint = raycaster.ray.origin.clone().add(raycaster.ray.direction.clone().multiplyScalar(30));
    }

    createBulletTracer(muzzleWorldPos, hitPoint);
  }

  if (mainMonsterHit) {
    AudioController.playMonsterRoar();
    const pushDir = new THREE.Vector3().subVectors(monsterGroup.position, camera.position).normalize();
    monsterGroup.position.addScaledVector(pushDir, 8.0);
    showMessage("O impacto da calibre 12 empurrou a criatura para longe!");
  }

  setTimeout(() => {
    canShoot = true;
  }, 750);
}

function createBulletTracer(startPos, endPos) {
  const lineGeo = new THREE.BufferGeometry().setFromPoints([startPos, endPos]);
  const lineMat = new THREE.LineBasicMaterial({
    color: 0xffe082,
    transparent: true,
    opacity: 0.9,
    linewidth: 2
  });

  const tracer = new THREE.Line(lineGeo, lineMat);
  scene.add(tracer);

  bulletTracerLines.push({
    mesh: tracer,
    life: 1.0
  });
}

document.addEventListener('mousedown', (e) => {
  if (e.button === 0) shootGun();
});

// ==========================================
// SISTEMA DE CHUVA
// ==========================================
const rainCount = 4000;
const rainGeo = new THREE.BufferGeometry();
const rainPositions = new Float32Array(rainCount * 2 * 3);
const rainVelocities = new Float32Array(rainCount);

const windX = -0.15;
const windZ = -0.05;
const dropLength = 1.2;

for (let i = 0; i < rainCount; i++) {
  const x = (Math.random() - 0.5) * 70;
  const y = Math.random() * 30;
  const z = (Math.random() - 0.5) * 70;

  rainPositions[i * 6] = x;
  rainPositions[i * 6 + 1] = y;
  rainPositions[i * 6 + 2] = z;

  rainPositions[i * 6 + 3] = x + windX;
  rainPositions[i * 6 + 4] = y - dropLength;
  rainPositions[i * 6 + 5] = z + windZ;

  rainVelocities[i] = 0.7 + Math.random() * 0.5;
}

rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));

const rainMat = new THREE.LineBasicMaterial({
  color: 0x92b3c5,
  transparent: true,
  opacity: 0.4,
  depthWrite: false
});

const rainLines = new THREE.LineSegments(rainGeo, rainMat);
scene.add(rainLines);

function updateRealisticRain() {
  const positions = rainGeo.attributes.position.array;

  for (let i = 0; i < rainCount; i++) {
    const speed = rainVelocities[i];

    positions[i * 6 + 1] -= speed;
    positions[i * 6 + 4] -= speed;

    positions[i * 6] += windX * 0.2;
    positions[i * 6 + 3] += windX * 0.2;
    positions[i * 6 + 2] += windZ * 0.2;
    positions[i * 6 + 5] += windZ * 0.2;

    if (positions[i * 6 + 1] <= 0) {
      const newX = camera.position.x + (Math.random() - 0.5) * 60;
      const newY = 20 + Math.random() * 10;
      const newZ = camera.position.z + (Math.random() - 0.5) * 60;

      positions[i * 6] = newX;
      positions[i * 6 + 1] = newY;
      positions[i * 6 + 2] = newZ;

      positions[i * 6 + 3] = newX + windX;
      positions[i * 6 + 4] = newY - dropLength;
      positions[i * 6 + 5] = newZ + windZ;
    }
  }

  rainGeo.attributes.position.needsUpdate = true;

  if (Math.random() < 0.0015) {
    lightningLight.position.set(camera.position.x + (Math.random() - 0.5) * 50, 40, camera.position.z + (Math.random() - 0.5) * 50);
    lightningLight.intensity = 90;
    AudioController.playThunder();
    setTimeout(() => { lightningLight.intensity = 0; }, 60);
    setTimeout(() => { lightningLight.intensity = 50; }, 120);
    setTimeout(() => { lightningLight.intensity = 0; }, 180);
  }
}

// ==========================================
// CHÃO E ÁRVORES ULTRADETALHADAS
// ==========================================
const floorGeo = new THREE.PlaneGeometry(350, 350);
const floorMat = new THREE.MeshStandardMaterial({ color: 0x0a100a, roughness: 0.95, metalness: 0.05 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const treeObstacles = [];
const pages = [];
const oilCans = [];
const bearTraps = [];
const toxicZones = [];
const pageCountTotal = 5;
let pagesCollected = 0;

function createDetailedTree(x, z) {
  const treeGroup = new THREE.Group();
  const barkMat = new THREE.MeshStandardMaterial({ color: 0x16100c, roughness: 0.9 });
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x051207, roughness: 0.85 });

  const height = 10 + Math.random() * 5;
  const segments = 4;
  let currentY = 0;
  let lastRadius = 0.6 + Math.random() * 0.2;

  for (let r = 0; r < 3; r++) {
    const rootGeo = new THREE.CylinderGeometry(0.1, lastRadius * 0.6, 2, 6);
    const root = new THREE.Mesh(rootGeo, barkMat);
    root.position.set(Math.cos(r * 2) * 0.4, 0.3, Math.sin(r * 2) * 0.4);
    root.rotation.z = Math.PI / 6;
    root.rotation.y = r * 2;
    treeGroup.add(root);
  }

  for (let s = 0; s < segments; s++) {
    const segHeight = height / segments;
    const nextRadius = lastRadius * 0.75;
    const segGeo = new THREE.CylinderGeometry(nextRadius, lastRadius, segHeight, 8);
    const segment = new THREE.Mesh(segGeo, barkMat);

    segment.position.y = currentY + segHeight / 2;
    segment.rotation.z = (Math.random() - 0.5) * 0.12;
    segment.rotation.x = (Math.random() - 0.5) * 0.12;
    segment.castShadow = true;
    segment.receiveShadow = true;
    treeGroup.add(segment);

    if (s > 1) {
      const branchGeo = new THREE.CylinderGeometry(0.06, 0.2, 3.5, 6);
      const branch = new THREE.Mesh(branchGeo, barkMat);
      branch.position.set(0, currentY + segHeight / 2, 0);
      branch.rotation.z = (Math.PI / 3) * (s % 2 === 0 ? 1 : -1);
      branch.rotation.y = Math.random() * Math.PI;
      treeGroup.add(branch);
    }

    currentY += segHeight;
    lastRadius = nextRadius;
  }

  const foliageCount = 5;
  for (let f = 0; f < foliageCount; f++) {
    const folSize = 2.8 + Math.random() * 1.5;
    const folGeo = new THREE.IcosahedronGeometry(folSize, 1);
    const foliage = new THREE.Mesh(folGeo, leafMat);

    foliage.position.set(
      (Math.random() - 0.5) * 2,
      height - 1 + (f * 1.2),
      (Math.random() - 0.5) * 2
    );
    foliage.scale.set(1.2, 0.7 + Math.random() * 0.4, 1.2);
    foliage.castShadow = true;
    treeGroup.add(foliage);
  }

  treeGroup.position.set(x, 0, z);
  scene.add(treeGroup);

  treeObstacles.push({ x: x, z: z, radius: 1.0 });
}

for (let i = 0; i < 150; i++) {
  const angle = Math.random() * Math.PI * 2;
  const dist = 9 + Math.random() * 115;
  createDetailedTree(Math.cos(angle) * dist, Math.sin(angle) * dist);
}

// Armadilhas de Urso
function createBearTrap(x, z) {
  const trapGroup = new THREE.Group();
  const ringGeo = new THREE.TorusGeometry(0.5, 0.05, 8, 16);
  const trapMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8, roughness: 0.4 });
  const ring = new THREE.Mesh(ringGeo, trapMat);
  ring.rotation.x = Math.PI / 2;
  trapGroup.add(ring);

  trapGroup.position.set(x, 0.02, z);
  scene.add(trapGroup);

  bearTraps.push({ mesh: trapGroup, x: x, z: z, triggered: false });
}

for (let i = 0; i < 6; i++) {
  const angle = Math.random() * Math.PI * 2;
  const dist = 10 + Math.random() * 80;
  createBearTrap(Math.cos(angle) * dist, Math.sin(angle) * dist);
}

// Zonas de Névoa Tóxica
function createToxicZone(x, z) {
  const zoneGeo = new THREE.CylinderGeometry(5, 5, 2, 16);
  const zoneMat = new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.12 });
  const zoneMesh = new THREE.Mesh(zoneGeo, zoneMat);
  zoneMesh.position.set(x, 1, z);
  scene.add(zoneMesh);

  toxicZones.push({ mesh: zoneMesh, x: x, z: z, radius: 5 });
}

for (let i = 0; i < 4; i++) {
  const angle = Math.random() * Math.PI * 2;
  const dist = 15 + Math.random() * 70;
  createToxicZone(Math.cos(angle) * dist, Math.sin(angle) * dist);
}

// Arquivos em Altar
const pageLocations = [
  { x: 20, z: -25 },
  { x: -35, z: 15 },
  { x: 40, z: 38 },
  { x: -22, z: -42 },
  { x: 10, z: 50 }
];

pageLocations.forEach((loc, index) => {
  const altarGeo = new THREE.CylinderGeometry(0.4, 0.5, 1.2, 8);
  const altarMat = new THREE.MeshStandardMaterial({ color: 0x1f1915 });
  const altar = new THREE.Mesh(altarGeo, altarMat);
  altar.position.set(loc.x, 0.6, loc.z);
  scene.add(altar);

  const pageGeo = new THREE.PlaneGeometry(0.4, 0.5);
  const pageMat = new THREE.MeshBasicMaterial({ color: 0xfffbeb, side: THREE.DoubleSide });
  const page = new THREE.Mesh(pageGeo, pageMat);
  page.position.set(loc.x, 1.22, loc.z);
  page.rotation.x = -Math.PI / 2;
  scene.add(page);

  const pageGlow = new THREE.PointLight(0xf59e0b, 1.2, 4);
  pageGlow.position.set(loc.x, 1.4, loc.z);
  scene.add(pageGlow);

  pages.push({ mesh: page, glow: pageGlow, collected: false, id: index + 1, x: loc.x, z: loc.z });
});

// Galões de Óleo
const oilLocations = [
  { x: 10, z: -10 },
  { x: -15, z: -20 },
  { x: 25, z: 10 },
  { x: -28, z: 32 },
  { x: 28, z: -38 }
];

oilLocations.forEach((loc) => {
  const oilGroup = new THREE.Group();
  const canGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.4, 12);
  const canMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3, metalness: 0.7 });
  const canMesh = new THREE.Mesh(canGeo, canMat);
  canMesh.position.y = 0.2;
  oilGroup.add(canMesh);

  oilGroup.position.set(loc.x, 0, loc.z);
  scene.add(oilGroup);

  const oilGlow = new THREE.PointLight(0x3b82f6, 0.6, 3);
  oilGlow.position.set(loc.x, 0.5, loc.z);
  scene.add(oilGlow);

  oilCans.push({ group: oilGroup, glow: oilGlow, collected: false, x: loc.x, z: loc.z });
});

// ==========================================
// MONSTRO PRINCIPAL (PERSEGUIDOR)
// ==========================================
const monsterGroup = new THREE.Group();

const monsterBodyGeo = new THREE.CylinderGeometry(0.4, 0.1, 2.2, 8);
const monsterMat = new THREE.MeshBasicMaterial({ color: 0x020202 });
const monsterBody = new THREE.Mesh(monsterBodyGeo, monsterMat);
monsterBody.position.y = 2.0;

const limbMat = new THREE.MeshBasicMaterial({ color: 0x020202 });

const monsterLeftArmPivot = new THREE.Group();
monsterLeftArmPivot.position.set(-0.45, 2.8, 0);
const monsterRightArmPivot = new THREE.Group();
monsterRightArmPivot.position.set(0.45, 2.8, 0);

const armGeo = new THREE.CylinderGeometry(0.06, 0.05, 1.4, 6);
armGeo.translate(0, -0.7, 0);

const leftArm = new THREE.Mesh(armGeo, limbMat);
monsterLeftArmPivot.add(leftArm);

const rightArm = new THREE.Mesh(armGeo, limbMat);
monsterRightArmPivot.add(rightArm);

const monsterLeftLegPivot = new THREE.Group();
monsterLeftLegPivot.position.set(-0.2, 1.2, 0);
const monsterRightLegPivot = new THREE.Group();
monsterRightLegPivot.position.set(0.2, 1.2, 0);

const legGeo = new THREE.CylinderGeometry(0.08, 0.06, 1.2, 6);
legGeo.translate(0, -0.6, 0);

const leftLeg = new THREE.Mesh(legGeo, limbMat);
monsterLeftLegPivot.add(leftLeg);

const rightLeg = new THREE.Mesh(legGeo, limbMat);
monsterRightLegPivot.add(rightLeg);

const eyeGeo = new THREE.SphereGeometry(0.08, 8, 8);
const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
leftEye.position.set(-0.14, 2.9, -0.32);

const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
rightEye.position.set(0.14, 2.9, -0.32);

const monsterAura = new THREE.PointLight(0xef4444, 0.8, 5);
monsterAura.position.set(0, 2, 0);

monsterGroup.add(
  monsterBody,
  monsterLeftArmPivot, monsterRightArmPivot,
  monsterLeftLegPivot, monsterRightLegPivot,
  leftEye, rightEye, monsterAura
);
monsterGroup.position.set(30, 0, 30);
scene.add(monsterGroup);

shootableObjects.push(monsterBody, leftArm, rightArm, leftLeg, rightLeg);

let baseMonsterSpeed = 0.025;

// ==========================================
// INIMIGOS PASSIVOS (VAGANTES)
// ==========================================
const passiveEnemies = [];
const passiveEnemyCount = 6;

const pBodyMat = new THREE.MeshBasicMaterial({ color: 0x05080c });
const pLimbMat = new THREE.MeshBasicMaterial({ color: 0x05080c });

for (let i = 0; i < passiveEnemyCount; i++) {
  const pGroup = new THREE.Group();

  const pBodyGeo = new THREE.CylinderGeometry(0.35, 0.1, 1.8, 8);
  const pBody = new THREE.Mesh(pBodyGeo, pBodyMat);
  pBody.position.y = 1.7;

  const pLeftArmPivot = new THREE.Group();
  pLeftArmPivot.position.set(-0.4, 2.3, 0);
  const pRightArmPivot = new THREE.Group();
  pRightArmPivot.position.set(0.4, 2.3, 0);

  const pArmGeo = new THREE.CylinderGeometry(0.05, 0.04, 1.2, 6);
  pArmGeo.translate(0, -0.6, 0);

  const pLeftArm = new THREE.Mesh(pArmGeo, pLimbMat);
  pLeftArmPivot.add(pLeftArm);

  const pRightArm = new THREE.Mesh(pArmGeo, pLimbMat);
  pRightArmPivot.add(pRightArm);

  const pLeftLegPivot = new THREE.Group();
  pLeftLegPivot.position.set(-0.18, 1.0, 0);
  const pRightLegPivot = new THREE.Group();
  pRightLegPivot.position.set(0.18, 1.0, 0);

  const pLegGeo = new THREE.CylinderGeometry(0.07, 0.05, 1.0, 6);
  pLegGeo.translate(0, -0.5, 0);

  const pLeftLeg = new THREE.Mesh(pLegGeo, pLimbMat);
  pLeftLegPivot.add(pLeftLeg);

  const pRightLeg = new THREE.Mesh(pLegGeo, pLimbMat);
  pRightLegPivot.add(pRightLeg);

  const pEyeGeo = new THREE.SphereGeometry(0.06, 8, 8);
  const pEyeMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

  const pLeftEye = new THREE.Mesh(pEyeGeo, pEyeMat);
  pLeftEye.position.set(-0.12, 2.5, -0.28);
  const pRightEye = new THREE.Mesh(pEyeGeo, pEyeMat);
  pRightEye.position.set(0.12, 2.5, -0.28);

  pGroup.add(
    pBody,
    pLeftArmPivot, pRightArmPivot,
    pLeftLegPivot, pRightLegPivot,
    pLeftEye, pRightEye
  );

  const angle = Math.random() * Math.PI * 2;
  const dist = 20 + Math.random() * 70;
  pGroup.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);

  scene.add(pGroup);
  shootableObjects.push(pBody, pLeftArm, pRightArm, pLeftLeg, pRightLeg);

  const enemyData = {
    group: pGroup,
    hp: 100,
    isAlive: true,
    targetDir: new THREE.Vector3((Math.random() - 0.5), 0, (Math.random() - 0.5)).normalize(),
    changeDirTimer: Math.random() * 200 + 100,
    speed: 0.012 + Math.random() * 0.008,
    leftEye: pLeftEye,
    rightEye: pRightEye,
    blinkTimer: Math.random() * 200,
    animTime: Math.random() * 100,
    leftArmPivot: pLeftArmPivot,
    rightArmPivot: pRightArmPivot,
    leftLegPivot: pLeftLegPivot,
    rightLegPivot: pRightLegPivot
  };

  pBody.userData = { isPassiveEnemy: true, enemyData: enemyData };
  pLeftArm.userData = { isPassiveEnemy: true, enemyData: enemyData };
  pRightArm.userData = { isPassiveEnemy: true, enemyData: enemyData };
  pLeftLeg.userData = { isPassiveEnemy: true, enemyData: enemyData };
  pRightLeg.userData = { isPassiveEnemy: true, enemyData: enemyData };

  passiveEnemies.push(enemyData);
}

function updatePassiveEnemies() {
  passiveEnemies.forEach(p => {
    if (!p.isAlive) return;

    p.changeDirTimer--;
    if (p.changeDirTimer <= 0) {
      p.targetDir.set((Math.random() - 0.5), 0, (Math.random() - 0.5)).normalize();
      p.changeDirTimer = Math.random() * 300 + 150;
    }

    const nextX = p.group.position.x + p.targetDir.x * p.speed;
    const nextZ = p.group.position.z + p.targetDir.z * p.speed;

    if (Math.abs(nextX) < 140 && Math.abs(nextZ) < 140 && !checkCollisions(nextX, nextZ)) {
      p.group.position.x = nextX;
      p.group.position.z = nextZ;

      p.animTime += 0.08;
      p.leftLegPivot.rotation.x = Math.sin(p.animTime) * 0.4;
      p.rightLegPivot.rotation.x = -Math.sin(p.animTime) * 0.4;
      p.leftArmPivot.rotation.x = -Math.sin(p.animTime) * 0.4;
      p.rightArmPivot.rotation.x = Math.sin(p.animTime) * 0.4;
    } else {
      p.targetDir.negate();
    }

    // Orientação corrigida para virar de frente para o caminho de movimento
    const lookTarget = p.group.position.clone().add(p.targetDir);
    p.group.lookAt(lookTarget.x, p.group.position.y, lookTarget.z);
    p.group.rotation.y += Math.PI;

    p.blinkTimer--;
    if (p.blinkTimer <= 0) {
      p.leftEye.visible = false;
      p.rightEye.visible = false;
      if (p.blinkTimer < -10) {
        p.leftEye.visible = true;
        p.rightEye.visible = true;
        p.blinkTimer = Math.random() * 250 + 100;
      }
    }
  });
}

let monsterAnimTime = 0;
function updateMonsterAnim(speed) {
  monsterAnimTime += speed * 3.0;

  monsterLeftLegPivot.rotation.x = Math.sin(monsterAnimTime) * 0.6;
  monsterRightLegPivot.rotation.x = -Math.sin(monsterAnimTime) * 0.6;
  monsterLeftArmPivot.rotation.x = -Math.sin(monsterAnimTime) * 0.6;
  monsterRightArmPivot.rotation.x = Math.sin(monsterAnimTime) * 0.6;
}

let monsterBlinkTimer = Math.random() * 150;
function updateMonsterBlink() {
  monsterBlinkTimer--;
  if (monsterBlinkTimer <= 0) {
    leftEye.visible = false;
    rightEye.visible = false;
    if (monsterBlinkTimer < -8) {
      leftEye.visible = true;
      rightEye.visible = true;
      monsterBlinkTimer = Math.random() * 200 + 80;
    }
  }
}

// ==========================================
// CONTROLES E EVENTOS DE JOGO
// ==========================================
let isGameActive = false;
let isLocked = false;
let isTrapped = false;
let trapTimer = 0;

const instructions = document.getElementById('instructions');
const startBtn = document.getElementById('start-btn');
const gameOverOverlay = document.getElementById('game-over-overlay');
const restartBtn = document.getElementById('restart-btn');

startBtn.addEventListener('click', () => {
  AudioController.init();
  document.body.requestPointerLock();
});

restartBtn.addEventListener('click', () => {
  try {
    window.location.reload();
  } catch (e) {
    history.go(0);
  }
});

document.addEventListener('pointerlockchange', () => {
  if (document.pointerLockElement === document.body) {
    isLocked = true;
    isGameActive = true;
    if (instructions) instructions.classList.add('hidden');
    if (gameOverOverlay) gameOverOverlay.classList.add('hidden');
  } else {
    isLocked = false;
    if (isGameActive && instructions) instructions.classList.remove('hidden');
  }
});

let yaw = 0;
let pitch = 0;

document.addEventListener('mousemove', (e) => {
  if (!isLocked) return;
  yaw -= (e.movementX || 0) * 0.0022;
  pitch -= (e.movementY || 0) * 0.0022;
  pitch = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, pitch));
  camera.rotation.set(pitch, yaw, 0, 'YXZ');
});

const keys = {};
let stamina = 100;
let isSprinting = false;

document.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (e.code === 'KeyF' && isGameActive) toggleFlashlight();
  if (e.code === 'KeyE' && isGameActive) checkInteractions();
});

document.addEventListener('keyup', (e) => {
  keys[e.code] = false;
});

const messageLog = document.getElementById('message-log');
let messageTimeout = null;

function showMessage(text) {
  if (!messageLog) return;
  messageLog.innerText = text;
  clearTimeout(messageTimeout);
  messageTimeout = setTimeout(() => { messageLog.innerText = ''; }, 4000);
}

function checkInteractions() {
  let nearAny = false;

  pages.forEach(p => {
    if (p.collected) return;
    if (camera.position.distanceTo(p.mesh.position) < 2.5) {
      p.collected = true;
      scene.remove(p.mesh);
      scene.remove(p.glow);
      pagesCollected++;

      const pagesCountEl = document.getElementById('pages-count');
      if (pagesCountEl) pagesCountEl.innerText = pagesCollected;

      if (pagesCollected === 3) {
        AudioController.playPage3Audio();
      } else {
        AudioController.playPickup();
      }

      baseMonsterSpeed += 0.006;
      scene.fog.density += 0.003;

      if (pagesCollected >= pageCountTotal) {
        gameOver(true);
      } else {
        showMessage(`Arquivo ${pagesCollected}/${pageCountTotal} resgatado!`);
      }
      nearAny = true;
    }
  });

  oilCans.forEach(o => {
    if (o.collected) return;
    if (camera.position.distanceTo(o.group.position) < 2.5) {
      o.collected = true;
      scene.remove(o.group);
      scene.remove(o.glow);
      battery = Math.min(100, battery + 60);
      AudioController.playOilPickup();
      showMessage("Óleo da lanterna recarregado!");
      nearAny = true;
    }
  });

  if (!nearAny) showMessage("Nada para interagir.");
}

function checkCollisions(newX, newZ) {
  for (let obs of treeObstacles) {
    const dx = newX - obs.x;
    const dz = newZ - obs.z;
    if (Math.sqrt(dx * dx + dz * dz) < obs.radius + 0.3) return true;
  }
  return false;
}

function gameOver(won) {
  isGameActive = false;
  if (document.exitPointerLock) document.exitPointerLock();

  const title = document.getElementById('game-over-title');
  const text = document.getElementById('game-over-text');

  if (won) {
    if (title) { title.innerText = "VOCÊ ESCAPOU!"; title.style.color = "#22c55e"; }
    if (text) text.innerText = "Todos os arquivos foram resgatados da floresta.";
  } else {
    if (title) { title.innerText = "VOCÊ FOI PEGO!"; title.style.color = "#ef4444"; }
    if (text) text.innerText = "A criatura te alcançou na escuridão.";
  }

  if (gameOverOverlay) gameOverOverlay.classList.remove('hidden');
}

// ==========================================
// LOOP DE ANIMAÇÃO
// ==========================================
const playerHeight = 1.6;
camera.position.set(0, playerHeight, 0);

let walkTimer = 0;
let stepAudioTimer = 0;
let heartbeatTimer = 0;
let trackerTimer = 0;
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  updateRealisticRain();
  updateBloodParticles(delta);

  if (isLocked && isGameActive) {
    updatePassiveEnemies();
    updateMonsterBlink();

    for (let i = bulletTracerLines.length - 1; i >= 0; i--) {
      const tracer = bulletTracerLines[i];
      tracer.life -= 0.08;
      tracer.mesh.material.opacity = tracer.life;

      if (tracer.life <= 0) {
        scene.remove(tracer.mesh);
        tracer.mesh.geometry.dispose();
        tracer.mesh.material.dispose();
        bulletTracerLines.splice(i, 1);
      }
    }

    recoilZ = THREE.MathUtils.lerp(recoilZ, 0, 0.12);
    recoilRotX = THREE.MathUtils.lerp(recoilRotX, 0, 0.12);

    shotgunGroup.position.set(
      shotgunRestPos.x,
      shotgunRestPos.y,
      shotgunRestPos.z + recoilZ
    );
    shotgunGroup.rotation.x = shotgunRestRot.x + recoilRotX;

    if (!isTrapped) {
      bearTraps.forEach(trap => {
        if (!trap.triggered) {
          const dist = Math.hypot(camera.position.x - trap.x, camera.position.z - trap.z);
          if (dist < 0.8) {
            trap.triggered = true;
            isTrapped = true;
            trapTimer = 100;
            AudioController.playTrapSnap();
            showMessage("ARMADILHA! Você está preso!");
          }
        }
      });
    } else {
      trapTimer--;
      if (trapTimer <= 0) isTrapped = false;
    }

    toxicZones.forEach(zone => {
      const dist = Math.hypot(camera.position.x - zone.x, camera.position.z - zone.z);
      if (dist < zone.radius) {
        stamina = Math.max(0, stamina - 0.2);
      }
    });

    isSprinting = keys['ShiftLeft'] || keys['ShiftRight'];
    let currentSpeed = isTrapped ? 0 : 0.08;

    if (isSprinting && stamina > 0 && !isTrapped && (keys['KeyW'] || keys['KeyS'] || keys['KeyA'] || keys['KeyD'])) {
      currentSpeed = 0.14;
      stamina = Math.max(0, stamina - 0.4);
    } else {
      stamina = Math.min(100, stamina + 0.4);
    }

    const staminaBar = document.getElementById('stamina-bar');
    if (staminaBar) staminaBar.style.width = `${stamina}%`;

    if (isFlashlightOn) {
      battery = Math.max(0, battery - 0.008);
      const batteryLevel = document.getElementById('battery-level');
      if (batteryLevel) batteryLevel.innerText = `${Math.ceil(battery)}%`;

      if (battery < 30 && Math.random() < 0.05) {
        spotLight.intensity = Math.random() * 8;
      } else if (battery >= 30) {
        spotLight.intensity = 22;
      }

      if (battery <= 0) {
        toggleFlashlight();
        showMessage("A lanterna apagou por falta de óleo!");
      }
    }

    const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
    const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), yaw);

    let moveX = 0;
    let moveZ = 0;

    if (!isTrapped) {
      if (keys['KeyW']) { moveX += forward.x; moveZ += forward.z; }
      if (keys['KeyS']) { moveX -= forward.x; moveZ -= forward.z; }
      if (keys['KeyA']) { moveX -= right.x; moveZ -= right.z; }
      if (keys['KeyD']) { moveX += right.x; moveZ += right.z; }
    }

    const isMoving = moveX !== 0 || moveZ !== 0;

    if (isMoving) {
      const moveDir = new THREE.Vector3(moveX, 0, moveZ).normalize();
      const nextX = camera.position.x + moveDir.x * currentSpeed;
      const nextZ = camera.position.z + moveDir.z * currentSpeed;

      if (!checkCollisions(nextX, camera.position.z)) camera.position.x = nextX;
      if (!checkCollisions(camera.position.x, nextZ)) camera.position.z = nextZ;

      walkTimer += isSprinting ? 0.28 : 0.16;

      const bobY = Math.sin(walkTimer) * (isSprinting ? 0.1 : 0.05);
      const bobX = Math.cos(walkTimer * 0.5) * (isSprinting ? 0.05 : 0.02);

      camera.position.y = playerHeight + bobY;
      playerItemGroup.position.set(bobX, bobY * 0.5, 0);

      stepAudioTimer += isSprinting ? 0.28 : 0.16;
      if (stepAudioTimer > Math.PI) {
        AudioController.playStep();
        stepAudioTimer = 0;
      }
    } else {
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, playerHeight, 0.1);
      playerItemGroup.position.lerp(new THREE.Vector3(0, 0, 0), 0.1);
    }

    trackerTimer += 0.016;
    let closestPageDist = Infinity;
    let isFacingPage = false;

    pages.forEach(p => {
      if (p.collected) return;
      const dirToPage = new THREE.Vector3().subVectors(p.mesh.position, camera.position);
      dirToPage.y = 0;
      const dist = dirToPage.length();

      if (dist < closestPageDist) {
        closestPageDist = dist;
        const lookDir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
        lookDir.y = 0;
        lookDir.normalize();
        dirToPage.normalize();
        if (lookDir.dot(dirToPage) > 0.85) {
          isFacingPage = true;
        }
      }
    });

    if (trackerTimer > (isFacingPage ? 0.35 : 1.4) && closestPageDist < 35) {
      if (isFacingPage) {
        AudioController.playTrackerBeep(850 + (35 - Math.min(35, closestPageDist)) * 15);
      }
      trackerTimer = 0;
    }

    const dirToMonster = new THREE.Vector3().subVectors(monsterGroup.position, camera.position);
    dirToMonster.y = 0;
    const distToMonster = dirToMonster.length();

    // Trigger para tocar o áudio do Michael Jackson na aproximação
    if (distToMonster < 15.0) {
      AudioController.playProximityAudio();
    }

    const lookDir = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    lookDir.y = 0;
    lookDir.normalize();

    const monsterDirNorm = dirToMonster.clone().normalize();
    const dot = lookDir.dot(monsterDirNorm);

    let actualMonsterSpeed = baseMonsterSpeed;

    if (dot > 0.4 && isFlashlightOn) {
      actualMonsterSpeed *= 0.25;
      if (Math.random() < 0.2) spotLight.intensity = Math.random() * 5;
    } else {
      actualMonsterSpeed *= 1.3;
      if (isFlashlightOn && battery >= 30) spotLight.intensity = 22;
    }

    if (distToMonster > 1.0) {
      const nextMonsterX = monsterGroup.position.x - monsterDirNorm.x * actualMonsterSpeed;
      const nextMonsterZ = monsterGroup.position.z - monsterDirNorm.z * actualMonsterSpeed;

      let canMoveX = !checkCollisions(nextMonsterX, monsterGroup.position.z);
      let canMoveZ = !checkCollisions(monsterGroup.position.x, nextMonsterZ);

      if (canMoveX) monsterGroup.position.x = nextMonsterX;
      if (canMoveZ) monsterGroup.position.z = nextMonsterZ;

      if (!canMoveX || !canMoveZ) {
        const slideX = monsterGroup.position.x + monsterDirNorm.z * actualMonsterSpeed;
        const slideZ = monsterGroup.position.z - monsterDirNorm.x * actualMonsterSpeed;
        if (!checkCollisions(slideX, slideZ)) {
          monsterGroup.position.x = slideX;
          monsterGroup.position.z = slideZ;
        }
      }

      // Orientação corrigida para olhar de frente para o jogador
      monsterGroup.lookAt(camera.position.x, 1.7, camera.position.z);
      monsterGroup.rotation.y += Math.PI;

      updateMonsterAnim(actualMonsterSpeed);
    } else {
      gameOver(false);
    }

    if (distToMonster < 25) {
      const panicFactor = 1 - (distToMonster / 25);
      panicOverlay.style.boxShadow = `inset 0 0 ${120 * panicFactor}px rgba(220, 38, 38, ${0.85 * panicFactor})`;

      heartbeatTimer += 0.016 + (0.04 * panicFactor);
      if (heartbeatTimer > 1) {
        AudioController.playHeartbeat(panicFactor);
        heartbeatTimer = 0;
      }
    } else {
      panicOverlay.style.boxShadow = 'inset 0 0 0px rgba(0,0,0,0)';
    }
  }

  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
