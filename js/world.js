
import {PRIMS} from './prims.js' ; 
import {Simu}  from './simu.js' ; 

class World extends Simu {

	constructor(){
		super() ; 
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
		scene.applyGravity = true;
		
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

		const assetsManager = new BABYLON.AssetsManager(scene);
		const Stair1 = assetsManager.addMeshTask("objTask", "", "./assets/obj/objects/", "stairs.obj");
		const Stair2 = assetsManager.addMeshTask("objTask", "", "./assets/obj/objects/", "stairs.obj");

		Stair1.onSuccess = function (task) {
			task.loadedMeshes.forEach(mesh => {
				mesh.position = new BABYLON.Vector3(12.5, 0, -6);
				mesh.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
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
		Stair2.onSuccess = function (task) {
			task.loadedMeshes.forEach(mesh => {
				mesh.position = new BABYLON.Vector3(-12.5, 0, -6);
				mesh.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
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


		
		// const MainDoor = assetsManager.addMeshTask("objTask", "", "./assets/obj/objects/", "MainDoor.obj"); 

		// let doorOpen = false; // Track door state
		// const player = scene.activeCamera; // Assuming the player is controlled by the camera
		// const doorClosedAngle = Math.PI / 2; // Ensure the correct closed position
		// const doorOpenAngle = 0; // Open position

		// MainDoor.onSuccess = function (task) {
		// 	task.loadedMeshes.forEach(mesh => {
		// 		mesh.position = new BABYLON.Vector3(0, 1, -15);
		// 		mesh.scaling = new BABYLON.Vector3(0.12, 0.12, 0.12);
		// 		mesh.rotation = new BABYLON.Vector3(0, doorClosedAngle, 0); // Ensure it starts closed
		// 		mesh.checkCollisions = true;
				
		// 		scene.onBeforeRenderObservable.add(() => {
		// 			const distance = BABYLON.Vector3.Distance(player.position, mesh.position);
		// 			console.log("Distance to door:", distance); // Debug log
		// 			console.log("doorOpen:", doorOpen); // Debug log
		// 			if (distance > 3 && !doorOpen) {
		// 				console.log("Opening door...");
		// 				BABYLON.Animation.CreateAndStartAnimation(
		// 					"closeDoor",
		// 					mesh, "rotation.y",
		// 					60, 60, doorClosedAngle, doorOpenAngle,
		// 					BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
		// 				);
		// 			}
		// 		});
		// 	});
		// };


		const MainDoor = assetsManager.addMeshTask("objTask", "", "./assets/obj/objects/", "MainDoor.obj");

let doorOpen = false; // false = fermé
const player = scene.activeCamera;

MainDoor.onSuccess = function (task) {
    const doorParent = new BABYLON.Mesh("doorParent", scene);
    task.loadedMeshes.forEach(mesh => {
        mesh.setParent(doorParent);
    });

    doorParent.position = new BABYLON.Vector3(0, 1, -15);
    doorParent.scaling = new BABYLON.Vector3(0.12, 0.12, 0.12);
    const boundingBox = doorParent.getBoundingInfo().boundingBox;
    const pivotX = boundingBox.minimum.x;
    doorParent.setPivotPoint(new BABYLON.Vector3(pivotX, 0, 0));
    
    // Position initiale : fermée
    doorParent.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0); // Math.PI/2 = fermé
    doorParent.checkCollisions = true;

    // Logs pour vérifier
    console.log("Initial rotation.y:", doorParent.rotation.y);

    scene.onBeforeRenderObservable.add(() => {
        const distance = BABYLON.Vector3.Distance(player.position, doorParent.position);
        console.log("Distance to door:", distance);
        console.log("doorOpen:", doorOpen);

        if (distance > 3 && doorOpen) {
            console.log("closing door...");
            BABYLON.Animation.CreateAndStartAnimation(
                "closeDoor",
                doorParent,
                "rotation.y",
                60, 60,
                doorParent.rotation.y, Math.PI / 2, // Cible : fermé
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
            ).onAnimationEnd = () => {
                console.log("Closed, rotation.y:", doorParent.rotation.y);
            };
            doorOpen = false;
        } 
        else if (distance < 3 && !doorOpen) {
            console.log("Opening door...");
            BABYLON.Animation.CreateAndStartAnimation(
                "openDoor",
                doorParent,
                "rotation.y",
                60, 60,
                doorParent.rotation.y, 0, // Cible : ouvert
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
            ).onAnimationEnd = () => {
                console.log("Opened, rotation.y:", doorParent.rotation.y);
            };
            doorOpen = true;
        }
    });
};



		
	
		
		assetsManager.load();
		







		



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
				
//PLAFOND
			//2ème étage
		const plafond = PRIMS.wall("plafond",{hauteur:15,largeur:30,epaisseur:0.5,materiau:Stairs}, scene) ; 
			plafond.position = new BABYLON.Vector3(0,5,0) ; 
			plafond.rotation.x= Math.PI/2;
			//2ème étage
		const plafond1 = PRIMS.wall("plafond-1",{hauteur:30,largeur:30,epaisseur:0.5,materiau:Plaf1}, scene) ; 
			plafond1.position = new BABYLON.Vector3(0,10,-15) ; 
			plafond1.rotation.x= Math.PI/2;

			const boite = BABYLON.MeshBuilder.CreateBox("boite",{height:6,width:3,depth:0.5,materialz:Wall}, scene) ; 
			boite.position = new BABYLON.Vector3(0,1,-15) ; 
			const porte = PRIMS.creuser(mur1,boite);
			porte.material = Wall;
			porte.checkCollisions = true;

    		const poster = PRIMS.poster("poster01",{tableau:"./assets/4.jpg"},scene);
    		poster.parent = mur2 ; 
    		poster.position.y = 1.7 ; 
    		poster.position.z = 0.1 ; 
    		poster.rotation.y = Math.PI ; 

    	}

}

export {World}
