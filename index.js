//building blocks for more complex objects

//point - building block
function Point(x, y) {
  this.x = x
  this.y = y
}

Point.prototype.toString = function() {
  return `(${this.x}, ${this.y})`
}

//side - building block
function Side(length) {
  this.length = length
}

//superclass & children classes

//shape - superclass
function Shape() {} //shape does not take x,y - must use addToPlane to pass

Shape.prototype.addToPlane = function(x, y) {
  this.position = new Point(x, y)  //.position's value is an instance of Point
}

Shape.prototype.move = function(x, y){
  this.position = new Point(x, y) //.move updates position by way of creating a new instance of Point
}

//circle - inherits from shape
function Circle(radius) {
  Shape.call(this)
  this.radius = radius
}

Circle.prototype = Object.create(Shape.prototype) //define Circle as a prototype of Shape by using Object create and passing instance of Shape
//Cirlce.prototype.constructor = Circle
//above wrecks tests

Circle.prototype.area = function() {
  return(Math.PI * this.radius^2)
}
Circle.prototype.diameter = function() {
  return(this.radius * 2)
}
Circle.prototype.circumference = function() {
  return(2 * Math.PI * this.radius)
}

//polygon, inherits from shape
function Polygon(sides) {
  Shape.call(this)
  this.sides = sides  //array of Side instances
}

Polygon.prototype = Object.create(Shape.prototype)

Polygon.prototype.perimeter = function() {
  // return this.sides.reduce(function (a, b) {return a.length + b.length})
  var perim = 0
  for (var i = 0; i < this.sides.length; i++) {
    perim += this.sides[i].length
  }
   return (perim)
}

Polygon.prototype.numberOfSides = function() {
  return this.sides.length
}

//quadrilateral, inherits from polygon, constructed of 4 integers used to create 4 new sides
function Quadrilateral(sideOne, sideTwo, sideThree, sideFour) {
  Polygon.call(this, [new Side(sideOne), new Side(sideTwo), new Side(sideThree), new Side(sideFour)])
  //a Polygon is created with Side instances, pass args from Quad into Side and populate Poly with Sides
  //don't need to designate sides as properties of quad, as it inherits its properties from the Polygon instance
}

Quadrilateral.prototype = Object.create(Polygon.prototype)
//Quadrilateral.prototype.constructor = Quadrilateral

//rectangle, inherits from quadrilateral
function Rectangle(width, height) {
  Quadrilateral.call(this, width, width, height, height)  //create quad, pass it the four lengths it needs
  this.width = width  //want to be able to call width or height from a rectangle
  this.height = height
}

Rectangle.prototype = Object.create(Quadrilateral.prototype)
//Rectangle.prototype.consutrctor = Rectangle
Rectangle.prototype.area = function() {return this.width * this.height}

function Square(length) {
  Rectangle.call(this, length, length)
  this.length = length
}

Square.prototype = Object.create(Rectangle.prototype)
//Square.prototype.constructor = Square
Square.prototype.listProperties = function() {
  var sqr = new Square(1)
  for (var prop in sqr) {
    if (sqr.hasOwnProperty(prop)) {
      console.log("Square." + prop + " = " + sqr[prop]);
    }
  }
}
//triangle, inherits from polygon
function Triangle(triSideOne, triSideTwo, triSideThree) {
  Polygon.call(this, [new Side(triSideOne), new Side(triSideTwo), new Side(triSideThree)])
}

Triangle.prototype = Object.create(Polygon.prototype)
//Triangle.prototype.constructor = Triangle
