var Scene = function(gl, output) {


  this.timeAtLastFrame = new Date().getTime();

  this.camera = new OrthoCamera();

  this.gameObjects = [];

  this.quadGeometry = new QuadGeometry(gl);

  this.numSmallQuads = 3;
  this.smallQuads = [];



  // shader/program set ups
  this.vsTrafo2d = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "blue_fs.essl"); 
  this.asteroidProgram = new Program(gl, this.vsTrafo2d, this.fsSolid);
  this.bigQuadMaterial = new Material(gl, this.asteroidProgram);
  this.smallQuadMaterial = new Material(gl, this.asteroidProgram);

  //Game object set ups

  this.bigQuadTexture = new Texture2D(gl, "js/res/boatTape.jpeg");
  this.bigQuadMaterial.colorTexture.set(this.bigQuadTexture);
  this.bigQuadMesh = new Mesh(this.quadGeometry, this.bigQuadMaterial);
  this.bigQuadGameObject = new GameObject2D(this.bigQuadMesh);
  this.bigQuadGameObject.scale = new Vec3(1/4,1/4,1/4);
  this.bigQuadGameObject.updateModelTransformation();
  this.bigQuadGameObject.move = function(dt, keysPressed){
    if(keysPressed["DOWN"]){
      this.position.y-=dt;
    }
    if(keysPressed["UP"]){
      this.position.y+=dt;
    }
    if(keysPressed["LEFT"]){
      this.position.x -= dt;
    }
    if(keysPressed["RIGHT"]){
      this.position.x += dt;
    }
    this.updateModelTransformation();
  }
  this.gameObjects.push(this.bigQuadGameObject);

 

  this.smallQuadTexture = new Texture2D(gl, "js/res/Blue_Bape.jpg");
  this.smallQuadMaterial.colorTexture.set(this.smallQuadTexture);

  var x = 0;
  for(i=0; i<this.numSmallQuads; i++){
    var smallQuadMesh = new Mesh(new QuadGeometry(gl), this.smallQuadMaterial);
    var smallQuadObject = new GameObject2D(smallQuadMesh);
    smallQuadObject.position = new Vec3(-.4+x, -0.5, 0);
    smallQuadObject.scale = new Vec3(1/10,1/10,1/10);
    smallQuadObject.updateModelTransformation();
    this.smallQuads.push(smallQuadObject);
    this.gameObjects.push(smallQuadObject);

    x+=.4
  }

  
  //this.texure.loaded();

  // vertex buffer
  // this.vertexBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
  // gl.bufferData(gl.ARRAY_BUFFER,
  //   new Float32Array(
  //     [-0.5, -0.5, 1.0,
  //    0.5, -0.5, 1.0,
  //     0, 0.5, -1.0,]),
  //   gl.STATIC_DRAW);

  // //vertex color buffer
  // this.vertexColorBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
  // gl.bufferData(gl.ARRAY_BUFFER,
  //   new Float32Array(
  //     [0.3, 0.3, 1.0,
  //    0.3, 0.3, 1.0,
  //     1.0, 1.0, 1.0,]),
  //   gl.STATIC_DRAW);


  // // index buffer
  // this.indexBuffer = gl.createBuffer();
  // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
  // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
  //   new Uint16Array([
  //     0, 1, 2,
  //   ]),
  //   gl.STATIC_DRAW);

  // vertex shader
//   this.vertexShader = gl.createShader(gl.VERTEX_SHADER);
//   gl.shaderSource(this.vertexShader, shaderSource['idle_vs.essl']);
//   gl.compileShader(this.vertexShader);
//   if (!gl.getShaderParameter(this.vertexShader, gl.COMPILE_STATUS))
//     alert("Error in vertex shader:\n" + gl.getShaderInfoLog(this.vertexShader));

//   // fragment shader
//   this.fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
//   gl.shaderSource(this.fragmentShader, shaderSource['blue_fs.essl']);
//   gl.compileShader(this.fragmentShader);
//   if (!gl.getShaderParameter(this.fragmentShader, gl.COMPILE_STATUS))
//     alert("Error in fragment shader:\n" + gl.getShaderInfoLog(this.fragmentShader));

//   // shader program
//   this.program = gl.createProgram();
//   gl.attachShader(this.program, this.vertexShader);
//   gl.attachShader(this.program, this.fragmentShader);

//   gl.bindAttribLocation(this.program, 0, "vertexPosition");
//   gl.bindAttribLocation(this.program, 1, "vertexColor");

//   gl.linkProgram(this.program);
//   if (!gl.getProgramParameter(this.program, gl.LINK_STATUS))
//     alert("Error when linking shaders:\n" + gl.getProgramInfoLog(this.program));
 }

Scene.prototype.update = function(gl, keysPressed) {
  // // set clear color (part of the OpenGL render state)
   gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // // clear the screen
   gl.clear(gl.COLOR_BUFFER_BIT);

   var timeAtThisFrame = new Date().getTime();
   var dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
   this.timeAtLastFrame = timeAtThisFrame;

  // // set shader program to use
  // gl.useProgram(this.program);
  // // set vertex buffer to pipeline input
  // gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

  // gl.enableVertexAttribArray(0);
  // gl.vertexAttribPointer(0,
  //   3, gl.FLOAT, //< three pieces of float
  //   true, //< do not normalize (make unit length)
  //   0, //< tightly packed
  //   0 //< data starts at array start
  // );
  // // set index buffer to pipeline input
  // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);


  // //bind color buffer
  // gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexColorBuffer);
  //  gl.enableVertexAttribArray(1);
  // gl.vertexAttribPointer(1,
  //   3, gl.FLOAT, //< three pieces of float
  //   false, //< do not normalize (make unit length)
  //   0, //< tightly packed
  //   0 //< data starts at array start
  // );

  

  // var quadPositionLocation = gl.getUniformLocation(this.asteroidProgram.glProgram,"quadPosition");
  // if(quadPositionLocation < 0){
  //   Console.log("Could Not Find Quad Position");
  // }else{
  //   gl.uniform3f(quadPositionLocation,this.quadPosition.x, this.quadPosition.y, this.quadPosition.z);



    //camera motion
    if (keysPressed["W"]){
      this.camera.position.y += dt*10;
    }
    if (keysPressed["A"]){
      this.camera.position.x -= dt*10
    }
    if (keysPressed["S"]){
      this.camera.position.y -= dt*10;
    }
    if (keysPressed["D"]){
      this.camera.position.x += dt*10;
    }
    this.camera.updateViewProjMatrix();


  // }



  //this.asteroidProgram.commit();


  // var textureUniformLocation = gl.getUniformLocation(
  // this.asteroidProgram.glProgram, "colorTexture");
  // if(modelMatrixUniformLocation == null) {
  //   console.log("Could not find uniform colorTexture.");
  // } else {
  //   this.spongebobTexture.commit(gl, textureUniformLocation, 0);
  // }
  // this.bigQuadMaterial.commit();
  //console.log(this.quadGeometry.indexBuffer);


  //   var modelMatrixUniformLocation = gl.getUniformLocation(
  //   this.asteroidProgram.glProgram, "modelMatrix");
  // if(modelMatrixUniformLocation == null) {
  //   console.log("Could not find uniform modelMatrix.");
  // } else {
  //   var modelMatrix = new Mat4().scale(Math.abs(Math.sin(this.quadScale)/7)+.2).rotate(this.quadRotation).translate(this.quadPosition);
  //   modelMatrix.commit(gl, modelMatrixUniformLocation);
  // }
  // this.quadScale+=.06;
  // this.quadGeometry.draw();


  //this.bapeTexture.commit(gl, textureUniformLocation, 0);
  //this.smallQuadMaterial.commit();






  //gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);

for (var i = 0; i <= this.gameObjects.length -1; i++) {
  //console.log(this.gameObjects[i]);
  this.gameObjects[i].move(dt, keysPressed);
}

for (var i = 0; i <= this.gameObjects.length -1; i++) {
  //console.log(this.gameObjects[i]);
  this.gameObjects[i].draw(this.camera);
}



}




