var pAnimation = {
    init: function(){
        console.log("<pAnimation> => INIT!");
        //pHome.galleryInit();
        $(window).on('resize', this.onResize);
        this.onResize();

        // PRELOADER.hide();

        if ( WEBGL.isWebGLAvailable() === false ) {
            document.body.appendChild( WEBGL.getWebGLErrorMessage() );
        }

        var container, stats, controls;
        var camera, scene, renderer, light;
        var loader;
        var fbxObject;

        var clock = new THREE.Clock();

        var mixers = [];

        init();
        render();
        
        // add controllers when page loaded:
        $(function(){
            controllers();
        });

        function init() {
            container = document.createElement( 'div' );
            document.body.appendChild( container );

            loader = new THREE.FBXLoader();

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
            camera.position.set( 0, 300, 700 );

            // controls = new THREE.OrbitControls( camera );
            // controls.target.set( 0, 100, 0 );
            // controls.enablePan = true;
            
            // controls.keys = [ 65, 83, 68 ];

            // controls.addEventListener( 'change', render );
            // controls.update();

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0xa0a0a0 );
            // scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

            light = new THREE.HemisphereLight( 0xffffbb, 0x080820 );
            light.intensity = 0.4;
            light.position.set( 1000, 10, 1000 );
            scene.add( light );

            var helper = new THREE.HemisphereLightHelper( light, 5 );
            scene.add( helper );

            var lookObject = new THREE.Object3D();
            lookObject.position.set(0, 200, 0);

            /* light = new THREE.SpotLight( 0xffffff, 1 );
            light.position.set( 100, 170, -200 );
            scene.add(lookObject);
            light.target = lookObject;
            scene.add( light );

            light = new THREE.SpotLight( 0xffffff, 1 );
            light.position.set( -100, 170, -200 );
            light.target = lookObject;
            scene.add( light );

            light = new THREE.SpotLight( 0xffffff );
            light.position.set( 0, 200, 100 );
            light.target = lookObject;
            scene.add( light ); */

            // var spotLightHelper = new THREE.SpotLightHelper( light );
            // scene.add( spotLightHelper );

            light = new THREE.DirectionalLight( 0xffffff );
            light.position.set( 0, 500, 500 );
            /* light.castShadow = true;
            light.shadow.camera.top = 180;
            light.shadow.camera.bottom = -100;
            light.shadow.camera.left = -120;
            light.shadow.camera.right = 120; */
            scene.add( light );

            // scene.add( new THREE.CameraHelper( light.shadow.camera ) );

            // ground
            var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
            mesh.rotation.x = - Math.PI / 2;
            mesh.receiveShadow = true;
            // scene.add( mesh );

            var grid = new THREE.GridHelper( 4000, 20, 0x000000, 0x000000 );
            grid.material.opacity = 0.2;
            grid.material.transparent = true;
            scene.add( grid );

            // model
            // loadModel('assets/models/fbx/Samba Dancing 2.fbx');
            loadModel("uploads/model.fbx", "uploads/texture.jpg");
            PRELOADER.hide();
            
            renderer = new THREE.WebGLRenderer( { antialias: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.shadowMap.enabled = true;
            container.appendChild( renderer.domElement );

            window.addEventListener( 'resize', onWindowResize, false );

            // stats
            stats = new Stats();
            container.appendChild( stats.dom );
            stats.dom.left = "auto";
            stats.dom.right = 0;

            controls = new THREE.TrackballControls( camera , renderer.domElement);
            controls.target.set( 0, 100, 0 );
            controls.rotateSpeed = 0.5;
            controls.zoomSpeed = 0.5;
            controls.panSpeed = 0.5;
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );
        }

        function controllers(){
            $(".btn-upload").click(function(e){
                e.preventDefault();
                
                var file_fbx = $('#fbxFile').prop('files')[0];
                var file_texture = $('#textureFile').prop('files')[0];

                if(!file_fbx){
                    alert("Vui lòng chọn file FBX"); 
                    return;
                }

                if(!file_texture) {
                    alert("Vui lòng chọn file TEXTURE"); 
                    return;
                }

                var form_data = new FormData();                  
                form_data.append('fbxfile', file_fbx);
                form_data.append('texturefile', file_texture);
                // alert(form_data);                          
                
                var baseURL = (location.host == "dev4.digitop.vn") ? "https://dev4.digitop.vn/demo/coca-animation/" : "http://localhost/arjs-demo/debug/";

                $.ajax({
                    url: baseURL + 'upload.php', // point to server-side PHP script 
                    dataType: 'text',  // what to expect back from the PHP script, if anything
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form_data,                         
                    type: 'post',
                    success: function(response){
                        // alert(response); // display response from the PHP script, if any
                        loadModel("uploads/model.fbx", "uploads/texture.jpg");
                    }
                });
            });
        }

        function loadModel(fbxUrl, textureUrl, callback){
            PRELOADER.show();

            var textureLoader = new THREE.TextureLoader();
            textureLoader.load(textureUrl, function(texture){
                console.log(texture);
                // var material = new THREE.MeshLambertMaterial( {
                //     map: texture
                // });
                // var material = new THREE.MeshBasicMaterial( {
                //     map: texture
                // });
                // var material = new THREE.MeshPhongMaterial( {
                //     map: texture, dithering: true, shininess: 50
                // });

                loader.load( fbxUrl, function ( object ) {
                    // remove old object & add loaded 3D object:
                    if(fbxObject){
                        scene.remove(fbxObject);
                        mixers.shift();
                        fbxObject = null;
                        object.mixer = null;
                    }

                    for (var index = 0; index < object.children.length; index++) {
                        var item = object.children[index];
                        if (item.type.toLowerCase().includes("mesh")) {
                            // console.log(item);
                            item.material.color = { r: 1, g: 1, b: 1 };
                        }
                    }
                    
                    object.traverse( function ( child ) {
                        if ( child.isMesh ) {
                            // var texture = new THREE.TextureLoader().load( image );
                            // child.material = material;
                            // texture[0].shading = THREE.SmoothShading;
                            child.material.map = texture;
                            child.material.map.needsUpdate = true;
                            child.material.needsUpdate = true;
                            child.material.shininess = 0;
                            // child.castShadow = true;
                            // child.receiveShadow = true;
                        }
                    } );

                    object.mixer = new THREE.AnimationMixer( object );
                    mixers.push( object.mixer );
    
                    var action = object.mixer.clipAction( object.animations[ 0 ] );
                    action.play();
                    
                    // add to scene:
                    scene.add( object );
                    fbxObject = object;

                    PRELOADER.hide();

                    if(callback) callback(object);
                });
            });
        }

        // render:
        function render() {
            requestAnimationFrame( render );

            var delta = clock.getDelta();

            if ( mixers.length > 0 ) {
                for ( var i = 0; i < mixers.length; i ++ ) {
                    mixers[i].update( delta );
                }
            }

            if(renderer) renderer.render( scene, camera );
            if(stats) stats.update();
            if(controls) controls.update(delta);
        }
    },

    onResize: function(e){
        // do your fucking resizing
        console.log("Browser size: " + window.innerWidth + "x" + window.innerHeight);
    },

    galleryInit: function(){
        //console.log("INIT GALLERY");
        
    }
}

