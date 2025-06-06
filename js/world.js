import { PRIMS } from './prims.js';
import { Simu } from './simu.js';

class World extends Simu {
    constructor() {
        super();
        this.doors = [];
        this.teleportationSpheres = [];
        this.posters = [];
        this.guide = null;
        this.isGuideMoving = false;
        this.currentPosterIndex = 0;
        this.guidePath = []; // Store waypoints for pathfinding
        this.waypoints = [
            new BABYLON.Vector3(5, 0, 5),
            new BABYLON.Vector3(10, 0, 0),
            new BABYLON.Vector3(15, 0, -10),
            new BABYLON.Vector3(10, 0, -15),
            new BABYLON.Vector3(20, 0, -5)
        ]; // Open areas
    }

    requete_http(www, port, requete, foo) {
        const entete = "http://" + www + ":" + port + "/" + requete;
        loadJSON(entete, (res) => {
            const data = JSON.parse(res);
            foo(data);
        });
    }

    createWorld(data) {
        const scene = this.scene;
        scene.enablePhysics(new BABYLON.Vector3(0, -9.81, 0), new BABYLON.OimoJSPlugin());
        scene.gravity = new BABYLON.Vector3(0, -0.01, 0);

        this.camera.checkCollisions = true;
        this.camera.applyGravity = true;
        this.camera.ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);
        this.camera.speed = 1.7;
        this.camera.keysUp = [38, 90];
        this.camera.keysDown = [40, 83];
        this.camera.keysLeft = [37, 81];
        this.camera.keysRight = [39, 68];

        const light0 = new BABYLON.HemisphericLight("light0", new BABYLON.Vector3(1, 1, 0), scene);
        const light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, -1, 0), scene);
        light1.intensity = 0.2;
        const light2 = new BABYLON.HemisphericLight("light2", new BABYLON.Vector3(-2, 2, 0), scene);
        light2.intensity = 0.4;

        const Wall = PRIMS.standardMaterial("mat_wall", { texture: "./assets/wall.jpg" }, scene);
        const Wall1 = PRIMS.standardMaterial("mat_wall1", { texture: "./assets/texture_mur.jpg", uScale: 3, vScale: 1 }, scene);
        const Sol = PRIMS.standardMaterial("mat_sol", { texture: "./assets/textures/cracks_roughness.jpg", uScale: 20, vScale: 20 }, scene);
        const Stairs = PRIMS.standardMaterial("mat_stairs", { texture: "./assets/wood1.jpg" }, scene);
        const Plaf = PRIMS.standardMaterial("mat_plaf", { texture: "./assets/plaf.jpg", uScale: 25, vScale: 25 }, scene);
        const Plaf1 = PRIMS.standardMaterial("mat_plaf1", { texture: "./assets/plaf1.jpg", uScale: 25, vScale: 25 }, scene);
        const porte = PRIMS.standardMaterial("porte", { texture: "./assets/porte.jpg", uScale: 1, vScale: 1 }, scene);

        const ciel = PRIMS.sky("ciel", {}, scene);
        const sol = PRIMS.ground("sol", { materiau: Sol }, scene);

        const glassMaterial = new BABYLON.PBRMaterial("glass", scene);
        glassMaterial.albedoColor = new BABYLON.Color3(0.9, 0.95, 1);
        glassMaterial.alpha = 0.5;
        glassMaterial.reflectionTexture = scene.environmentTexture;
        glassMaterial.metallic = 0.5;
        glassMaterial.roughness = 0.5;
        glassMaterial.transparencyMode = BABYLON.PBRMaterial.PBRMATERIAL_ALPHABLEND;

        const mur1 = BABYLON.MeshBuilder.CreateBox("wall-i", { height: 5, width: 30, depth: 0.5, material: glassMaterial }, scene);
        mur1.position = new BABYLON.Vector3(0, 2.5, -15);
        const mur2 = PRIMS.wall("wall-2", { hauteur: 5, largeur: 15, epaisseur: 0.5, materiau: Wall1 }, scene);
        mur2.position = new BABYLON.Vector3(15, 0, 7.5);
        mur2.rotation.y = Math.PI / 2;
        const mur3 = PRIMS.wall("wall-3", { hauteur: 5, largeur: 15, epaisseur: 0.5, materiau: Wall1 }, scene);
        mur3.position = new BABYLON.Vector3(-15, 0, 7.5);
        mur3.rotation.y = Math.PI / 2;
        const mur4 = PRIMS.wall("wall-4", { hauteur: 5, largeur: 30, epaisseur: 0.5, materiau: Wall1 }, scene);
        mur4.position = new BABYLON.Vector3(0, 0, 15);
        const mur12 = PRIMS.wall("wall-12", { hauteur: 5, largeur: 15, epaisseur: 0.5, materiau: glassMaterial }, scene);
        mur12.position = new BABYLON.Vector3(-15, 0, -7.5);
        mur12.rotation.y = Math.PI / 2;
        const mur13 = PRIMS.wall("wall-13", { hauteur: 5, largeur: 15, epaisseur: 0.5, materiau: glassMaterial }, scene);
        mur13.position = new BABYLON.Vector3(15, 0, -7.5);
        mur13.rotation.y = Math.PI / 2;

        const mur5 = PRIMS.wall("wall-5", { hauteur: 5, largeur: 30, epaisseur: 0.5, materiau: Wall1 }, scene);
        mur5.position = new BABYLON.Vector3(0, 5, -15);
        const mur6 = PRIMS.wall("wall-6", { hauteur: 5, largeur: 30, epaisseur: 0.5, materiau: Wall1 }, scene);
        mur6.position = new BABYLON.Vector3(15, 5, 0);
        mur6.rotation.y = Math.PI / 2;
        const mur7 = PRIMS.wall("wall-7", { hauteur: 5, largeur: 30, epaisseur: 0.5, materiau: Wall1 }, scene);
        mur7.position = new BABYLON.Vector3(-15, 5, 0);
        mur7.rotation.y = Math.PI / 2;
        const mur8 = PRIMS.wall("wall-8", { hauteur: 5, largeur: 30, epaisseur: 0.5, materiau: Wall1 }, scene);
        mur8.position = new BABYLON.Vector3(0, 5, 15);
        let mur9 = BABYLON.MeshBuilder.CreateBox("wall-9", { height: 5, width: 30, depth: 0.5, material: Wall1 }, scene);
        mur9.position = new BABYLON.Vector3(0, 2.5, 0.3);
        const mur10 = PRIMS.wall("wall-10", { hauteur: 5, largeur: 15, epaisseur: 0.5, materiau: Wall1 }, scene);
        mur10.position = new BABYLON.Vector3(4.9, 0, 7.6);
        mur10.rotation.y = Math.PI / 2;
        const mur11 = PRIMS.wall("wall-11", { hauteur: 5, largeur: 15, epaisseur: 0.5, materiau: Wall1 }, scene);
        mur11.position = new BABYLON.Vector3(-4.9, 0, 7.6);
        mur11.rotation.y = Math.PI / 2;

        const plafond = PRIMS.wall("plafond", { hauteur: 15, largeur: 30, epaisseur: 0.5, materiau: Stairs }, scene);
        plafond.position = new BABYLON.Vector3(0, 5, 0);
        plafond.rotation.x = Math.PI / 2;
        const plafond1 = PRIMS.wall("plafond-1", { hauteur: 30, largeur: 30, epaisseur: 0.5, materiau: Sol }, scene);
        plafond1.position = new BABYLON.Vector3(0, 10, -15);
        plafond1.rotation.x = Math.PI / 2;

        PRIMS.CreuserPorte(mur1, { x: 0, y: 1, z: -15, material: glassMaterial }, scene);
        mur9 = PRIMS.CreuserPorte(mur9, { x: -10, y: 1, z: 0.3, material: Wall1 }, scene);
        mur9 = PRIMS.CreuserPorte(mur9, { x: 0, y: 1, z: 0.3, material: Wall1 }, scene);
        mur9 = PRIMS.CreuserPorte(mur9, { x: 10, y: 1, z: 0.3, material: Wall1 }, scene);

        const poster = PRIMS.poster("poster01", { hauteur: 2, largeur: 2, tableau: "./assets/10.jpg" }, scene);
        poster.parent = mur2;
        poster.position.y = 2.5;
        poster.position.z = -9.8;
        poster.position.x = -5;
        poster.rotation.y = Math.PI;
        this.posters.push({ mesh: poster, position: new BABYLON.Vector3(10, 2.5, -2.3), facing: new BABYLON.Vector3(0, 0, -1) });

        const poster2 = PRIMS.poster("poster02", { hauteur: 2, largeur: 2, tableau: "./assets/7.jpg" }, scene);
        poster2.parent = mur2;
        poster2.position.y = 2.5;
        poster2.position.z = -9.8;
        poster2.position.x = 0;
        poster2.rotation.y = Math.PI;
        this.posters.push({ mesh: poster2, position: new BABYLON.Vector3(15, 2.5, -2.3), facing: new BABYLON.Vector3(0, 0, -1) });

        const poster3 = PRIMS.poster("poster03", { hauteur: 2, largeur: 2, tableau: "./assets/11-pont_national.jpg" }, scene);
        poster3.parent = mur2;
        poster3.position.y = 2.5;
        poster3.position.z = -9.8;
        poster3.position.x = 5;
        poster3.rotation.y = Math.PI;
        this.posters.push({ mesh: poster3, position: new BABYLON.Vector3(20, 2.5, -2.3), facing: new BABYLON.Vector3(0, 0, -1) });

        const poster4 = PRIMS.poster("poster04", { hauteur: 2, largeur: 2, tableau: "./assets/21-église_saint_Louis.jpg" }, scene);
        poster4.parent = mur2;
        poster4.position.y = 2.5;
        poster4.position.z = -7.5;
        poster4.position.x = -7.2;
        poster4.rotation.y = -Math.PI / 2;
        this.posters.push({ mesh: poster4, position: new BABYLON.Vector3(7.8, 2.5, 0), facing: new BABYLON.Vector3(1, 0, 0) });

        const poster5 = PRIMS.poster("poster05", { hauteur: 2, largeur: 2, tableau: "./assets/35-caserne_Fautras.jpg" }, scene);
        poster5.parent = mur2;
        poster5.position.y = 2.5;
        poster5.position.z = -2.5;
        poster5.position.x = -7.2;
        poster5.rotation.y = -Math.PI / 2;
        this.posters.push({ mesh: poster5, position: new BABYLON.Vector3(7.8, 2.5, 5), facing: new BABYLON.Vector3(1, 0, 0) });

        const poster6 = PRIMS.poster("poster06", { hauteur: 2, largeur: 2, tableau: "./assets/36-pont_transbordeur.jpg" }, scene);
        poster6.parent = mur2;
        poster6.position.y = 2.5;
        poster6.position.z = -0.3;
        poster6.position.x = 5;
        poster6.rotation.y = -2 * Math.PI;
        this.posters.push({ mesh: poster6, position: new BABYLON.Vector3(20, 2.5, 7.2), facing: new BABYLON.Vector3(0, 0, 1) });

        const poster7 = PRIMS.poster("poster07", { hauteur: 2, largeur: 2, tableau: "./assets/40-portes_nationales.jpg" }, scene);
        poster7.parent = mur2;
        poster7.position.y = 2.5;
        poster7.position.z = -0.3;
        poster7.position.x = 0;
        poster7.rotation.y = -2 * Math.PI;
        this.posters.push({ mesh: poster7, position: new BABYLON.Vector3(15, 2.5, 7.2), facing: new BABYLON.Vector3(0, 0, 1) });

        const poster8 = PRIMS.poster("poster08", { hauteur: 2, largeur: 2, tableau: "./assets/45-place_des_portes_et_rue_de_Siam.jpg" }, scene);
        poster8.parent = mur2;
        poster8.position.y = 2.5;
        poster8.position.z = -0.3;
        poster8.position.x = -5;
        poster8.rotation.y = -2 * Math.PI;
        this.posters.push({ mesh: poster8, position: new BABYLON.Vector3(10, 2.5, 7.2), facing: new BABYLON.Vector3(0, 0, 1) });

        const poster9 = PRIMS.poster("poster09", { hauteur: 2, largeur: 2, tableau: "./assets/ouessant/tombe-ouessant.jpg" }, scene);
        poster9.parent = mur2;
        poster9.position.y = 2.5;
        poster9.position.z = -19.5;
        poster9.position.x = -5;
        poster9.rotation.y = Math.PI;
        this.posters.push({ mesh: poster9, position: new BABYLON.Vector3(10, 2.5, -12), facing: new BABYLON.Vector3(0, 0, -1) });

        const poster10 = PRIMS.poster("poster10", { hauteur: 2, largeur: 2, tableau: "./assets/ouessant/costume-de-mariee-1880-ouessant.jpg" }, scene);
        poster10.parent = mur2;
        poster10.position.y = 2.5;
        poster10.position.z = -19.5;
        poster10.position.x = 0;
        poster10.rotation.y = Math.PI;
        this.posters.push({ mesh: poster10, position: new BABYLON.Vector3(15, 2.5, -12), facing: new BABYLON.Vector3(0, 0, -1) });

        const poster11 = PRIMS.poster("poster11", { hauteur: 2, largeur: 2, tableau: "./assets/ouessant/creche-ouessant.jpg" }, scene);
        poster11.parent = mur2;
        poster11.position.y = 2.5;
        poster11.position.z = -19.5;
        poster11.position.x = 5;
        poster11.rotation.y = Math.PI;
        this.posters.push({ mesh: poster11, position: new BABYLON.Vector3(20, 2.5, -12), facing: new BABYLON.Vector3(0, 0, -1) });

        const poster12 = PRIMS.poster("poster12", { hauteur: 2, largeur: 2, tableau: "./assets/ouessant/pyramide-de-runiou-ouessant.jpg" }, scene);
        poster12.parent = mur2;
        poster12.position.y = 2.5;
        poster12.position.z = -10.4;
        poster12.position.x = 5;
        poster12.rotation.y = -2 * Math.PI;
        this.posters.push({ mesh: poster12, position: new BABYLON.Vector3(20, 2.5, -2.9), facing: new BABYLON.Vector3(0, 0, 1) });

        const poster13 = PRIMS.poster("poster13", { hauteur: 2, largeur: 2, tableau: "./assets/ouessant/port-de-bougezenn-ouessant.jpg" }, scene);
        poster13.parent = mur2;
        poster13.position.y = 2.5;
        poster13.position.z = -10.4;
        poster13.position.x = 0;
        poster13.rotation.y = -2 * Math.PI;
        this.posters.push({ mesh: poster13, position: new BABYLON.Vector3(15, 2.5, -2.9), facing: new BABYLON.Vector3(0, 0, 1) });

        const poster14 = PRIMS.poster("poster14", { hauteur: 2, largeur: 2, tableau: "./assets/ouessant/sainte-barbe-ouessant.jpg" }, scene);
        poster14.parent = mur2;
        poster14.position.y = 2.5;
        poster14.position.z = -10.4;
        poster14.position.x = -5;
        poster14.rotation.y = -2 * Math.PI;
        this.posters.push({ mesh: poster14, position: new BABYLON.Vector3(10, 2.5, -2.9), facing: new BABYLON.Vector3(0, 0, 1) });

        const poster15 = PRIMS.poster("poster15", { hauteur: 2, largeur: 2, tableau: "./assets/ouessant/eglise-saint-paul-aurelien-ouessant.jpg" }, scene);
        poster15.parent = mur2;
        poster15.position.y = 2.5;
        poster15.position.z = -12.5;
        poster15.position.x = -7.2;
        poster15.rotation.y = -Math.PI / 2;
        this.posters.push({ mesh: poster15, position: new BABYLON.Vector3(7.8, 2.5, -5), facing: new BABYLON.Vector3(1, 0, 0) });

        const poster16 = PRIMS.poster("poster16", { hauteur: 2, largeur: 2, tableau: "./assets/ouessant/chapelle-notre-dame-desperance-ouessant.jpg" }, scene);
        poster16.parent = mur2;
        poster16.position.y = 2.5;
        poster16.position.z = -17.5;
        poster16.position.x = -7.2;
        poster16.rotation.y = -Math.PI / 2;
        this.posters.push({ mesh: poster16, position: new BABYLON.Vector3(7.8, 2.5, -10), facing: new BABYLON.Vector3(1, 0, 0) });

        const poster17 = PRIMS.poster("poster17", { hauteur: 2, largeur: 2, tableau: "./assets/paysage/1.jpg" }, scene);
        poster17.parent = mur2;
        poster17.position.y = 2.5;
        poster17.position.z = -29.7;
        poster17.position.x = -5;
        poster17.rotation.y = Math.PI;
        this.posters.push({ mesh: poster17, position: new BABYLON.Vector3(10, 2.5, -22.2), facing: new BABYLON.Vector3(0, 0, -1) });

        const poster18 = PRIMS.poster("poster18", { hauteur: 2, largeur: 2, tableau: "./assets/paysage/2.jpg" }, scene);
        poster18.parent = mur2;
        poster18.position.y = 2.5;
        poster18.position.z = -29.7;
        poster18.position.x = 0;
        poster18.rotation.y = Math.PI;
        this.posters.push({ mesh: poster18, position: new BABYLON.Vector3(15, 2.5, -22.2), facing: new BABYLON.Vector3(0, 0, -1) });

        const poster19 = PRIMS.poster("poster19", { hauteur: 2, largeur: 2, tableau: "./assets/paysage/hall.jpg" }, scene);
        poster19.parent = mur2;
        poster19.position.y = 2.5;
        poster19.position.z = -29.7;
        poster19.position.x = 5;
        poster19.rotation.y = Math.PI;
        this.posters.push({ mesh: poster19, position: new BABYLON.Vector3(20, 2.5, -22.2), facing: new BABYLON.Vector3(0, 0, -1) });

        const poster20 = PRIMS.poster("poster20", { hauteur: 2, largeur: 2, tableau: "./assets/paysage/4.jpg" }, scene);
        poster20.parent = mur2;
        poster20.position.y = 2.5;
        poster20.position.z = -20.3;
        poster20.position.x = 5;
        poster20.rotation.y = -2 * Math.PI;
        this.posters.push({ mesh: poster20, position: new BABYLON.Vector3(20, 2.5, -12.8), facing: new BABYLON.Vector3(0, 0, 1) });

        const poster21 = PRIMS.poster("poster21", { hauteur: 2, largeur: 2, tableau: "./assets/paysage/5.jpg" }, scene);
        poster21.parent = mur2;
        poster21.position.y = 2.5;
        poster21.position.z = -20.3;
        poster21.position.x = 0;
        poster21.rotation.y = -2 * Math.PI;
        this.posters.push({ mesh: poster21, position: new BABYLON.Vector3(15, 2.5, -12.8), facing: new BABYLON.Vector3(0, 0, 1) });

        const poster22 = PRIMS.poster("poster22", { hauteur: 2, largeur: 2, tableau: "./assets/paysage/6.jpg" }, scene);
        poster22.parent = mur2;
        poster22.position.y = 2.5;
        poster22.position.z = -20.3;
        poster22.position.x = -5;
        poster22.rotation.y = -2 * Math.PI;
        this.posters.push({ mesh: poster22, position: new BABYLON.Vector3(10, 2.5, -12.8), facing: new BABYLON.Vector3(0, 0, 1) });

        const poster23 = PRIMS.poster("poster23", { hauteur: 2, largeur: 2, tableau: "./assets/paysage/7.jpg" }, scene);
        poster23.parent = mur2;
        poster23.position.y = 2.5;
        poster23.position.z = -22.5;
        poster23.position.x = -7.2;
        poster23.rotation.y = -Math.PI / 2;
        this.posters.push({ mesh: poster23, position: new BABYLON.Vector3(7.8, 2.5, -15), facing: new BABYLON.Vector3(1, 0, 0) });

        const poster24 = PRIMS.poster("poster24", { hauteur: 2, largeur: 2, tableau: "./assets/paysage/8.jpg" }, scene);
        poster24.parent = mur2;
        poster24.position.y = 2.5;
        poster24.position.z = -27.5;
        poster24.position.x = -7.2;
        poster24.rotation.y = -Math.PI / 2;
        this.posters.push({ mesh: poster24, position: new BABYLON.Vector3(7.8, 2.5, -20), facing: new BABYLON.Vector3(1, 0, 0) });

        console.log("Poster world positions:", this.posters.map((p, i) => `poster${i + 1}: ${p.position.toString()}`));

        this.doors.push(this.createDoor("door1", new BABYLON.Vector3(0, 1.5, -15), porte, scene));
        this.doors.push(this.createDoor("door2", new BABYLON.Vector3(-10, 1.5, 0.3), porte, scene));
        this.doors.push(this.createDoor("door3", new BABYLON.Vector3(0, 1.5, 0.3), porte, scene));
        this.doors.push(this.createDoor("door4", new BABYLON.Vector3(10, 1.5, 0.3), porte, scene));

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

        const stairs1 = PRIMS.creerEscalier("stairs1", {
            steps: 15,
            stepWidth: 4,
            stepHeight: 0.75,
            stepDepth: 0.35,
            materiau: Stairs
        }, scene);
        stairs1.checkCollisions = true;
        stairs1.position.z = -11.3;
        stairs1.position.x = 12;
        stairs1.rotation.x = BABYLON.Tools.ToRadians(-90);
        stairs1.rotation.y = BABYLON.Tools.ToRadians(-180);
        stairs1.rotation.z = BABYLON.Tools.ToRadians(0);

        const stairs2 = PRIMS.creerEscalier("stairs2", {
            steps: 15,
            stepWidth: 4,
            stepHeight: 0.75,
            stepDepth: 0.35,
            materiau: Stairs
        }, scene);
        stairs2.checkCollisions = true;
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

        const teleportSpheres = [
            this.createTeleportationSphere(new BABYLON.Vector3(13, 6, 13.75), scene),
            this.createTeleportationSphere(new BABYLON.Vector3(-13, 6, 13.75), scene),
            this.createTeleportationSphere(new BABYLON.Vector3(-13, 6, -1), scene),
            this.createTeleportationSphere(new BABYLON.Vector3(13, 6, -1), scene),
        ];
        this.teleportationSpheres.push(...teleportSpheres);

        const teleportMaterial = new BABYLON.StandardMaterial("teleportMaterial", scene);
        teleportMaterial.diffuseColor = BABYLON.Color3.Random();
        scene.registerBeforeRender(() => {
            const cameraPosition = this.camera.position;
            this.teleportationSpheres.forEach(sphere => {
                const distance = BABYLON.Vector3.Distance(cameraPosition, sphere.position);
                if (distance < 1.5) {
                    if (!sphere._entered) {
                        sphere.material.diffuseColor = BABYLON.Color3.Random();
                        sphere._entered = true;
                    }
                } else {
                    sphere._entered = false;
                }
            });
        });

        this.guide = PRIMS.avatar1("guide", {}, scene);
        this.guide.position = new BABYLON.Vector3(5, 0, 5);
        this.guide.applyGravity = true;
        this.guide.checkCollisions = true;

        // Create head mesh to group eyes and nose
        const head = BABYLON.MeshBuilder.CreateBox("guide_head", { size: 0.001 }, scene); // Invisible box
        head.position = new BABYLON.Vector3(0, 1.5, 0); // Head height
        head.parent = this.guide;
        head.checkCollisions = false;

        // Add eyes
        const leftEye = BABYLON.MeshBuilder.CreateSphere("left_eye", { diameter: 0.2 }, scene);
        leftEye.position = new BABYLON.Vector3(0.1, 1.6, 0.3);
        leftEye.material = new BABYLON.StandardMaterial("eye_mat", scene);
        leftEye.material.diffuseColor = new BABYLON.Color3(0, 0, 1); // Blue eyes
        leftEye.parent = head;
        leftEye.checkCollisions = false;

        const rightEye = BABYLON.MeshBuilder.CreateSphere("right_eye", { diameter: 0.2 }, scene);
        rightEye.position = new BABYLON.Vector3(-0.1, 1.6, 0.3);
        rightEye.material = new BABYLON.StandardMaterial("eye_mat", scene);
        rightEye.material.diffuseColor = new BABYLON.Color3(0, 0, 1);
        rightEye.parent = head;
        rightEye.checkCollisions = false;

        // Add nose
        const nose = BABYLON.MeshBuilder.CreateCylinder("nose", { height: 0.2, diameterTop: 0, diameterBottom: 0.1 }, scene);
        nose.position = new BABYLON.Vector3(0, 1.5, 0.35);
        nose.rotation.x = Math.PI / 2;
        nose.material = new BABYLON.StandardMaterial("nose_mat", scene);
        nose.material.diffuseColor = new BABYLON.Color3(1, 0.8, 0.8); // Skin tone
        nose.parent = head;
        nose.checkCollisions = false;

        // Disable collisions for guide's sub-meshes (including original avatar)
        this.guide.getChildMeshes().forEach(mesh => {
            mesh.checkCollisions = false;
        });

        console.log("moveGuideToNextPoster defined:", typeof this.moveGuideToNextPoster === "function");
        if (typeof this.moveGuideToNextPoster === "function") {
            this.moveGuideToNextPoster(scene);
        } else {
            console.error("moveGuideToNextPoster is not a function on World instance");
        }
    }

    createTeleportationSphere(position, scene) {
        const sphere = BABYLON.MeshBuilder.CreateSphere("teleportSphere", { diameter: 1 }, scene);
        sphere.position = position;
        sphere.material = new BABYLON.StandardMaterial("teleportMaterial", scene);
        sphere.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        sphere.material.alpha = 0.5;
        return sphere;
    }

    updateTeleportationSpheres(scene) {
        const camera = scene.activeCamera;
        let closestSphere = null;
        let closestDistance = Infinity;
        this.teleportationSpheres.forEach(sphere => {
            sphere.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
            sphere.material.alpha = 0.5;
            const distance = BABYLON.Vector3.Distance(camera.position, sphere.position);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestSphere = sphere;
            }
        });
        if (closestSphere && closestDistance < 20) {
            closestSphere.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
            closestSphere.material.alpha = 0.8;
        }
    }

    teleport(scene) {
        const camera = scene.activeCamera;
        this.teleportationSpheres.forEach(sphere => {
            if (sphere.material.diffuseColor.equals(new BABYLON.Color3(1, 0, 0))) {
                camera.position.copyFrom(sphere.position);
                camera.position.y += 2;
            }
        });
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

    computePath(start, end, scene) {
        const path = [start.clone()];
        let current = start.clone();
        const maxSteps = 20; // Prevent infinite loops

        while (BABYLON.Vector3.DistanceSquared(current, end) > 1 && path.length < maxSteps) {
            let bestWaypoint = null;
            let minScore = Infinity;

            for (const waypoint of this.waypoints) {
                const distToWaypoint = BABYLON.Vector3.Distance(current, waypoint);
                const distToEnd = BABYLON.Vector3.Distance(waypoint, end);
                const score = distToWaypoint + distToEnd;

                // Check if path to waypoint is clear
                const direction = waypoint.subtract(current).normalize();
                const ray = new BABYLON.Ray(current, direction, distToWaypoint);
                const hit = scene.pickWithRay(ray, (mesh) => {
                    return mesh !== this.guide &&
                        mesh.checkCollisions &&
                        !mesh.isDescendantOf(this.guide) &&
                        !(mesh.name && typeof mesh.name === "string" && mesh.name.includes("poster")) &&
                        !this.doors.some(d => d.door === mesh);
                });

                if (!hit || !hit.hit) {
                    if (score < minScore) {
                        minScore = score;
                        bestWaypoint = waypoint;
                    }
                }
            }

            if (!bestWaypoint) {
                console.log("No clear waypoint found, using direct path");
                break;
            }

            path.push(bestWaypoint.clone());
            current = bestWaypoint.clone();
        }

        path.push(end.clone());
        console.log("Computed path:", path.map(p => p.toString()));
        return path;
    }

    moveGuideToNextPoster(scene) {
        if (this.posters.length === 0 || this.isGuideMoving) {
            console.log("No posters available or guide is already moving.");
            return;
        }

        const targetPoster = this.posters[this.currentPosterIndex];
        const targetPosition = targetPoster.position.clone();
        const facingDirection = targetPoster.facing;

        targetPosition.y = targetPosition.y < 5 ? 0 : 5;

        // Compute path to target
        this.guidePath = this.computePath(this.guide.position, targetPosition, scene);
        if (this.guidePath.length === 0) {
            console.log("No path found to", targetPoster.mesh.name);
            this.isGuideMoving = false;
            return;
        }

        console.log(`Guide moving to ${targetPoster.mesh.name} (${this.currentPosterIndex + 1}/24) via path`);

        this.currentPosterIndex = (this.currentPosterIndex + 1) % this.posters.length;
        this.animateGuideToPosition(scene, targetPosition, facingDirection, targetPoster.mesh.name);
    }

    animateGuideToPosition(scene, targetPosition, facingDirection, posterName) {
        if (this.isGuideMoving) {
            console.log("Guide is already moving, ignoring new request.");
            return;
        }
        this.isGuideMoving = true;

        const guide = this.guide;
        const speed = 0.15;
        const frameRate = 60;
        const distanceThreshold = 0.1;
        let stuckCounter = 0;
        let currentWaypointIndex = 0;

        const moveToTarget = () => {
            if (currentWaypointIndex >= this.guidePath.length) {
                // Reached final target
                const targetRotation = Math.atan2(facingDirection.x, facingDirection.z);
                guide.rotation.y = targetRotation;
                const head = guide.getChildMeshes().find(m => m.name === "guide_head");
                if (head) {
                    head.rotation.y = 0; // Align head with body to face poster
                }
                console.log(`Guide reached ${posterName} at position ${guide.position.toString()}`);
                this.isGuideMoving = false;
                this.guidePath = [];
                setTimeout(() => this.moveGuideToNextPoster(scene), 5000);
                scene.onBeforeRenderObservable.removeCallback(moveToTarget);
                return;
            }

            const currentTarget = this.guidePath[currentWaypointIndex];
            const currentPosition = guide.position.clone();
            const direction = currentTarget.subtract(currentPosition).normalize();
            let nextPosition = currentPosition.add(direction.scale(speed));
            let collisionDetected = false;

            const ray = new BABYLON.Ray(currentPosition, direction, 1.5);
            const hit = scene.pickWithRay(ray, (mesh) => {
                if (!mesh.name) {
                    console.log(`Mesh with undefined name detected at ${mesh.getAbsolutePosition().toString()}`);
                }
                return mesh !== guide &&
                    mesh.checkCollisions &&
                    mesh !== guide.parent &&
                    !mesh.isDescendantOf(guide) &&
                    !(mesh.name && typeof mesh.name === "string" && mesh.name.includes("poster")) &&
                    !this.doors.some(d => d.door === mesh);
            });

            guide.position = nextPosition;
            const collisions = scene.meshes.filter(mesh => {
                if (!mesh.name) {
                    console.log(`Mesh with undefined name detected at ${mesh.getAbsolutePosition().toString()}`);
                }
                return mesh !== guide &&
                    mesh.checkCollisions &&
                    mesh !== guide.parent &&
                    !mesh.isDescendantOf(guide) &&
                    (!(mesh.name && typeof mesh.name === "string" && mesh.name.includes("poster")) ||
                        BABYLON.Vector3.DistanceSquared(guide.position, mesh.getAbsolutePosition()) < 4) &&
                    BABYLON.Vector3.DistanceSquared(guide.position, mesh.getAbsolutePosition()) < 0.64 && // 0.8^2
                    !this.doors.some(d => d.door === mesh);
            });
            guide.position = currentPosition;

            if (hit && hit.hit || collisions.length > 0) {
                collisionDetected = true;
                const avoidanceDirections = [
                    new BABYLON.Vector3(direction.z, 0, -direction.x),
                    new BABYLON.Vector3(-direction.z, 0, direction.x),
                    direction.scale(0.5).add(new BABYLON.Vector3(direction.z, 0, -direction.x).scale(0.5)),
                    direction.scale(0.5).add(new BABYLON.Vector3(-direction.z, 0, direction.x).scale(0.5)),
                ];

                let bestDirection = null;
                let minCollisionDistance = Infinity;

                for (const avoidDir of avoidanceDirections) {
                    const testPosition = currentPosition.add(avoidDir.normalize().scale(speed));
                    guide.position = testPosition;
                    const testCollisions = scene.meshes.filter(mesh =>
                        mesh !== guide &&
                        mesh.checkCollisions &&
                        mesh !== guide.parent &&
                        !mesh.isDescendantOf(guide) &&
                        (!(mesh.name && typeof mesh.name === "string" && mesh.name.includes("poster")) ||
                            BABYLON.Vector3.DistanceSquared(guide.position, mesh.getAbsolutePosition()) < 4) &&
                        BABYLON.Vector3.DistanceSquared(guide.position, mesh.getAbsolutePosition()) < 0.64 &&
                        !this.doors.some(d => d.door === mesh)
                    );
                    guide.position = currentPosition;

                    if (testCollisions.length === 0) {
                        const distanceToTarget = BABYLON.Vector3.DistanceSquared(testPosition, currentTarget);
                        if (distanceToTarget < minCollisionDistance) {
                            minCollisionDistance = distanceToTarget;
                            bestDirection = avoidDir;
                        }
                    }
                }

                if (bestDirection) {
                    nextPosition = currentPosition.add(bestDirection.normalize().scale(speed));
                    console.log(`Avoiding collision, moving to ${nextPosition.toString()}`);
                } else {
                    nextPosition = currentPosition.clone();
                    nextPosition.y += 0.1;
                    stuckCounter++;
                    const relevantCollisions = collisions.filter(c =>
                        !(c.name && typeof c.name === "string" && c.name.includes("poster"))
                    ).map(c => c.name || "unnamed");
                    console.log(`Guide stuck at ${currentPosition.toString()}, collisions: ${relevantCollisions.join(", ")}, stuckCounter: ${stuckCounter}`);
                    if (stuckCounter > 300) {
                        console.log("Guide stuck for too long, resetting to clear position.");
                        guide.position = new BABYLON.Vector3(5, 0, 5);
                        this.isGuideMoving = false;
                        this.guidePath = [];
                        scene.onBeforeRenderObservable.removeCallback(moveToTarget);
                        setTimeout(() => this.moveGuideToNextPoster(scene), 1000);
                        return;
                    }
                }
            } else {
                stuckCounter = 0;
            }

            guide.position = nextPosition;

            const currentDistance = BABYLON.Vector3.Distance(guide.position, currentTarget);
            console.log(`Guide at ${guide.position.toString()}, distance to waypoint ${currentWaypointIndex + 1}: ${currentDistance.toFixed(2)}`);

            if (BABYLON.Vector3.DistanceSquared(guide.position, currentTarget) < distanceThreshold) {
                currentWaypointIndex++;
                console.log(`Reached waypoint ${currentWaypointIndex}/${this.guidePath.length}`);
            }
        };

        scene.onBeforeRenderObservable.add(moveToTarget);
    }
}

export {World};