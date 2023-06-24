var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
let divFps = document.getElementById("fps");

var clicks = 0; //CHECK FOR THE CORRECT SCENE
window.selectedGameTime = 0;

//------------------------------------------------------ First Scene -----------------------------------------------------------------------
var scene0 = new BABYLON.Scene(engine);
scene0.createDefaultEnvironment();
var menulight = new BABYLON.PointLight("spot1", new BABYLON.Vector3(-20, 5, 10), scene0);
menulight.diffuse = new BABYLON.Color3(1, 1, 1);
menulight.specular = new BABYLON.Color3(0, 0, 0);
menulight.intensity = 1;
var camera1 = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(-40, 10, 0), scene0);
camera1.radius = 15;
camera1.heightOffset = 5;
camera1.rotationOffset = 0;
camera1.cameraAcceleration = 0.1;
camera1.maxCameraSpeed = 100;
camera1.lowerRadiusLimit = 0;
camera1.lowerHeightOffsetLimit = 0;
camera1.upperHeightOffsetLimit = 80;
camera1.attachControl(canvas, true);

var advancedTexture1 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI1", true, scene0);

var title = new BABYLON.GUI.TextBlock();
title.fontSize = 100;
title.height = 0.2;
title.text = "TLS - The Last Shot";
title.color = "Green";
title.fontFamily = "Impact";
title.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
advancedTexture1.addControl(title);

var start = BABYLON.GUI.Button.CreateSimpleButton("but", "START");
start.width = "150px";
start.height = "80px";
start.top = "320";
start.left = "0";
start.color = "green";
start.textBlock.color = "white";
start.textBlock.fontFamily = "Lucida Console";
start.background = "black";
advancedTexture1.addControl(start);

start.onPointerUpObservable.add(function () {       
    clicks ++;
    camera.radius = 70;
    camera.heightOffset = 50;  
    camera.rotationOffset = 180;                  
});

var panel2 = new BABYLON.GUI.StackPanel();  
panel2.left = "-350px";
advancedTexture1.addControl(panel2); 

var textblock = new BABYLON.GUI.TextBlock();
textblock.height = "150px";
textblock.fontSize = 40;
textblock.fontFamily = "Lucida Console";
textblock.fontStyle = "bold";
textblock.text = "Select difficulty";
panel2.addControl(textblock); 

var addRadio = function(text, parent, life1) {
    var button = new BABYLON.GUI.RadioButton();
    button.width = "20px";
    button.height = "20px";
    button.color = "green";
    button.background = "black";     

    button.onIsCheckedChangedObservable.add(function(state) {
        if (state) {
            textblock.text = "You selected: " + text;
            if(text == "Easy"){
                life1.text = "45 sec";
                window.selectedGameTime = 45;
            }
            if(text == "Medium") { 
                life1.text ="25 sec";
                window.selectedGameTime = 25;
            }
            if(text == "Hard") {
                life1.text = "15 sec";
                window.selectedGameTime = 15;
            }
        }
    });

//RETTANGOLO TUTORIAL
var rect2 = new BABYLON.GUI.Rectangle();
rect2.width = 0.2;
rect2.height = "150px";
rect2.width = "200px";
rect2.color = "green";
rect2.background = "black";
rect2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
rect2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
advancedTexture.addControl(rect2);

var hint = new BABYLON.GUI.TextBlock("hint");
hint.textWrapping = true;
hint.fontFamily = "Lucida Console";
hint.text = "Tutorial:\nW: Up S: Down\nA: Left D: Right\n";
hint.color = "white";

rect2.addControl(hint);
var header = BABYLON.GUI.Control.AddHeader(button, text, "150px", { isHorizontal: true, controlFirst: true });
header.height = "50px";
header.children[1].fontSize = 30;
header.children[1].fontStyle = "bold";
header.children[1].fontFamily = "Lucida Console";
header.children[1].onPointerDownObservable.add(function() {
    button.isChecked = !button.isChecked;
});
parent.addControl(header);    
}
var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
    
//RETTANGOLO TEMPO
var rect1 = new BABYLON.GUI.Rectangle();
rect1.width = 0.2;
rect1.height = "40px";
rect1.width = "150px";
rect1.color = "green";
rect1.background = "black";
rect1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
rect1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
advancedTexture.addControl(rect1);

var life1 = new BABYLON.GUI.TextBlock();
life1.text = "45 sec";
life1.color = "white";
life1.fontFamily = "Lucida Console";
rect1.addControl(life1);

addRadio("Easy", panel2 ,life1);
addRadio("Medium", panel2, life1);
addRadio("Hard", panel2, life1);

//------------------------------------------------ END FIRST SCENE!!! ----------------------------------------------------------------------

    var scene = new BABYLON.Scene(engine);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    scene.enablePhysics(new BABYLON.Vector3(0,-9.81, 0),physicsPlugin);
    scene.collisionsEnabled = true;
    
    var camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 9, -60), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.applyGravity = true;
    camera.ellipsoid = new BABYLON.Vector3(1, 5.5, 1);
    camera.checkCollisions = true;
    camera.attachControl(canvas, true);
    camera.position.y += 1;
    var amo = 100; //gun

    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.4;

    var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
    
    //RETTANGOLO TEMPO
    var rect1 = new BABYLON.GUI.Rectangle();
    rect1.width = 0.2;
    rect1.height = "40px";
    rect1.width = "170px";
    rect1.color = "green";
    rect1.background = "black";
    rect1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    rect1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    advancedTexture2.addControl(rect1);

    var life1 = new BABYLON.GUI.TextBlock();
    life1.text = "Time available";
    life1.color = "white";
    life1.fontFamily = "Lucida Console";
    rect1.addControl(life1);

    //RETTANGOLO TUTORIAL
    var rect2 = new BABYLON.GUI.Rectangle();
    rect2.width = 0.2;
    rect2.height = "150px";
    rect2.width = "200px";
    rect2.color = "green";
    rect2.background = "black";
    rect2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    rect2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture2.addControl(rect2);

    var hint = new BABYLON.GUI.TextBlock("hint");
    hint.textWrapping = true;
    hint.fontFamily = "Lucida Console";
    hint.text = "Welcome! Press space bar to on/off lights";
    hint.color = "white";

    rect2.addControl(hint);

    //RETTANGOLO USER INTERACTION
    var rect3 = new BABYLON.GUI.Rectangle();
    rect3.width = 0.2;
    rect3.height = "150px";
    rect3.width = "220px";
    rect3.color = "green";
    rect3.background = "black";
    rect3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    rect3.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture2.addControl(rect3);

    var hint2 = new BABYLON.GUI.TextBlock("hint");
    hint2.textWrapping = true;
    hint2.fontFamily = "Lucida Console";
    hint2.text = "Space: Jump \n M : Lights \n T: Arena Lights \n U: Start animation \n P : Start game \n Left click : Shot \n R: Reload";
    hint2.color = "white";
    rect3.addControl(hint2);

    //game over scene
    var scene1 = new BABYLON.Scene(engine);
    scene1.createDefaultCameraOrLight(true, true, true);
    scene1.clearColor = new BABYLON.Color3(0.84, 0.29, 0.29);
    var advancedTexture3 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("Gameover", true, scene1);

    var gameover = new BABYLON.GUI.TextBlock();
    gameover.text = "GAME OVER";
    gameover.fontFamily = "Impact";
    gameover.color = "white";
    gameover.fontSize = 150;
    gameover.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture3.addControl(gameover);

    var relbut = BABYLON.GUI.Button.CreateSimpleButton("but", "PLAY AGAIN");
    relbut.width = "150px";
    relbut.height = "80px";
    relbut.color = "red";
    relbut.textBlock.color = "white";
    relbut.textBlock.fontFamily = "Lucida Console";
    relbut.background = "black";
    relbut.top = "-100px";
    relbut.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
    advancedTexture3.addControl(relbut);

    relbut.onPointerUpObservable.add(function () {       
        location.reload();
        return false;
    });

    //SKYBOX
    var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", { size: 1000.0 }, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./textures/skyboxall/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0.6, 0);
    skybox.material = skyboxMaterial;
    
    camera.keysUp.push(87);
    camera.keysDown.push(83);
    camera.keysRight.push(68);
    camera.keysLeft.push(65);
    var isLocked = false;

    scene.onPointerDown = function (evt) {
            if (!isLocked) {
                canvas.requestPointerLock = canvas.requestPointerLock || canvas.msRequestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
                if (canvas.requestPointerLock) {
                    canvas.requestPointerLock();
                }
            }        
    };

    var pointerlockchange = function () {
        var controlEnabled = document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement || document.pointerLockElement || null;
        if (!controlEnabled) {
            isLocked = false;
        } else {
            isLocked = true;
        }
    };

    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mspointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);
    document.addEventListener("webkitpointerlockchange", pointerlockchange, false);

    var ground = BABYLON.MeshBuilder.CreateGround("ground1", { width: 700, height: 700, subdivisions: 2, updatable: false }, scene);
    
    ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0}, scene);
    
    var backgroundMaterial = new BABYLON.StandardMaterial("gmat", scene);
    backgroundMaterial.diffuseTexture = new BABYLON.Texture("./textures/floor.png", scene);
    backgroundMaterial.diffuseTexture.uScale = 65.0;
    backgroundMaterial.diffuseTexture.vScale = 25.0;
    backgroundMaterial.shadowLevel = 0.4;
    ground.material = backgroundMaterial;
    backgroundMaterial.maxSimultaneousLights = 20;

    var cameraclonepos;
    var cameraclonerot;

    //PUNTATORE DEL FUCILE
    function addGunSight(scene) {
        if (scene.activeCameras.length === 0) {
            scene.activeCameras.push(scene.activeCamera);
        }

        //CAMERA DEL FUCILE
        var secondCamera = new BABYLON.FreeCamera("GunSightCamera", new BABYLON.Vector3(0, 0, -50), scene);
        secondCamera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        secondCamera.layerMask = 0x20000000;
        scene.activeCameras.push(secondCamera);

        cameraclonepos = secondCamera.position.clone();
        cameraclonerot = secondCamera.rotation.clone();
        
        var meshes = [];
        var h = 250;
        var w = 250;

        var y = BABYLON.Mesh.CreateBox("y", h * .2, scene);
        y.scaling = new BABYLON.Vector3(0.05, 1, 1);
        y.position = new BABYLON.Vector3(0, 0, 0);
        meshes.push(y);

        var x = BABYLON.Mesh.CreateBox("x", h * .2, scene);
        x.scaling = new BABYLON.Vector3(1, 0.05, 1);
        x.position = new BABYLON.Vector3(0, 0, 0);
        meshes.push(x);

        var lineTop = BABYLON.Mesh.CreateBox("lineTop", w * .8, scene);
        lineTop.scaling = new BABYLON.Vector3(1, 0.005, 1);
        lineTop.position = new BABYLON.Vector3(0, h * 0.5, 0);
        meshes.push(lineTop);

        var lineBottom = BABYLON.Mesh.CreateBox("lineBottom", w * .8, scene);
        lineBottom.scaling = new BABYLON.Vector3(1, 0.005, 1);
        lineBottom.position = new BABYLON.Vector3(0, h * -0.5, 0);
        meshes.push(lineBottom);

        var lineLeft = BABYLON.Mesh.CreateBox("lineLeft", h, scene);
        lineLeft.scaling = new BABYLON.Vector3(0.010, 1, 1);
        lineLeft.position = new BABYLON.Vector3(w * -.4, 0, 0);
        meshes.push(lineLeft);

        var lineRight = BABYLON.Mesh.CreateBox("lineRight", h, scene);
        lineRight.scaling = new BABYLON.Vector3(0.010, 1, 1);
        lineRight.position = new BABYLON.Vector3(w * .4, 0, 0);
        meshes.push(lineRight);

        var gunSight = BABYLON.Mesh.MergeMeshes(meshes);
        gunSight.name = "gunSight";
        gunSight.layerMask = 0x20000000;
        gunSight.freezeWorldMatrix();

        var mat = new BABYLON.StandardMaterial("emissive mat", scene);
        mat.checkReadyOnlyOnce = true;
        mat.emissiveColor = new BABYLON.Color3(1, 1, 1);

        gunSight.material = mat;
    }

    addGunSight(scene);

    var gunMat = new BABYLON.StandardMaterial("mater", scene);
    gunMat.diffuseTexture = new BABYLON.Texture("textures/crate.png", scene);

    BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/lando19/Guns-for-BJS-FPS-Game/main/main/", "scene.gltf", scene, function (newMeshes, psys, skeletons) {
        var gunshot = new BABYLON.Sound("gunshot", "https://raw.githubusercontent.com/lando19/Guns-for-BJS-FPS-Game/main/main/12-Gauge-Pump-Action-Shotgun-Close-Gunshot-A-www.fesliyanstudios.com.mp3", scene);
        var reload = new BABYLON.Sound("reload", " https://raw.githubusercontent.com/lando19/Guns-for-BJS-FPS-Game/main/main/shotgun-reload-old_school-ra_the_sun_god-580332022.mp3", scene);
        scene.animationGroups[0].loopAnimation = false;
        scene.animationGroups[0].stop();
        scene.animationGroups[0].start(false, 5.0, 2.39, 2.4);
        
        var gun = newMeshes[0];
        gun.renderingGroupId = 1;
        gun.material = gunMat;
        gun.parent = camera;
        gun.position = new BABYLON.Vector3(1, -2, 5);
        gun.scaling.scaleInPlace(0.1);

        //ANIMATIONS - SHOT
        document.body.onclick = function () {
            if(amo > 0 && scene.animationGroups[0].isPlaying !== true){
                scene.animationGroups[0].start(false, 1.0, 8.035, 0.4);
                gunshot.play();
                amo = amo - 25;
                firebullet();
                hint.text = "Robot life:" + robot_life;
            }               
        }   
        //ANIMATIONS - RELOAD 
        document.body.onkeydown = function(event){
            if(event.keyCode === 82 && amo <= 75 && scene.animationGroups[0].isPlaying !== true){
                scene.animationGroups[0].start(false, 1, 0.8, 6.4);
                reload.play();
                scene.animationGroups[0].start(false, 1, 2.8, 2.4);
                amo = 100;
            }
        }
      }); 
    
    var tree = BABYLON.SceneLoader.ImportMesh("","./models/trees/", "Tree.babylon", scene, function (meshes) {
        var tree = meshes[0];
        tree.scaling = new BABYLON.Vector3(120, 120, 120);
        tree.position = new BABYLON.Vector3(-80, 0, 280);
        tree.material.opacityTexture = null;
        tree.material.backFaceCulling = false;
        tree = tree.clone("newTree");
        tree.position = new BABYLON.Vector3(-80,0,250);
        tree = tree.clone("newTree");
        tree.position = new BABYLON.Vector3(-80,0,220);
        tree = tree.clone("newTree");
        tree.position = new BABYLON.Vector3(-80,0,190);
        tree = tree.clone("newTree");
        tree.position = new BABYLON.Vector3(-80,0,160);
        tree = tree.clone("newTree");
        tree.position = new BABYLON.Vector3(-50,0,160);
        tree = tree.clone("newTree");
        tree.position = new BABYLON.Vector3(-50,0,190);
        tree = tree.clone("newTree");
        tree.position = new BABYLON.Vector3(-50,0,220);
        tree = tree.clone("newTree");
        tree.position = new BABYLON.Vector3(-50,0,250);
        tree = tree.clone("newTree");
        tree.position = new BABYLON.Vector3(-50,0,280);
    });

    //CASA LEGNO
    BABYLON.SceneLoader.ImportMesh("", "./models/building1/", "scene.gltf", scene, function (building) {
        building[0].rotation = new BABYLON.Vector3(0, 15.7, 0);
        building[0].scaling = new BABYLON.Vector3(10, 10, 10);
        building[0].position = new BABYLON.Vector3(5, 0, 270);
        building[0].freezeWorldMatrix();
    });

    //EDIFICIO ROSSO
    BABYLON.SceneLoader.ImportMesh("", "./models/building2/", "scene.gltf", scene, function (building) {
        building[0].scaling = new BABYLON.Vector3(0.9, 0.9, 0.9);
        building[0].position = new BABYLON.Vector3(0, 0, -165);
        building[0].freezeWorldMatrix();
        newBuilding = building[0].clone("newBuilding");
        newBuilding.position = new BABYLON.Vector3(0, 0,-105);
        newBuilding.freezeWorldMatrix();
        newBuilding1 = building[0].clone("newBuilding");
        newBuilding1.position = new BABYLON.Vector3(0,0,-45);
        newBuilding2 = building[0].clone("newBuilding");
        newBuilding2.position = new BABYLON.Vector3(0,0,15);
    });

    //EDIFICIO BIANCO 
    BABYLON.SceneLoader.ImportMesh("", "./models/building3/", "scene.gltf", scene, function (building) {
        building[0].rotation = new BABYLON.Vector3(0, -300, 0);
        building[0].scaling = new BABYLON.Vector3(0.04, 0.04, 0.04);
        building[0].position = new BABYLON.Vector3(60, 0, 5);
        building[0].freezeWorldMatrix();
        newbuilding = building[0].clone("newBuilding");
        newbuilding.position = new BABYLON.Vector3(60,0,30);
        newbuilding = building[0].clone("newBuilding");
        newbuilding.position = new BABYLON.Vector3(60,0,55);
        newbuilding = building[0].clone("newBuilding");
        newbuilding.position = new BABYLON.Vector3(60,0,80);
    });

    //MAGAZZINO
    BABYLON.SceneLoader.ImportMesh("", "./models/building5/", "scene.gltf", scene, function (building) {
        building[0].rotation = new BABYLON.Vector3(0, 45*Math.PI/2, 0);
        building[0].scaling = new BABYLON.Vector3(0.06, 0.06, 0.06);
        building[0].position = new BABYLON.Vector3(208, 0, 31);
        building[0].freezeWorldMatrix();
    });

    //PRONTO SOCCORSO
    BABYLON.SceneLoader.ImportMesh("", "./models/building6/", "scene.gltf", scene, function (building) {
        building[0].rotation = new BABYLON.Vector3(0, -89.5, 0);
        building[0].scaling = new BABYLON.Vector3(-0.09, 0.07, 0.07);
        building[0].position = new BABYLON.Vector3(285, 0, 40);
        building[0].freezeWorldMatrix();
    })

    //STATUA
        BABYLON.SceneLoader.ImportMesh("", "./models/fountain/", "scene.gltf", scene, function (fountain) {
			const fountain1 = fountain[0];
	        fountain1.scaling = new BABYLON.Vector3(0.08, 0.08, 0.08);
	    	fountain1.position = new BABYLON.Vector3(130, 0.06, 280);
            fountain1.rotation = new BABYLON.Vector3(0,60*Math.PI/2,0);
	    	fountain1.freezeWorldMatrix();
		});
        
    //TANK
        BABYLON.SceneLoader.ImportMesh("", "./models/tank/", "scene.gltf", scene, function (tank) {
			tank[0].scaling = new BABYLON.Vector3(7, 7, 7);
			tank[0].rotation = new BABYLON.Vector3(0, 3*Math.PI/2, 0);
	    	tank[0].position = new BABYLON.Vector3(140, 10, 130);
	    	tank[0].freezeWorldMatrix();
		});

    //CARS
		BABYLON.SceneLoader.ImportMesh("", "./models/cars/", "scene.gltf", scene, function (cars) {
               cars[0].scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
               cars[0].rotation = new BABYLON.Vector3(0, 1.57, 0);
               cars[0].position = new BABYLON.Vector3(272, 0.01, -80);
               cars[0].freezeWorldMatrix();
               cars2 = cars[0].clone("cars");
           });

           BABYLON.SceneLoader.ImportMesh("", "./models/wall/", "scene.gltf", scene, function (wall) {
			const wall1 = wall[0];
			wall1.scaling = new BABYLON.Vector3(20, 10, 1);
			wall1.position = new BABYLON.Vector3(100, 0, 305);
			const wall2 = wall1.clone("wall2");
			wall2.scaling = new BABYLON.Vector3(20, 10, 1);
			wall2.position = new BABYLON.Vector3(100, 0, -95);
			const wall3 = wall1.clone("wall3");
			wall3.scaling = new BABYLON.Vector3(20, 10, 1);
			wall3.rotation = new BABYLON.Vector3(0, 1.57, 0);
			wall3.position = new BABYLON.Vector3(-104, 0, 100);
			const wall4 = wall1.clone("wall4");
			wall4.scaling = new BABYLON.Vector3(20, 10, 1);
			wall4.rotation = new BABYLON.Vector3(0, 1.57, 0);
			wall4.position = new BABYLON.Vector3(296, 0, 100);
		});

        // Road
		const roadMaterial = new BABYLON.StandardMaterial("road-material", scene);
		roadMaterial.diffuseTexture = new BABYLON.Texture("textures/roadtexture.jpg", scene);
		roadMaterial.freeze();

		const roadMesh = BABYLON.MeshBuilder.CreateGround("plane", {width: 1, height: 1}, scene);
		roadMesh.material = roadMaterial;

		function createRoad(n, x, y, z, scaleX, scaleZ) {
			const road = roadMesh.createInstance(n);
			road.scaling = new BABYLON.Vector3(scaleX, 1, scaleZ);
			road.position = new BABYLON.Vector3(x, y, z);
			road.freezeWorldMatrix();
			return road;
		}

		const road1 = createRoad("1", 125, 0.02, 225, 220, 10);
		const road2 = createRoad("2", 70, 0.01, 195, 10, 60);
		const road3 = createRoad("3", 20, 0.02, 170, 110, 10);

		// CHECKPOINT
		const road6 = createRoad("6", 250, 0.01, 75, 10, 80);
		const road7 = createRoad("7", 225, 0.02, 35, 60, 10);
		const road8 = createRoad("8", 195, 0.01, -25, 10, 130);
		const road9 = createRoad("9", 150, 0.02, -85, 100, 10);
		const road10 = createRoad("10", 20, 0.01, 195, 10, 60);
		const road11 = createRoad("11", -5, 0.02, 170, 50, 10);
		const road12 = createRoad("12", -25, 0.01, 230, 10, 120);
		const road13 = createRoad("13", -55, 0.02, 285, 60, 10);
		const road14 = createRoad("11", -80, 0.01, 192.5, 10, 185);
        //lamps

BABYLON.SceneLoader.ImportMesh("", "./models/lamp/", "lamp.obj", scene, function (Mesh) {
    lamp = Mesh[0];
    lamp.scaling = new BABYLON.Vector3(5, 5, 5);
    lamp.rotate(BABYLON.Axis.Y, 30*Math.PI/2, BABYLON.Space.LOCAL);
    lamp.position = new BABYLON.Vector3(12, 0, -10);
    lamp = lamp.clone("newLamp");
    lamp.position = new BABYLON.Vector3(12,0,40);
    lamp = lamp.clone("newLamp2");
    lamp.rotate(BABYLON.Axis.Y, 90*Math.PI/2, BABYLON.Space.LOCAL);
    lamp.position = new BABYLON.Vector3(-30,0,10);
    lamp = lamp.clone("newLamp3");
    lamp.rotate(BABYLON.Axis.Y, 120*Math.PI/2, BABYLON.Space.LOCAL);
    lamp.position = new BABYLON.Vector3(-30,0,60);
    
    lamp = lamp.clone("newLamp4");
    lamp.rotate(BABYLON.Axis.Y, 30*Math.PI/2, BABYLON.Space.LOCAL);
    lamp.position = new BABYLON.Vector3(280,0,250);
    lamp = lamp.clone("newLamp5");
    lamp.rotate(BABYLON.Axis.Y, 60*Math.PI/2, BABYLON.Space.LOCAL);
    lamp.position = new BABYLON.Vector3(280,0,200);
    lamp = lamp.clone("newLamp6");
    lamp.rotate(BABYLON.Axis.Y, 60*Math.PI/2, BABYLON.Space.LOCAL);
    lamp.position = new BABYLON.Vector3(280,0,120);
});

var sunMaterial = new BABYLON.StandardMaterial("sun", scene);
sunMaterial.emissiveColor = new BABYLON.Color3(1,1,0);
var brokenMaterial = new BABYLON.StandardMaterial("sunbroken", scene);
brokenMaterial.emissiveColor = new BABYLON.Color3(0.19, 0.1, 0.45);

var spot1 = new BABYLON.PointLight("spot1", new BABYLON.Vector3(4, 22, 16), scene);
spot1.diffuse = new BABYLON.Color3(1, 1, 1);
spot1.specular = new BABYLON.Color3(0, 0, 0);
spot1.shadowOrthoScale = 2.0;
spot1.intensity = 1;
spot1.shadowMinZ = 0;
spot1.shadowMaxZ = 500;
spot1.range = 800;
spot1.setEnabled(false);

var sun1 = BABYLON.Mesh.CreateSphere("sun1", 10, 2, scene);
sun1.position = new BABYLON.Vector3(4, 44, -10);

var sun2 = BABYLON.Mesh.CreateSphere("sun2", 10, 2, scene);
sun2.position = new BABYLON.Vector3(4, 44, 40);

var sun3 = BABYLON.Mesh.CreateSphere("sun3", 10, 2, scene);
sun3.position = new BABYLON.Vector3(-22, 44, 10);

var sun4 = BABYLON.Mesh.CreateSphere("sun4", 10, 2, scene);
sun4.position = new BABYLON.Vector3(-22, 44, 60);


var sun5 = BABYLON.Mesh.CreateSphere("sun5", 10, 2, scene);
sun5.position = new BABYLON.Vector3(272, 44, 250);

var sun6 = BABYLON.Mesh.CreateSphere("sun6", 10, 2, scene);
sun6.position = new BABYLON.Vector3(272, 44, 200);

var sun7 = BABYLON.Mesh.CreateSphere("sun7", 10, 2, scene);
sun7.position = new BABYLON.Vector3(272, 44, 120);

var spot2 = new BABYLON.PointLight("spot2", new BABYLON.Vector3(272, 42, 140), scene);
spot2.diffuse = new BABYLON.Color3(1, 1, 1);
spot2.specular = new BABYLON.Color3(0, 0, 0);
spot2.shadowOrthoScale = 2.0;
spot2.intensity = 1;
spot2.shadowMinZ = 0;
spot2.shadowMaxZ = 500;
spot2.range = 200;
spot2.setEnabled(false);

var spot3 = new BABYLON.PointLight("spot3", new BABYLON.Vector3(272, 42, 180), scene);
spot3.diffuse = new BABYLON.Color3(1, 1, 1);
spot3.specular = new BABYLON.Color3(0, 0, 0);
spot3.shadowOrthoScale = 2.0;
spot3.intensity = 1;
spot3.shadowMinZ = 0;
spot3.shadowMaxZ = 500;
spot3.range = 200;
spot3.setEnabled(false);

var spot4 = new BABYLON.PointLight("spot4", new BABYLON.Vector3(272, 42, 200), scene);
spot4.diffuse = new BABYLON.Color3(1, 1, 1);
spot4.specular = new BABYLON.Color3(0, 0, 0);
spot4.shadowOrthoScale = 2.0;
spot4.intensity = 1;
spot4.shadowMinZ = 0;
spot4.shadowMaxZ = 500;
spot4.range = 200;
spot4.setEnabled(false);

    const fences = [];
		function createFence(fenceMesh, x, y, z) {
			const newFence = fenceMesh.clone("newFence");
			newFence.position = new BABYLON.Vector3(x, y, z);
			newFence.freezeWorldMatrix();
			return newFence;
		}

		BABYLON.SceneLoader.ImportMesh("", "./models/fence/", "scene.gltf", scene, function (fence) {
			const fenceMesh = fence[0];
			fenceMesh.scaling = new BABYLON.Vector3(0.08, 0.04, 0.02);
			fenceMesh.rotation = new BABYLON.Vector3(0, 1.57, 0);
			fenceMesh.position = new BABYLON.Vector3(160, 0, 180); 

            
			fences.push(createFence(fenceMesh, 160, 0, 120));
			fences.push(createFence(fenceMesh, 160, 0, 160));
			fences.push(createFence(fenceMesh, 160, 0, 195));
			fences.push(createFence(fenceMesh, 160, 0, 255));
			fences.push(createFence(fenceMesh, 160, 0, 280));

			const fenceMesh2 = fenceMesh.clone("newFence");
			fenceMesh2.scaling = new BABYLON.Vector3(0.08, 0.04, 0.02);
			fenceMesh2.position = new BABYLON.Vector3(180, 0, 100);
			fenceMesh2.rotation = new BABYLON.Vector3(0, 0, 0);
			fences.push(createFence(fenceMesh2, 280, 0, 100));
			fences.push(createFence(fenceMesh2, 220, 0, 100));

		});

		//BOX FOR COLLISIONS
        const fenceBorder1 = BABYLON.MeshBuilder.CreateBox("fenceB", {width: 41, height: 30, depth: 6}, scene);
		fenceBorder1.position = new BABYLON.Vector3(220, 0, 94);
		fenceBorder1.isVisible = false;
		const fenceBorder2 = BABYLON.MeshBuilder.CreateBox("fenceB", {width: 10, height: 30, depth: 75}, scene);
		fenceBorder2.position = new BABYLON.Vector3(160, 0, 280);
		fenceBorder2.isVisible = false;
		const fenceBorder3 = BABYLON.MeshBuilder.CreateBox("fenceB", {width: 38, height: 30, depth: 6}, scene);
		fenceBorder3.position = new BABYLON.Vector3(280, 0, 94);		
		fenceBorder3.isVisible = false;
        const fenceBorder4 = BABYLON.MeshBuilder.CreateBox("fenceB", {width: 10, height: 30, depth: 155}, scene);
		fenceBorder4.position = new BABYLON.Vector3(160, 0, 145);
		fenceBorder4.isVisible = false;
        const fountainborder1 = BABYLON.MeshBuilder.CreateBox("borderfountain", {width:33, height:50, depth:40}, scene);
	    fountainborder1.position = new BABYLON.Vector3(130, 0, 280);
		fountainborder1.isVisible = false;
		fountainborder1.freezeWorldMatrix();
        const buildingborder1 = BABYLON.MeshBuilder.CreateBox("borderbuilding", {width:70, height:40, depth:50}, scene);
	    buildingborder1.position = new BABYLON.Vector3(5, 0, 260);
		buildingborder1.isVisible = false;
		buildingborder1.freezeWorldMatrix();
        const buildingborder2 = BABYLON.MeshBuilder.CreateBox("buildingborder2", {width: 10, height: 30, depth: 285}, scene);
		buildingborder2.position = new BABYLON.Vector3(-40, 0, 0);
		buildingborder2.isVisible = false;
        const buildingborder3 = BABYLON.MeshBuilder.CreateBox("buildingborder2", {width: 10, height: 30, depth: 165}, scene);
		buildingborder3.position = new BABYLON.Vector3(20, 0, 0);
		buildingborder3.isVisible = false;
        const wallborder1 = BABYLON.MeshBuilder.CreateBox("buildingborder2", {width: 10, height: 30, depth: 400}, scene);
		wallborder1.position = new BABYLON.Vector3(300, 0, 100);
		wallborder1.isVisible = false;
        const wallborder2 = BABYLON.MeshBuilder.CreateBox("buildingborder2", {width: 10, height: 30, depth: 400}, scene);
		wallborder2.position = new BABYLON.Vector3(-90, 0, 100);
		wallborder2.isVisible = false;
        const wallborder3 = BABYLON.MeshBuilder.CreateBox("buildingborder2", {width: 400, height: 30, depth: 10}, scene);
		wallborder3.position = new BABYLON.Vector3(100, 0, 300);
		wallborder3.isVisible = false;
        const wallborder4 = BABYLON.MeshBuilder.CreateBox("buildingborder2", {width: 400, height: 30, depth: 10}, scene);
		wallborder4.position = new BABYLON.Vector3(100, 0, -100);
		wallborder4.isVisible = false;
        const carsborder = BABYLON.MeshBuilder.CreateBox("borderfountain", {width:30, height:40, depth:50}, scene);
	    carsborder.position = new BABYLON.Vector3(260, 0, -65);
		carsborder.isVisible = false;
        const hospitalborder = BABYLON.MeshBuilder.CreateBox("borderfountain", {width:15, height:40, depth:75}, scene);
	    hospitalborder.position = new BABYLON.Vector3(270, 0, 40);
		hospitalborder.isVisible = false;
        const tankborder = BABYLON.MeshBuilder.CreateBox("borderfountain", {width:15, height:40, depth:55}, scene);
	    tankborder.position = new BABYLON.Vector3(130, 0, 125);
		tankborder.isVisible = false;
        const magazzinoborder = BABYLON.MeshBuilder.CreateBox("borderfountain", {width:45, height:40, depth:10}, scene);
	    magazzinoborder.position = new BABYLON.Vector3(180, 0, 65);
		magazzinoborder.isVisible = false;

var checklight = false;
var checklight2 = false;
window.addEventListener("keydown", function (event) {
    if (event.keyCode === 77) { //TASTO M PER ACCENDERE LUCI CORRIDOIO
        if(!checklight) {
            checklight = true;
            spot1.setEnabled(true);
            sun1.material = sunMaterial;
            sun2.material = sunMaterial;
            sun3.material = sunMaterial;
            sun4.material = sunMaterial;
            hint.text = "Light ON";
        }
        else {
            checklight = false;
            spot1.setEnabled(false);
            sun1.material = blackMaterial;
            sun2.material = blackMaterial;
            sun3.material = blackMaterial;
            sun4.material = blackMaterial;
            hint.text = "Light OFF";
        }
    }
    if(event.keyCode === 84) { //TASTO T PER ACCENDERE LUCI NELL'ARENA
        if(!checklight2) {
            checklight2 = true;
            spot2.setEnabled(true);
            spot3.setEnabled(true);
            spot4.setEnabled(true);
            sun5.material = sunMaterial;
            sun6.material = sunMaterial;
            sun7.material = sunMaterial;
            hint.text = "Arena Lights ON";
        }
        else {
            checklight2 = false;
            spot2.setEnabled(false);
            spot3.setEnabled(false);
            spot4.setEnabled(false);
            sun5.material = blackMaterial;
            sun6.material = blackMaterial;
            sun7.material = blackMaterial;
            hint.text = "Arena Lights OFF";
        }
    }
});


var bodyMaterial = new BABYLON.StandardMaterial("bodyMaterial", scene);
bodyMaterial.diffuseTexture = new BABYLON.Texture("./textures/red.jpg", scene);

var batteryMaterial = new BABYLON.StandardMaterial("batteryMaterial", scene);
batteryMaterial.emissiveColor = new BABYLON.Color3(0,1,0);

var blackMaterial = new BABYLON.StandardMaterial("blackMaterial", scene);
blackMaterial.emissiveColor = new BABYLON.Color3(0,0,0);

var armMaterial = new BABYLON.StandardMaterial("armMaterial", scene);
armMaterial.diffuseTexture = new BABYLON.Texture("./textures/ice.jpg", scene);

var donutMaterial = new BABYLON.StandardMaterial("armMaterial", scene);
donutMaterial.diffuseTexture = new BABYLON.Texture("./textures/blue.jpeg", scene);

var headMaterial = new BABYLON.StandardMaterial("headMaterial", scene);
headMaterial.diffuseTexture = new BABYLON.Texture("./textures/head.jpg", scene);

var demMaterial = new BABYLON.StandardMaterial("demmat", scene);
demMaterial.diffuseTexture = new BABYLON.Texture("./textures/steel.jpg", scene);

var robotMaterial = new BABYLON.StandardMaterial("robotMaterial", scene);
robotMaterial.diffuseTexture = new BABYLON.Texture("./textures/robot.jpg",scene);

//ROBOT HIERARCHICAL MODEL
var int1 = BABYLON.Mesh.CreateSphere("int1", 32, 25, scene);
int1.position = new BABYLON.Vector3(130,23, 200);
var a = BABYLON.CSG.FromMesh(int1);

var tot = BABYLON.MeshBuilder.CreateBox("robbody",{ height: 15, width: 21, depth: 21}, scene);
tot.position = new BABYLON.Vector3(130, 23, 200);
var b = BABYLON.CSG.FromMesh(tot);

//Mesh
var robbody = b.intersect(a).toMesh("c", null, scene);
robbody.material = robotMaterial;
robbody.position.x = 0;
robbody.position.y = 0;
robbody.position.z = 0;
robbody.rotation.y = -Math.PI/2;
int1.dispose();
tot.dispose();
robbody.scaling = new BABYLON.Vector3(0.4,0.4,0.4);
robbody.rotate = new BABYLON.Vector3(0, 30*Math.PI/2,0);

// HITBOX PER GESTIONE BULLET
var hitbox = BABYLON.MeshBuilder.CreateBox("hitbox",{ height: 15, width: 15, depth: 15}, scene);
hitbox.position.x = 2;
hitbox.position.y = 8;
hitbox.position.z = 170;
robbody.parent = hitbox;
hitbox.physicsImpostor = new BABYLON.PhysicsImpostor(hitbox, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.5, friction: 0.5 }, scene);
hitbox.isVisible = false;

//TESTA
var robhead = BABYLON.Mesh.CreateSphere("robhead", 32, 10, scene);
robhead.parent = robbody;
robhead.position.y = 8;
robhead.material = headMaterial;

//OCCHIO
var eye = BABYLON.Mesh.CreateSphere("robbosphere", 7, 3, scene);
eye.parent = robhead;
eye.position.x = -4;
eye.position.y = 1.2;

var material = new BABYLON.StandardMaterial("eyeMaterial", scene);
material.diffuseColor = new BABYLON.Color3(0, 0, 0); // Colore nero
eye.material = material;

//CONO DESTRO TESTA
var robheadcone1 = BABYLON.MeshBuilder.CreateCylinder("robheadcone1", {diameterTop:0, diameterBottom: 3, height: 5, tessellation: 96}, scene);
robheadcone1.parent = robhead;
robheadcone1.position = new BABYLON.Vector3(0, 5, 4);
robheadcone1.rotate(BABYLON.Axis.X, Math.PI/4, BABYLON.Space.LOCAL);
robheadcone1.material = demMaterial;

//CONO SINISTRO TESTA
var robheadcone2 = BABYLON.MeshBuilder.CreateCylinder("robheadcone2", {diameterTop:0, diameterBottom: 3, height: 5, tessellation: 96}, scene);
robheadcone2.parent = robhead;
robheadcone2.position = new BABYLON.Vector3(0, 5, -4);
robheadcone2.rotate(BABYLON.Axis.X, -Math.PI/4, BABYLON.Space.LOCAL);
robheadcone2.material = demMaterial;

//SFERA VERDE
var robbodysphere = BABYLON.Mesh.CreateSphere("robbodysphere", 32, 7, scene);
robbodysphere.parent = robbody;
robbodysphere.position.x = -10;
robbodysphere.material = batteryMaterial;

var rightleg1 = BABYLON.MeshBuilder.CreateCylinder("rightleg1", {diameterTop:7, diameterBottom: 7, height: 20, tessellation: 96}, scene);
rightleg1.rotation.x = Math.PI;
rightleg1.parent = robbody;
rightleg1.position = new BABYLON.Vector3(0, -10, 4);
rightleg1.material = robotMaterial;

var rightleg2 = BABYLON.MeshBuilder.CreateCylinder("rightleg2", {diameterTop:7, diameterBottom: 7, height: 20, tessellation: 96}, scene);
rightleg2.rotation.x = Math.PI;
rightleg2.parent = robbody;
rightleg2.position = new BABYLON.Vector3(0, -10, -4);
rightleg2.material = robotMaterial;

//TUTTO IL BRACCIO SINISTRO
var leftarm1 = BABYLON.MeshBuilder.CreateCylinder("leftarm1", {diameterTop:7, diameterBottom: 7, height: 6, tessellation: 95}, scene);
leftarm1.rotation.x = Math.PI/2;
leftarm1.parent = robbody;
leftarm1.position = new BABYLON.Vector3(0, 0, -13);
leftarm1.material = robotMaterial;

//BRACCIO SENZA ULTIMO PEZZO SINISTRO
var leftarm2 = BABYLON.Mesh.CreateSphere("leftarm2", 32,7, scene);
leftarm2.parent = leftarm1;
leftarm2.rotation.x = Math.PI/2;
leftarm2.scaling = new BABYLON.Vector3(1.7,1.7,1.7);
leftarm2.position = new BABYLON.Vector3(0, -6, 0);
leftarm2.material = robotMaterial;

//CONO BASSO DEL BRACCIO SINISTRO 
var leftarm2cone1 = BABYLON.MeshBuilder.CreateCylinder("leftarm2cone1", {diameterTop:0, diameterBottom: 7, height: 6, tessellation: 96}, scene);
leftarm2cone1.parent = leftarm2;
leftarm2cone1.position.y = 3;
leftarm2cone1.material = demMaterial;

//CONO ALTO DEL BRACCIO SINISTRO
var leftarm2cone2 = BABYLON.MeshBuilder.CreateCylinder("leftarm2cone2", {diameterTop:0, diameterBottom: 7, height: 6, tessellation: 96}, scene);
leftarm2cone2.parent = leftarm2;
leftarm2cone2.position.y = -3;
leftarm2cone2.rotation.x = Math.PI;
leftarm2cone2.material = demMaterial;

// TUTTO IL BRACCIO DESTRO
var rightarm1 = BABYLON.MeshBuilder.CreateCylinder("rightarm1", {diameterTop:7, diameterBottom: 7, height: 6, tesssellation: 95}, scene);
rightarm1.rotation.x = Math.PI/2;
rightarm1.parent = robbody;
rightarm1.position = new BABYLON.Vector3(0, 0, 13);
rightarm1.material = robotMaterial;

//TUTTO IL BRACCIO DESTRO MENO L'ULTIMO PEZZO
var rightarm2 = BABYLON.Mesh.CreateSphere("rightarm2",32,7, scene);
rightarm2.parent = rightarm1;
rightarm2.rotation.x = Math.PI/2;
rightarm2.scaling = new BABYLON.Vector3(1.7,1.7,1.7);
rightarm2.position = new BABYLON.Vector3(0, 6, 0);
rightarm2.material = robotMaterial;

//CONO BASSO DEL BRACCIO DESTRO 
var rightarm2cone1 = BABYLON.MeshBuilder.CreateCylinder("rightarm2cone1", {diameterTop:0, diameterBottom: 7, height: 6, tessellation: 96}, scene);
rightarm2cone1.parent = rightarm2;
rightarm2cone1.position.y = 3;
rightarm2cone1.material = demMaterial;

//CONO ALTO DEL BRACCIO DESTRO 
var rightarm2cone2 = BABYLON.MeshBuilder.CreateCylinder("rightarm2cone2", {diameterTop:0, diameterBottom: 7, height: 6, tessellation: 96}, scene);
rightarm2cone2.parent = rightarm2;
rightarm2cone2.position.y = -3;
rightarm2cone2.rotation.x = Math.PI;
rightarm2cone2.material = demMaterial;

//COLLISIONS
fountainborder1.checkCollisions = true;
fenceBorder1.checkCollisions = true;
fenceBorder2.checkCollisions = true;
fenceBorder3.checkCollisions = true;
fenceBorder4.checkCollisions = true;
buildingborder1.checkCollisions = true;
buildingborder2.checkCollisions = true;
buildingborder3.checkCollisions = true;
wallborder1.checkCollisions = true;
wallborder2.checkCollisions = true;
wallborder3.checkCollisions = true;
wallborder4.checkCollisions = true;
carsborder.checkCollisions = true;
hospitalborder.checkCollisions = true;
tankborder.checkCollisions = true;
ground.checkCollisions = true;
magazzinoborder.checkCollisions = true;

var start_animation = false;
var gunbool = true;
var speed = 0.5;
var booleft = true;
var boolwalk = false;
var boolwalk2 = false;
var boolwalk3 = false;
var boolwalk4 = false;
var boolwalk5 = false;
var boolwalk6 = false;
var boolwalk7 = false;
var boolgame = true;
var isRed = true;
var game_animation = false;
var angle_check = true;
var direction = 1;
var robot_life = 20;
var ok_animation = false;
var victory = false;

var boss_music = new BABYLON.Sound("boss_music", "./sounds/boss.mp3", scene, null, { volume: 0.3, loop: true, autoplay: false });

var firebullet = function () {
    var bullet = BABYLON.MeshBuilder.CreateSphere('bullet', { diameter: 1.5 }, scene);
    bullet.material = demMaterial;
    bullet.position = new BABYLON.Vector3(camera.position.x, camera.position.y, camera.position.z);
    const cameraDirection = camera.getTarget().subtract(camera.position).normalize();
    const impulseMagnitude = 1000;
    bullet.physicsImpostor = new BABYLON.PhysicsImpostor(bullet, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 3, friction: 0.5, restitution: 0.3 }, scene);
    const impulse = cameraDirection.scale(impulseMagnitude);
    bullet.physicsImpostor.applyImpulse(impulse, bullet.getAbsolutePosition());
    hitbox.physicsImpostor.registerOnPhysicsCollide(bullet.physicsImpostor, function() {
        robot_life -= 1;
        //bullet.dispose();
    });

    bullet.step = ()=>{
        bullet.life++;
        if(bullet.life>300 && bullet.physicsImpostor){
            bullet.physicsImpostor.dispose()
            bullet.dispose()                
        }
    }
    scene.onBeforeRenderObservable.add(bullet.step)   
}


const particleSystem = new BABYLON.ParticleSystem("explosion", 2000, scene);
particleSystem.particleTexture = new BABYLON.Texture("textures/steel.jpg", scene);

particleSystem.emitter = robbody; 
particleSystem.minSize = 1.1;
particleSystem.maxSize = 2.5;
particleSystem.minLifeTime = 1.5;
particleSystem.maxLifeTime = 2.0;
particleSystem.emitRate = 1000;
particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;

particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

particleSystem.direction1 = new BABYLON.Vector3(-1, 1, -1);
particleSystem.direction2 = new BABYLON.Vector3(1, 1, 1);
particleSystem.minEmitPower = 1;
particleSystem.maxEmitPower = 3;

//ANIMATIONS
scene.registerBeforeRender(function(){
            if(start_animation){
                function toggleColor() {
                    if (isRed && hitbox.position.z <= 280) {
                        material.emissiveColor = new BABYLON.Color3(0, 1, 0); // Verde
                    } else {
                        material.emissiveColor = new BABYLON.Color3(1, 0, 0); // Rosso
                    }
                    // Inverti il valore della variabile di stato
                    isRed = !isRed;
                  }
                
                  // Esegui l'alternanza del colore a intervalli regolari
                  setInterval(toggleColor, 1); // Cambio di colore ogni secondo
                if(booleft) {
                    robbody.rotation.y -= 0.01;
                    leftarm2.rotate(BABYLON.Axis.Z, 0.05, BABYLON.Space.LOCAL);
                    rightarm2.rotate(BABYLON.Axis.Z, -0.05, BABYLON.Space.LOCAL);
                    robheadcone1.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    robheadcone2.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    rightleg1.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    rightleg2.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
            
                    if(robbody.rotation.y < -Math.PI){
                        booleft = false;
                        //animazione successiva
                        boolwalk = true;
                    }
                }
                if(boolwalk) {
                    hitbox.position.x += speed;
                    rightleg1.position.x += 0.01;
                    rightleg2.position.x += 0.01;
                    if(hitbox.position.x > 68) {
                        boolwalk = false;
                        boolwalk2 = true;
                    }
                }
                if(boolwalk2){
                    robbody.rotation.y -= 0.01;
                    leftarm2.rotate(BABYLON.Axis.Z, 0.05, BABYLON.Space.LOCAL);
                    rightarm2.rotate(BABYLON.Axis.Z, -0.05, BABYLON.Space.LOCAL);
                    robheadcone1.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    robheadcone2.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    rightleg1.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    rightleg2.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    if(robbody.rotation.y < -1.52*Math.PI) {
                        boolwalk2 = false;
                        boolwalk3 = true;
                    } 
                }
                if(boolwalk3){
                    hitbox.position.z += speed;
                    rightleg1.position.z -= 0.001;
                    rightleg2.position.z -= 0.001;
                    if(hitbox.position.z > 225) {
                        boolwalk3 = false;
                        boolwalk4 = true;
                    }
                }
                if(boolwalk4) {
                    robbody.rotation.y += 0.01;
                    leftarm2.rotate(BABYLON.Axis.Z, 0.05, BABYLON.Space.LOCAL);
                    rightarm2.rotate(BABYLON.Axis.Z, -0.05, BABYLON.Space.LOCAL);
                    robheadcone1.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    robheadcone2.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    rightleg1.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    rightleg2.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);

                    if(robbody.rotation.y > -Math.PI) {
                        boolwalk4 = false;
                        boolwalk5 = true;
                    } 
                }
                if(boolwalk5) {
                    hitbox.position.x += speed;
                    rightleg1.position.x += 0.01;
                    rightleg2.position.x += 0.01;
                    if(hitbox.position.x > 160) {
                        spot2.setEnabled(true);
                        spot3.setEnabled(true);
                        spot4.setEnabled(true);
                    }
                    if(hitbox.position.x > 230) {
                        boolwalk5 = false;
                        boolwalk6 = true;
                    }
                }
                if(boolwalk6) {
                    robbody.rotation.y += 0.01;
                    leftarm2.rotate(BABYLON.Axis.Z, 0.05, BABYLON.Space.LOCAL);
                    rightarm2.rotate(BABYLON.Axis.Z, -0.05, BABYLON.Space.LOCAL);
                    robheadcone1.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    robheadcone2.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    rightleg1.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    rightleg2.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    
                    if(robbody.rotation.y > -1.60) {
                        boolwalk6 = false;
                        boolwalk7 = true;
                    } 
                }
                if(boolwalk7) {
                    hitbox.position.z += speed;
                    rightleg1.position.z -= 0.001;
                    rightleg2.position.z -= 0.001;
                    if(hitbox.position.z > 280) {
                        boolwalk7 = false;
                        boolgame = true;
                        hint.text = "Robot is ready, press P to fight!"
                        material.emissiveColor = new BABYLON.Color3(0, 1, 0); // Verde
                        ok_animation = true;
                        boss_music.play();
                    }
                }
            }
            
            if(ok_animation) {
                if(game_animation) {
                    //GESTIONE DEL TEMPO
                    const deltaTime = scene.getEngine().getDeltaTime() / 1000; // Tempo trascorso dall'ultimo frame in secondi
                    window.selectedGameTime -= deltaTime;
    
                    var seconds = Math.floor(window.selectedGameTime);
                    seconds = Math.max(0, seconds);
                    life1.text = "Tempo: " + seconds; // Aggiorna il testo della TextBlock con il tempo di gioco
    
                    if(seconds === 0) {
                        clicks ++;
                        boss_music.stop();
                    }
    
                    leftarm2.rotate(BABYLON.Axis.Z, 0.05, BABYLON.Space.LOCAL);
                    rightarm2.rotate(BABYLON.Axis.Z, -0.05, BABYLON.Space.LOCAL);
                    robheadcone1.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    robheadcone2.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    rightleg1.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    rightleg2.rotate(BABYLON.Axis.Y, 0.01, BABYLON.Space.LOCAL);
                    var newX = hitbox.position.x + speed * direction;
                    if(newX > 285) {
                        direction = -1;
                    } else if(newX < 170) {
                        direction = 1;
                    }
                    hitbox.position.x = newX;
                    
                    if(robot_life < 12 && robot_life > 5) {
                        robbodysphere.material.emissiveColor = new BABYLON.Color3(1, 1, 0);
                        particleSystem.start();
                        speed = 0.7;
                    }
                    
                    if(robot_life < 5) {
                        robbodysphere.material.emissiveColor = new BABYLON.Color3(1, 0, 0);
                        speed = 1.0;   
                    }
    
                    if(robot_life === 0 && seconds > 0) {
                        victory = true;
                        //CANZONCINA DI VITTORIA
                    }
                }
            }
            
            if(camera.position.z > 50 && !start_animation) hint.text = "Robot is ready, press 'u' to start animation";
            
            //victory condition
            if(victory){
                gameover.text = "VICTORY";
                scene1.clearColor = new BABYLON.Color3(0.31, 0.8, 0.31);
                boss_music.stop();
                clicks++;
                //victorymusic.play();
            }
            
});

var isJumping = false;

function jump() {
  if (!isJumping) {
    isJumping = true;
    var jumpHeight = 6.0;
    var jumpDuration = 80; 
    
    var animation = new BABYLON.Animation(
      "jumpAnimation",
      "position.y",
      70,
      BABYLON.Animation.ANIMATIONTYPE_FLOAT,
      BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
    );

    var keys = [
      {
        frame: 0,
        value: camera.position.y
      },
      {
        frame: jumpDuration / 4,
        value: camera.position.y + jumpHeight
      },
      {
        frame: jumpDuration,
        value: camera.position.y
      }
    ];

    animation.setKeys(keys);
    camera.animations.push(animation);

    scene.beginAnimation(camera, 0, jumpDuration, false, 1, function() {
      isJumping = false;
    });
  }
}

// Gestione dell'input per il salto
window.addEventListener("keydown", function(event) {
  if (event.key === " ") { 
    jump();
  }
});

// Gestione dell'input per avvio animazione robot prima dell'arena
window.addEventListener("keydown", function(event) {
    if (event.keyCode === 85) { // Codice del tasto u
        hint.text = "Animation started, follow the robot!";
        if(start_animation)
            start_animation = false;
        else
            start_animation = true;
    }
});

window.addEventListener("keydown", function(event) { //INIZIO GIOCO NELL'ARENA, PREMI TASTO E ROBOT COMINCIA A MUOVERSI
    if (event.keyCode === 80) { // Codice del tasto P
        hint.text = "Game started";
        if(game_animation)
            game_animation = false;
        else
            game_animation = true;
    }
});

window.addEventListener("keydown",function(event){
    if(event.keyCode === 71) {
        hitbox.position.x = 230;
        hitbox.position.z = 280;
    }
});


// run the render loop
engine.runRenderLoop(function(){
    divFps.innerHTML = engine.getFps().toFixed() + " fps";
     if(clicks==0){
         if (scene.getWaitingItemsCount() === 0) {
             engine.hideLoadingUI();
            scene0.render();
         } else {
             engine.displayLoadingUI();
         }
     }                   
     else if(clicks == 1){
         advancedTexture1.dispose();
         scene.render();
     }
     else if(clicks == 2){
        advancedTexture2.dispose();
        scene1.render();
    }
});

// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});