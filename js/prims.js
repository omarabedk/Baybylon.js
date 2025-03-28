

function creerScene(){
	var scn = new BABYLON.Scene(engine) ; 
	scn.gravity = new BABYLON.Vector3(0,-9.8,0) ; 
	scn.collisionsEnabled = true ;
	return scn ;
}


function creerCamera(name,options,scn){
	// console.log("creation camera");
	// Création de la caméra
	// =====================

	const camera = new BABYLON.UniversalCamera(name,new BABYLON.Vector3(10,1.7,5),scn) ;
	camera.setTarget(new BABYLON.Vector3(0.0,0.7,0.0)) ; 

    camera.minZ = 0.05 ; 

	camera.checkCollisions = true ;
	camera.ellipsoid = new BABYLON.Vector3(0.5,1.0,0.5) ;
	camera.applyGravity = true ;
	camera.keysUp = [90,38];
	camera.keysDown = [40,83];
	camera.keysLeft = [81,37];
	camera.keysRight = [68,39];
	camera.inertia = 0.01;
	camera.angularSensibility  = 1000; 


	return camera
}

function creerReticule(nom, opts, scn){
	const reticule = BABYLON.MeshBuilder.CreateSphere("reticule", {segments:4, diameter:0.0025}, scn);
	const retMat   = new BABYLON.StandardMaterial("reticuleMat", scn);
	retMat.emissiveColor = BABYLON.Color3.Red();
	retMat.specularColor = BABYLON.Color3.Black();
    	retMat.diffuseColor  = BABYLON.Color3.Black();
	reticule.material = retMat ; 
	reticule.isPickable = false;
	reticule.position.z = 0.3;  
	
	return reticule;
}

function creerCiel(nom,options,scene){
    const skyMaterial = new BABYLON.StandardMaterial("mat_skybox", scene);
    skyMaterial.backFaceCulling = false ;
    skyMaterial.reflectionTexture = new BABYLON.CubeTexture("./assets/skybox/skybox", scene);
    skyMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyMaterial.diffuseColor = new BABYLON.Color3(0,0,0);
    skyMaterial.specularColor = new BABYLON.Color3(0,0,0);

    const skyBox = BABYLON.Mesh.CreateBox("skybox",100,scene);
    skyBox.material = skyMaterial ;

    return skyBox ;
}

function creerSol(name,options,scn){
	options = options || {} ;
	const width    = options.largeur    || 100.0 ; 
	const height   = options.profondeur || width ;  

	const subdivisions = Math.round(width / 10) ;  

	let materiau = options.materiau || null ;
	
	const sol = BABYLON.MeshBuilder.CreateGround(name,{width, height,subdivisions},scn) ;
	
	if(materiau){
		sol.material = materiau ; 
	} else {
		materiau = new BABYLON.StandardMaterial("materiau-defaut-" + name, scn) ; 
		materiau.diffuseColor = new BABYLON.Color3(1.0,0.8,0.6) ;   
		sol.material = materiau ; 
	} ;

	sol.checkCollisions = true ;
	
	return sol ; 
	
}

function creerPrairie(name,options,scn){
	let sol = BABYLON.Mesh.CreateGround(name,220.0,220.0,2.0,scn) ;
	sol.checkCollisions = true ;
	sol.material = new BABYLON.StandardMaterial("blanc",scn) ;
	// sol.material.diffuseColor  = new BABYLON.Color3(1.0,0,0) ;
	sol.material.diffuseTexture = new BABYLON.Texture('./assets/textures/grass.png',scn);
	sol.material.specularTexture = new BABYLON.Texture('./assets/textures/grass.png',scn);
	sol.material.emissiveTexture = new BABYLON.Texture('./assets/textures/grass.png',scn);
	sol.material.ambientTexture = new BABYLON.Texture('./assets/textures/grass.png',scn);
	sol.material.diffuseTexture.uScale = 10.0;
	sol.material.diffuseTexture.vScale = 10.0;
	sol.material.specularTexture.uScale = 10.0;
	sol.material.specularTexture.vScale = 10.0;
	sol.material.emissiveTexture.uScale = 10.0;
	sol.material.emissiveTexture.vScale = 10.0;
	sol.material.ambientTexture.uScale = 10.0;
	sol.material.ambientTexture.vScale = 10.0;
	sol.receiveShadows = true;
	sol.metadata = {"type": 'ground'}
	return sol
}

function creerMateriauStandard(nom,options,scn){
	let couleur = options.couleur || null ; 
	let texture = options.texture || null ; 
	let uScale  = options.uScale  || 1.0 ; 
	let vScale  = options.vScale  || 1.0 ; 

	let materiau = new BABYLON.StandardMaterial(nom,scn) ; 
	if(couleur != null) materiau.diffuseColor = couleur ; 
	if(texture!= null){
		materiau.diffuseTexture = new BABYLON.Texture(texture,scn) ; 
		materiau.diffuseTexture.uScale = uScale ; 
		materiau.diffuseTexture.vScale = vScale ; 
	}
	return materiau ; 
}


function creerSphere(nom,opts,scn){

	let options  = opts || {} ; 
	let diametre = opts.diametre || 1.0 ; 
	let materiau = opts.materiau || null ; 
	
	if(materiau == null){
		materiau = new BABYLON.StandardMaterial("blanc",scn) ;
		materiau.diffuseColor = new BABYLON.Color3(1.0,1.0,1.0) ; 
	}

	let sph = BABYLON.Mesh.CreateSphere(nom,16,diametre,scn) ;
	sph.material              = materiau

	return sph;

}


function creerBoite(nom, opts, scn){
	let options  = opts || {} ; 
	let width    = opts.largeur    || 1.0 ; 
	let height   = opts.hauteur   || 1.0 ; 
	let depth    = opts.profondeur    || 1.0 ; 
	let materiau = opts.materiau || null ; 
	
	if(materiau == null){
		materiau = new BABYLON.StandardMaterial("blanc",scn) ;
		materiau.diffuseColor = new BABYLON.Color3(1.0,1.0,1.0) ; 

	}

	let box      = BABYLON.MeshBuilder.CreateBox(nom,{width,height,depth},scn) ;
	box.material = materiau

	return box;
}

function creerPoster(nom,opts,scn){

	let options = opts || {} ; 
	let hauteur = options["hauteur"] || 1.0 ; 
	let largeur = options["largeur"] || 1.0 ; 	
	let textureName = options["tableau"] || ""; 

	var group = new BABYLON.TransformNode("group-"+nom)
	var tableau1 = BABYLON.MeshBuilder.CreatePlane("tableau-" + nom, {width:largeur,height:hauteur}, scn);
	var verso = BABYLON.MeshBuilder.CreatePlane("verso-" + nom, {width:largeur,height:hauteur}, scn);
	tableau1.parent = group ; 
	tableau1.position.z = -0.01 ; 
	verso.parent = group ; 
	verso.rotation.y = Math.PI ; 

	var mat = new BABYLON.StandardMaterial("tex-tableau-" + nom, scn);
	mat.diffuseTexture = new BABYLON.Texture(textureName, scn);
	tableau1.material = mat;

	tableau1.checkCollisions = true;

	return group ; 

}

function creerCloison(nom,opts,scn){
	
	let options   = opts || {} ; 
	let hauteur   = options.hauteur || 3.0 ; 
	let largeur   = options.largeur || 5.0 ; 
	let epaisseur = options.epaisseur || 0.1 ;

	let materiau   = options.materiau || new BABYLON.StandardMaterial("materiau-pos"+nom,scn); 

    	let groupe = new BABYLON.TransformNode("groupe-"+nom) ; 

	let cloison = BABYLON.MeshBuilder.CreateBox(nom,{width:largeur,height:hauteur,depth:epaisseur},scn) ;
	cloison.material = materiau ; 
	cloison.parent = groupe ; 
	cloison.position.y = hauteur / 2.0 ; 

    	cloison.checkCollisions = true ;

    return groupe ;  
}

function creuser(mesh0, mesh1){
    const csg0 = BABYLON.CSG.FromMesh(mesh0);
    const csg1 = BABYLON.CSG.FromMesh(mesh1) ; 
    csg0.subtractInPlace(csg1);
    const csgMesh = csg0.toMesh() ;
    mesh0.dispose() ; 
    mesh1.dispose() ; 
    return csgMesh ;  
}


const PRIMS = {
"camera":creerCamera,
"reticule":creerReticule,
"wall":creerCloison,
"sphere":creerSphere,
"box":creerBoite,
"poster":creerPoster,
"standardMaterial":creerMateriauStandard,
"meadow":creerPrairie,
"ground":creerSol,
"sky":creerCiel,
"creuser" : creuser,
}

export {PRIMS} ; 
