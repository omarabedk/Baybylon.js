
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
		scene.gravity = new BABYLON.Vector3(0, -0.01, 0);
		//scene.applyGravity = true;
		
		const light0 = new BABYLON.HemisphericLight("l0",new BABYLON.Vector3(1,1,0), scene);
        	const light1 = new BABYLON.HemisphericLight("l0",new BABYLON.Vector3(1,-1,0), scene);
        	light1.intensity = 0.2 ;

        	const light2 = new BABYLON.HemisphericLight("l0",new BABYLON.Vector3(1,-1,0), scene);
        	light2.intensity = 0.2 ;

    		const Wall = PRIMS.standardMaterial("mat_wall",{texture:"./assets/wall.jpg"},scene) ; 
    		const Wall1 = PRIMS.standardMaterial("mat_wall1",{texture:"./assets/wall1.jpg",uScale:25,vScale:25},scene);
			const Sol = PRIMS.standardMaterial("mat_sol",{texture:"./assets/sol.jpg"},scene) ; 
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

			const glassMaterial = new BABYLON.PBRMaterial("glassMaterial", scene);

			// // Set the transparency of the material
			// glassMaterial.PBRMATERIAL_ALPHABLEND= 0.8; // Less transparent (0.8 = 80% opaque)
		
			// // Set the base color (optional, can be used to tint the glass)
			// glassMaterial.albedoColor = new BABYLON.Color3(0.9, 5, 1); // Slight blue tint
		
			// // Enable reflections
			 glassMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/textures/skyboxes/CloudyLightRays", scene); // Use a skybox for reflections
			 glassMaterial.reflectionTexture.level = 10; // Increase reflection intensity
		
			// // Add some metallic effect (makes it look more like glass)
			// glassMaterial.metallic = 10; // High metallic value for glass-like reflectivity
		
			// // Add roughness to make it less shiny (optional)
			// glassMaterial.roughness = 5; // Lower values = smoother, higher values = rougher
		
			// Enable transparency
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
				
//PLAFOND
			//2ème étage
		const plafond = PRIMS.wall("plafond",{hauteur:15,largeur:30,epaisseur:0.5,materiau:Plaf1}, scene) ; 
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
