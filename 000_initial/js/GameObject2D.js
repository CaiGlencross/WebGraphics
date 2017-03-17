var GameObject2D = function(mesh) { 
  this.mesh = mesh;

  this.position = new Vec3(0, 0, 0); 
  this.orientation = 0; 
  this.scale = new Vec3(1, 1, 1); 

  this.modelMatrix = new Mat4(); 
  this.updateModelTransformation(); 

  this.move = function(dt, keysPressed){};

};

GameObject2D.prototype.updateModelTransformation = function(){ 
  this.modelMatrix.set(). 
    scale(this.scale). 
    rotate(this.orientation). 
    translate(this.position);

};

GameObject2D.prototype.draw = function(){ 

  Material.shared.modelViewProjMatrix.set(). 
    mul(this.modelMatrix);

  this.mesh.draw(); 
};

GameObject2D.prototype.draw = function(camera){ 

  Material.shared.modelViewProjMatrix.set(). 
    mul(this.modelMatrix).mul(camera.viewProjMatrix);
    //figure out what comes here


  this.mesh.draw(); 
};
