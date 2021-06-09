// Create Scene
const root = document.getElementById('root');
root.style.display = 'flex';
root.style.justifyContent = 'center';
root.style.alignItems = 'center';
const screen = document.createElement('div');
screen.style.position = "relative";
screen.style.width = "700px";
screen.style.height = "400px";
screen.style.border = "solid 1px black";
screen.style.background = "linear-gradient(to bottom, #94c5f8 1%,#a6e6ff 70%,#b1b5ea 100%)";

const floor = document.createElement('div');
floor.style.position = "absolute";
floor.style.bottom = 0;
floor.style.width = "700px";
floor.style.height = "10px";
floor.style.border = "solid 1px green";
floor.style.backgroundColor = "green";
screen.appendChild(floor);

const box = document.createElement('div');
box.style.position = "absolute";
box.style.bottom = "12px";
box.style.right = "25px";
box.style.width = "80px";
box.style.height = "120px";
box.style.backgroundColor = "#eae060";
box.style.border = "solid 2px #bbb44f";
box.style.borderRadius = "5px";
screen.appendChild(box);

// const perso = document.createElement('div');
// perso.setAttribute('id', 'perso');
// perso.style.position = "absolute";
// perso.style.bottom = "12px";
// perso.style.left = "25px";
// perso.style.width = "30px";
// perso.style.height = "30px";
// perso.style.backgroundColor = "red";
// perso.style.border = "solid 2px black";
// perso.style.borderRadius = "20px";

// screen.appendChild(perso);
root.appendChild(screen);

// Variables globales
const step = 5;
const rate = 50;
let lastDirection = 'ArrowRight';
let jumping = false;

// Traj manuel
const trajJump1 = [
  { x: 0, y: 3},
  { x: 2, y: 8},
  { x: 4, y: 16},
  { x: 6, y: 20},
  { x: 8, y: 21},
  { x: 10, y: 18},
  { x: 12, y: 12},
  { x: 14, y: 5},
  { x: 16, y: 0},
];

// Traj realiste
const g = -9.81;
const m = 30;
const p = 5;
const max = 122; 
let finish = false;
const trajJump2 = [...Array(max).keys()].reduce((acc, i) => {
  if (finish) {
    return acc;
  }

  if ((g/(2*m))*Math.pow(i, 2) + p*i + 0 < 0) {
    finish = true;
    acc.push({
      x: i*2,
      y: 0
    });
  } else {
    acc.push({
      x: i*2,
      y: (g/(2*m))*Math.pow(i, 2) + p*i + 0
    });
  }
  return acc;
}, []);


// Make the character move and jump!
class Character {
  constructor() {
    this.lastDirection = "ArrowRight";
    this.perso = document.createElement('div');
    this.perso.setAttribute('id', 'this.perso');
    this.perso.style.position = "absolute";
    this.perso.style.bottom = "12px";
    this.perso.style.left = "25px";
    this.perso.style.width = "30px";
    this.perso.style.height = "30px";
    this.perso.style.backgroundColor = "yellow";
    this.perso.style.border = "solid 2px black";
    this.perso.style.borderRadius = "20px";
    this.initialization();
  }

  initialization = () => {
    document.addEventListener('keydown', event => {

      const { key } = event;
      const currentX = Number(this.perso.style.left.replace('px', ''));
      const currentY = Number(this.perso.style.bottom.replace('px', ''));
    
      switch (key) {
        case "ArrowRight":
          this.lastDirection = key;
          this.perso.style.left = `${currentX + step}px`;
          break;
        case "ArrowLeft":
          this.lastDirection = key;
          this.perso.style.left = `${currentX - step}px`;
          break;
        case "Shift":
          if (!jumping) {
            jumping = true;
            let i = 0;
            const idInterval = setInterval(() => {
              if ( i <= trajJump2.length - 1) {
                const { x, y } = trajJump2[i];
                if(this.lastDirection === "ArrowRight") {
                  this.perso.style.left = `${currentX + x}px`;
                } else {
                  this.perso.style.left = `${currentX - x}px`;
                }
                // this.perso.style.left = `${this.lastDirection === "ArrowRight" ? currentX + x : currentX - x}px`;
                this.perso.style.bottom = `${currentY + y}px`;
                i += 1;
              } else {
                jumping = false;
                clearInterval(idInterval);
              }
            }, rate)
          }
          break;
      
        default:
          break;
      }
    });
  }

  get Perso() {
    return this.perso;
  }
}
const boule = new Character();
screen.appendChild(boule.Perso);





// document.addEventListener('keydown', event => {

//   const { key } = event;
//   const p = document.querySelector('#perso');
//   const currentX = Number(p.style.left.replace('px', ''));
//   const currentY = Number(p.style.bottom.replace('px', ''));

//   switch (key) {
//     case "ArrowRight":
//       lastDirection = key;
//       p.style.left = `${currentX + step}px`;
//       break;
//     case "ArrowLeft":
//       lastDirection = key;
//       p.style.left = `${currentX - step}px`;
//       break;
//     case "Shift":
//       if (!jumping) {
//         jumping = true;
//         let i = 0;
//         const idInterval =  setInterval(() => {
//           if ( i <= trajJump2.length - 1) {
//             const { x, y } = trajJump2[i];
//             if(lastDirection === "ArrowRight") {
//               p.style.left = `${currentX + x}px`;
//             } else {
//               p.style.left = `${currentX - x}px`;
//             }

//             // p.style.left = `${lastDirection === "ArrowRight" ? currentX + x : currentX - x}px`;

//             p.style.bottom = `${currentY + y}px`;
//             i += 1;
//           } else {
//             jumping = false;
//             clearInterval(idInterval);
//           }
//         }, rate)
//       }
//       break;
  
//     default:
//       break;
//   }
// });