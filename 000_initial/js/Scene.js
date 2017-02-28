var Scene = function(gl, output) {

  this.quadPosition = {x:0, y:0, z:0};
  this.quadRotation = 0;
  this.quadGeometry = new QuadGeometry(gl);

  this.numSmallQuads = 3;
  this.smallQuads = [];
  this.smallQuadPositions = [];
  var x = 0;
  var colors =     new Float32Array([
  0.0,0.0,1.0,
  0.0, 1.0, 0.0,
  0.0, 1.0, 0.0,
  0.0,0.0,1.0,
  ]);
  for(i=0; i<this.numSmallQuads; i++){
    this.smallQuads.push(new QuadGeometry(gl));
    //console.log(this.smallQuadArray[i])

   // console.log(this.smallQuads[i].setColorBuffer);
   this.smallQuads[i].setColorBuffer(colors);

    this.smallQuadPositions.push({x:-.4+x, y:-0.5, z:0});
    //console.log(this.smallQuadArray[i]);
    x+=.4
  }


  // in constructor 
  this.vsTrafo2d = new Shader(gl, gl.VERTEX_SHADER, "idle_vs.essl");
  this.fsSolid = new Shader(gl, gl.FRAGMENT_SHADER, "color_fs.essl"); 
  this.asteroidProgram = new Program(gl, this.vsTrafo2d, this.fsSolid);

  //this.texture = new Texture2D(gl, "/Users/caiglencross/Desktop/Shots/Doughnuts.jpg");

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

  var modelMatrixUniformLocation = gl.getUniformLocation(
    this.asteroidProgram.glProgram, "modelMatrix");
  if(modelMatrixUniformLocation == null) {
    console.log("Could not find uniform modelMatrix.");
  } else {
    var modelMatrix = new Mat4().scale(.2).translate(this.quadPosition);
    modelMatrix.commit(gl, modelMatrixUniformLocation);
  }
    

  var quadPositionLocation = gl.getUniformLocation(this.asteroidProgram.glProgram,"quadPosition");
  if(quadPositionLocation < 0){
    Console.log("Could Not Find Quad Position");
  }else{
    gl.uniform3f(quadPositionLocation,this.quadPosition.x, this.quadPosition.y, this.quadPosition.z);
    if(keyboardMap["Down"]){
      this.quadPosition.y-=.01;
    }
    if(keyboardMap["Up"]){
      this.quadPosition.y+=.01;
    }
    if(keyboardMap["Left"]){
      this.quadPosition.x-=.01;
      this.quadRotation-=1;
    }
    if(keyboardMap["Right"]){
      this.quadPosition.x+=.01;
      this.quadRotation+=1;

    }
  }

  this.asteroidProgram.commit();

  // var textureUniformLocation = gl.getUniformLocation(
  // this.asteroidProgram.glProgram, "colorTexture");
  // if(modelMatrixUniformLocation == null) {
  //   console.log("Could not find uniform colorTexture.");
  // } else {
  //   this.texture.commit(gl, textureUniformLocation, 0);
  // }

  this.quadGeometry.draw();



  for(i=0; i<this.numSmallQuads; i++){
    
    xDiff = this.quadPosition.x - this.smallQuadPositions[i].x;
    yDiff = this.quadPosition.y - this.smallQuadPositions[i].y;

    this.smallQuadPositions[i].x+= xDiff/100;
    this.smallQuadPositions[i].y+= yDiff/100;

    modelMatrix = new Mat4().scale(.05).translate(this.smallQuadPositions[i]);
    modelMatrix.commit(gl, modelMatrixUniformLocation);

    this.smallQuads[i].draw();
  }
  //gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_SHORT, 0);


}