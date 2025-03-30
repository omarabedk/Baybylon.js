
import {PRIMS} from './prims.js' ; 
import {Simu}  from './simu.js' ; 

class World extends Simu {

	constructor() {
        super();
        this.doors = [];  // Array to store door objects and their states
    }

	requete_http(www, port, requete, foo){
		const entete = "http://" + www + ":" + port + "/" + requete ;
		loadJSON(entete, (res) => {
			const data = JSON.parse(res) ; 
			foo(data) ; 
		}) ;
	} 



	createWorld(data) {
		
		const scene = this.scene ;
		scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), BABYLON.OimoJSPlugin);
		scene.gravity = new BABYLON.Vector3(0, -0.01, 0);
		//scene.applyGravity = true;
		
		const light0 = new BABYLON.HemisphericLight("l0",new BABYLON.Vector3(1,1,0), scene);
		const light1 = new BABYLON.HemisphericLight("l0",new BABYLON.Vector3(1,-1,0), scene);
		light1.intensity = 0.2 ;

		const light2 = new BABYLON.HemisphericLight("l0",new BABYLON.Vector3(1,-1,0), scene);
		light2.intensity = 0.2 ;

		const Wall = PRIMS.standardMaterial("mat_wall",{texture:"./assets/wall.jpg"},scene) ; 
		const Wall1 = PRIMS.standardMaterial("mat_wall1",{texture:"./assets/wall1.jpg",uScale:25,vScale:25},scene);
		const Sol = PRIMS.standardMaterial("mat_sol",{texture:"./assets/outside-floor.jpg",uScale:25,vScale:25},scene) ; 
		const Stairs = PRIMS.standardMaterial("mat_sol",{texture:"./assets/sol2.jpg"},scene) ; 
		const Plaf = PRIMS.standardMaterial("mat_plaf",{texture:"./assets/plaf.jpg",uScale:25,vScale:25},scene);
		const Plaf1 = PRIMS.standardMaterial("mat_plaf1",{texture:"./assets/plaf1.jpg",uScale:25,vScale:25},scene);

		const ciel = PRIMS.sky("ciel",  {}, scene) ; 

		const sol = PRIMS.ground("sol", {materiau:Sol}, scene) ;

		const sphere = PRIMS.sphere("sph1", {}, scene) ; 
		const sph    = PRIMS.sphere("sph2", {}, scene);
		sph.position.y = 0.5 ; 
 
    	const sph1 = PRIMS.creuser(sphere,sph);
//MUR
			//1er étage
   		const mur1 = BABYLON.MeshBuilder.CreateBox("wall-i",{height:5,width:30,depth:0.5,material:Wall}, scene) ;
		    mur1.position = new BABYLON.Vector3(0,2.5,-15) ;


    	const mur2 = PRIMS.wall("wall-2",{hauteur:5,largeur:30,epaisseur:0.5,materiau:Wall}, scene) ; 
    		mur2.position = new BABYLON.Vector3(15,0,0) ; 
			mur2.rotation.y= Math.PI/2;
		
		const mur3 = PRIMS.wall("wall-3",{hauteur:5,largeur:30,epaisseur:0.5,materiau:Wall}, scene) ; 
			mur3.position = new BABYLON.Vector3(-15,0,0) ; 
			mur3.rotation.y= Math.PI/2;

		const mur4 = PRIMS.wall("wall-4",{hauteur:5,largeur:30,epaisseur:0.5,materiau:Wall}, scene) ; 
			mur4.position = new BABYLON.Vector3(0,0,15) ; 
			
			//2ème étage
			// Glass Material with Reflection and Controlled Transparency
		const glassMaterial = new BABYLON.PBRMaterial("glass", scene);
		glassMaterial.albedoColor = new BABYLON.Color3(0.9, 0.95, 1); // Subtle blue tint

		// Reduce transparency (0 = fully transparent, 1 = fully opaque)
		glassMaterial.alpha = 0.5; 

		// Enable reflections
		glassMaterial.reflectionTexture = scene.environmentTexture; 
		glassMaterial.metallic = 0.5;  // Controls reflectiveness
		glassMaterial.roughness = 0.5; // Makes the glass smooth

		// Use proper transparency blending
		glassMaterial.transparencyMode = BABYLON.PBRMaterial.PBRMATERIAL_ALPHABLEND;

		const mur5 = PRIMS.wall("wall-5",{hauteur:5,largeur:30,epaisseur:0.5,materiau:glassMaterial}, scene) ; 
			mur5.position = new BABYLON.Vector3(0,5,-15) ; 

		const mur6 = PRIMS.wall("wall-6",{hauteur:5,largeur:30,epaisseur:0.5,materiau:glassMaterial}, scene) ; 
			mur6.position = new BABYLON.Vector3(15,5,0) ; 
			mur6.rotation.y= Math.PI/2;
			
		const mur7 = PRIMS.wall("wall-7",{hauteur:5,largeur:30,epaisseur:0.5,materiau:glassMaterial}, scene) ; 
			mur7.position = new BABYLON.Vector3(-15,5,0) ; 
			mur7.rotation.y= Math.PI/2;
	
		const mur8 = PRIMS.wall("wall-8",{hauteur:5,largeur:30,epaisseur:0.5,materiau:glassMaterial}, scene) ; 
			mur8.position = new BABYLON.Vector3(0,5,15) ;

			//Mur des salles
			let mur9 = BABYLON.MeshBuilder.CreateBox("wall-9",{height:5,width:30,depth:0.5,material:Wall}, scene) ;
		    mur9.position = new BABYLON.Vector3(0,2.5,0.3) ;
			const mur10 = PRIMS.wall("wall-10",{hauteur:5,largeur:15,epaisseur:0.5,materiau:Wall}, scene) ;
		    mur10.position = new BABYLON.Vector3(4.9,0,7.6) ;
			mur10.rotation.y = Math.PI/2 ;
			const mur11 = PRIMS.wall("wall-11",{hauteur:5,largeur:15,epaisseur:0.5,materiau:Wall}, scene) ;
		    mur11.position = new BABYLON.Vector3(-4.9,0,7.6) ;
			mur11.rotation.y = Math.PI/2 ;
			
				
//PLAFOND
			//2ème étage
		const plafond = PRIMS.wall("plafond",{hauteur:15,largeur:30,epaisseur:0.5,materiau:Stairs}, scene) ; 
			plafond.position = new BABYLON.Vector3(0,5,0) ; 
			plafond.rotation.x= Math.PI/2;
			//2ème étage
		const plafond1 = PRIMS.wall("plafond-1",{hauteur:30,largeur:30,epaisseur:0.5,materiau:Plaf1}, scene) ; 
			plafond1.position = new BABYLON.Vector3(0,10,-15) ; 
			plafond1.rotation.x= Math.PI/2;


			//LES PORTES
			PRIMS.CreuserPorte(mur1, {x:0,y:1,z:-15,material:Wall}, scene)
			mur9 = PRIMS.CreuserPorte(mur9, {x:-10,y:1,z:0.3,material:Wall}, scene)
			mur9 = PRIMS.CreuserPorte(mur9, {x:0,y:1,z:0.3,material:Wall}, scene)
			mur9 = PRIMS.CreuserPorte(mur9, {x:10,y:1,z:0.3,material:Wall}, scene)
			

			
			
		//ADD posters
    		const poster = PRIMS.poster("poster01",{tableau:"./assets/4.jpg"},scene);
    		poster.parent = mur2 ; 
    		poster.position.y = 1.7 ; 
    		poster.position.z = 0.1 ; 
    		poster.rotation.y = Math.PI ;

		

		//Create doors
		this.doors.push(this.createDoor("door1", new BABYLON.Vector3(0, 1.5, -15), Wall1, scene));
		this.doors.push(this.createDoor("door2", new BABYLON.Vector3(-10, 1.5, 0.3), Wall1, scene));
		this.doors.push(this.createDoor("door3", new BABYLON.Vector3(0, 1.5, 0.3), Wall1, scene));
		this.doors.push(this.createDoor("door4", new BABYLON.Vector3(10, 1.5, 0.3), Wall1, scene));

		// Animate door
		scene.onBeforeRenderObservable.add(async () => {
			let camera = scene.activeCamera;
			let proximityThreshold = 9; 

			for (let doorData of this.doors) {
				let { door, openPosition, closedPosition, doorState, isAnimating } = doorData;
				let distance = BABYLON.Vector3.DistanceSquared(camera.position, door.position);

				if (distance < proximityThreshold && doorState !== "open" && !isAnimating) {
					doorData.isAnimating = true;
					doorData.doorState = "open";
					await PRIMS.animateDoor(door, door.position, openPosition, scene, 2); 
					doorData.isAnimating = false;
					console.log(`${door.name} opened`);
				} else if (distance >= proximityThreshold && doorState !== "closed" && !isAnimating) {
					doorData.isAnimating = true;
					doorData.doorState = "closed";
					await PRIMS.animateDoor(door, door.position, closedPosition, scene, 1); 
					doorData.isAnimating = false;
					console.log(`${door.name} closed`);
				}
			}
		});

		// les 1 ere escalier
        const stairs1 = PRIMS.creerEscalier("stairs1", {
            steps: 15,
            stepWidth: 4,
            stepHeight: 0.75,
            stepDepth: 0.35,
            materiau: Stairs
        }, scene);
        stairs1.checkCollisions = true; // Enable collision for the stairs
        stairs1.position.z = -11.3;
        stairs1.position.x = 12;
        stairs1.rotation.x = BABYLON.Tools.ToRadians(-90);
        stairs1.rotation.y = BABYLON.Tools.ToRadians(-180);

		// les 2 ere escalier
        const stairs2 = PRIMS.creerEscalier("stairs2", {
            steps: 15,
            stepWidth: 4,
            stepHeight: 0.75,
            stepDepth: 0.35,
            materiau: Stairs
        }, scene);
        stairs2.checkCollisions = true; // Enable collision for the stairs
        stairs2.position.z = -11.3;
        stairs2.position.x = -12;
        stairs2.rotation.x = BABYLON.Tools.ToRadians(-90);
        stairs2.rotation.y = BABYLON.Tools.ToRadians(-180);
	
		
		const assetsManager = new BABYLON.AssetsManager(scene);

		const Tree = assetsManager.addMeshTask("objTask", "", "./assets/obj/objects/", "Tree.obj");

		Tree.onSuccess = function (task) {
			task.loadedMeshes.forEach(mesh => {
				mesh.position = new BABYLON.Vector3(25, 0, -6);
				mesh.scaling = new BABYLON.Vector3(1, 1, 1);
				mesh.material = Stairs;
				mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
					mesh,
					BABYLON.PhysicsImpostor.MeshImpostor, 
					{ mass: 0, friction: 0.5, restitution: 0 }, 
					scene
				);
				mesh.checkCollisions = true;
			});
		};

		const Tree1 = assetsManager.addMeshTask("objTask", "", "./assets/obj/objects/", "Tree1.obj");

		Tree1.onSuccess = function (task) {
			task.loadedMeshes.forEach(mesh => {
				mesh.position = new BABYLON.Vector3(-25, 0, -12);
				mesh.scaling = new BABYLON.Vector3(1, 1, 1);
				mesh.material = Stairs;
				mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
					mesh,
					BABYLON.PhysicsImpostor.MeshImpostor, 
					{ mass: 0, friction: 0.5, restitution: 0 }, 
					scene
				);
				mesh.checkCollisions = true;
			});
		};


		const Lamp1 = assetsManager.addMeshTask("objTask", "", "./assets/obj/objects/", "lamp.obj");

		Lamp1.onSuccess = function (task) {
			task.loadedMeshes.forEach(mesh => {
				mesh.position = new BABYLON.Vector3(0, 6.2, -7);
				mesh.scaling = new BABYLON.Vector3(0.15, 0.15, 0.15);
				mesh.material = Stairs;
				mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
					mesh,
					BABYLON.PhysicsImpostor.MeshImpostor, 
					{ mass: 0, friction: 0.5, restitution: 0 }, 
					scene
				);
				mesh.checkCollisions = true;
			});
		};

		const Lamp2 = assetsManager.addMeshTask("objTask", "", "./assets/obj/objects/", "lamp1.obj");

		Lamp2.onSuccess = function (task) {
			task.loadedMeshes.forEach(mesh => {
				mesh.position = new BABYLON.Vector3(0, 7.5, 4);
				mesh.scaling = new BABYLON.Vector3(0.02, 0.02, 0.02);
				mesh.material = Stairs;
				mesh.physicsImpostor = new BABYLON.PhysicsImpostor(
					mesh,
					BABYLON.PhysicsImpostor.MeshImpostor, 
					{ mass: 0, friction: 0.5, restitution: 0 }, 
					scene
				);
				mesh.checkCollisions = true;
			});
		};
		







		

		assetsManager.load();

		 

    	}

		createDoor(name, position, material, scene) {
			let door = PRIMS.createSlidingDoor(name, { width: 3, height: 5, material }, scene);
			door.position = position;
		
			let closedPosition = door.position.clone();
			let openPosition = door.position.clone();
			openPosition.x += 3; 
		
			return {
				door,
				closedPosition,
				openPosition,
				doorState: "closed",
				isAnimating: false
			};
		}

}

export {World}
