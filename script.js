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


//position
let positionBottom = 12;
let positionLeft = 25;

const perso = document.createElement('div');
perso.style.position = "absolute";
perso.style.bottom = `${positionBottom}px`;
perso.style.left = `${positionLeft}px`;
perso.style.width = "30px";
perso.style.height = "30px";
perso.style.backgroundColor = "red";
perso.style.border = "solid 2px black";
perso.style.borderRadius = "20px";
screen.appendChild(perso);

root.appendChild(screen);

//create classes
// class Perso {
//     constructor(positionLeft, positionBottom) {
//         this.positionLeft = positionLeft;
//         this.positionBottom = positionBottom;
//     }

//     get moveInFront() {
//         return this.positionLeft += 100
//     }

//     get moveBack() {
//         return this.positionLeft -= 100
//     }

//     get jump() {

//     }
// }

// class Position extends Perso {

//     constructor(positionLeft, positionBottom) {
//         super(positionLeft, positionBottom)
//     }

//     get initPositionLeft() {
//         return this.positionLeft = 25
//     }

//     get initPositionBottom() {
//         return this.positionBottom = 12
//     }

//     get onTheBoxPositionLeft() {
//         return this.positionLeft = 595
//     }

//     get onTheBoxPositionBottom() {
//         return this.positionBottom = 134
//     }

// }

//const initPosition = new Position(25,12);

//console.log(Position.initPositionLeft);



// Make the character move and jump!

//check a keydown event on arrowRight, Up, Left
document.addEventListener('keydown',(e) => {
    const key = e.keyCode

    switch (key) {
        case 37 :
            moveBack();
            perso.style.left = `${positionLeft}px`;
            break;
        case 38 :
            jump();
            perso.style.bottom = `${positionBottom}px`;
            break;
        case 39 :
            moveInFront();
            perso.style.left = `${positionLeft}px`;
            break;
        default :
            break;
    }
})



//move in front of
function moveInFront(){

    perso.animate([
        { // from
            left: `${positionLeft}px`,
        },
        { // to
            left: `${positionLeft += 100}px`
        }
    ], 1000);
}

//move back 
function moveBack(){

    perso.animate([
        { left: `${positionLeft}px`},
        { left: `${positionLeft -= 100}px`}
    ], 1000);
}


//jump 
function jump(){

    //next to the box
    if (positionLeft >= 575 ) {

        perso.animate([
            { bottom: `${positionBottom}px` },
            { bottom: `${positionBottom + 150}px` },
            { bottom: `${positionBottom = 134}px` }
        ], 500);
    }
    else {
        
        perso.animate([
            { bottom: `${positionBottom}px`},
            { bottom: `${positionBottom + 150}px`},
            { bottom: `${positionBottom = 12}px`},
        ], 500);
    }
}