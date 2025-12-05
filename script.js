/*--------------------
P5.js Animation Sketch
--------------------*/
const sketch = (p) => {
  /*--------------------
  Vars
  --------------------*/
  const deg = (a) => Math.PI / 180 * a
  const rand = (v1, v2) => Math.floor(v1 + Math.random() * (v2 - v1))
  const opt = {
    particles: window.innerWidth / 500 ? 1000 : 500,
    noiseScale: 0.009,
    angle: Math.PI / 180 * -90,
    h1: rand(0, 360),
    h2: rand(0, 360),
    s1: rand(20, 90),
    s2: rand(20, 90),
    l1: rand(30, 80),
    l2: rand(30, 80),
    strokeWeight: 1.2,
    tail: 82,
  }
  const Particles = []
  let time = 0

  /*--------------------
  Particle Class
  --------------------*/
  class Particle {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.lx = x
      this.ly = y
      this.vx = 0
      this.vy = 0
      this.ax = 0
      this.ay = 0
      this.hueSemen = Math.random()
      this.hue = this.hueSemen > .5 ? 20 + opt.h1 : 20 + opt.h2
      this.sat = this.hueSemen > .5 ? opt.s1 : opt.s2
      this.light = this.hueSemen > .5 ? opt.l1 : opt.l2
      this.maxSpeed = this.hueSemen > .5 ? 3 : 2
    }
    
    randomize() {
      this.hueSemen = Math.random()
      this.hue = this.hueSemen > .5 ? 20 + opt.h1 : 20 + opt.h2
      this.sat = this.hueSemen > .5 ? opt.s1 : opt.s2
      this.light = this.hueSemen > .5 ? opt.l1 : opt.l2
      this.maxSpeed = this.hueSemen > .5 ? 3 : 2
    }
    
    update() {
      this.follow()
      
      this.vx += this.ax
      this.vy += this.ay
      
      var pMag = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
      var a = Math.atan2(this.vy, this.vx)
      var m = Math.min(this.maxSpeed, pMag)
      this.vx = Math.cos(a) * m
      this.vy = Math.sin(a) * m
      
      this.x += this.vx
      this.y += this.vy
      this.ax = 0
      this.ay = 0
      
      this.edges()
    }
    
    follow() {
      let angle = (p.noise(this.x * opt.noiseScale, this.y * opt.noiseScale, time * opt.noiseScale)) * Math.PI * 0.5 + opt.angle
      
      this.ax += Math.cos(angle)
      this.ay += Math.sin(angle)
    }
    
    updatePrev() {
      this.lx = this.x
      this.ly = this.y
    }
    
    edges() {
      if (this.x < 0) {
        this.x = p.width
        this.updatePrev()
      }
      if (this.x > p.width) {
        this.x = 0
        this.updatePrev()
      }
      if (this.y < 0) {
        this.y = p.height
        this.updatePrev()
      }
      if (this.y > p.height) {
        this.y = 0
        this.updatePrev()
      }
    }
    
    render() {
      p.stroke(`hsla(${this.hue}, ${this.sat}%, ${this.light}%, .5)`)
      p.line(this.x, this.y, this.lx, this.ly)
      this.updatePrev()
    }
  }

  /*--------------------
  Setup
  --------------------*/
  p.setup = function() {
    const container = document.getElementById('p5-container')
    const rect = container.getBoundingClientRect()
    p.createCanvas(rect.width, rect.height)
    
    for (let i = 0; i < opt.particles; i++) {
      Particles.push(new Particle(Math.random() * p.width, Math.random() * p.height))
    }
    p.strokeWeight(opt.strokeWeight)
  }

  /*--------------------
  Draw
  --------------------*/
  p.draw = function() {
    time++
    p.background(0, 100 - opt.tail)
    
    for (let particle of Particles) {
      particle.update()
      particle.render()
    }
  }

  /*--------------------
  Click Event
  --------------------*/
  p.mousePressed = function() {
    if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
      opt.h1 = rand(0, 360)
      opt.h2 = rand(0, 360)
      opt.s1 = rand(20, 90)
      opt.s2 = rand(20, 90)
      opt.l1 = rand(30, 80)
      opt.l2 = rand(30, 80)
      opt.angle += deg(rand(60, 120)) * (Math.random() > .5 ? 1 : -1)
      
      for (let particle of Particles) {
        particle.randomize()
      }
      return false
    }
  }

  /*--------------------
  Window Resize
  --------------------*/
  p.windowResized = function() {
    if (document.getElementById('p5-container')) {
      const container = document.getElementById('p5-container')
      const rect = container.getBoundingClientRect()
      p.resizeCanvas(rect.width, rect.height)
    }
  }
}

// Initialize p5 sketch in the container
const p5Instance = new p5(sketch, 'p5-container')
