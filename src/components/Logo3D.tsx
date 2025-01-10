import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Logo3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const logoTextureRef = useRef<HTMLImageElement>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Create scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 300); // Reduced size by 25%
    mountRef.current.appendChild(renderer.domElement);

    // Create a plane geometry for the logo
    const geometry = new THREE.PlaneGeometry(3, 3);
    
    // Load logo texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('/lovable-uploads/TabbitLogo.png', (texture) => {
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      });
      const plane = new THREE.Mesh(geometry, material);
      scene.add(plane);
    });

    camera.position.z = 4;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Animation
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = 150;
    const windowHalfY = 150;

    const onDocumentMouseMove = (event: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      mouseX = (event.clientX - rect.left - windowHalfX) / 100;
      mouseY = (event.clientY - rect.top - windowHalfY) / 100;
    };

    mountRef.current.addEventListener('mousemove', onDocumentMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate based on mouse position
      if (scene.children[1]) {
        scene.children[1].rotation.y = mouseX * 0.5;
        scene.children[1].rotation.x = mouseY * 0.5;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      mountRef.current?.removeEventListener('mousemove', onDocumentMouseMove);
    };
  }, []);

  return <div ref={mountRef} className="mx-auto" style={{ width: '300px', height: '300px' }} />;
};

export default Logo3D;