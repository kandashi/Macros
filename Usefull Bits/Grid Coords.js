const pX = canvas.dimensions.sceneRect.x
const pW = canvas.grid.grid.w
const pG = canvas.dimensions.size / 2
const pY = canvas.dimensions.sceneRect.y
const style = CONFIG.canvasTextStyle.clone();
const offX = canvas.dimensions.shiftX
const offY = canvas.dimensions.shiftY

switch (canvas.grid.isHex) {
    case true: {
        if (canvas.grid.grid.columns) columnHex()
        else rowHex()
    } break;
    case false: squareGrid()
}
function columnHex() {
    for (let i = 0; i < canvas.dimensions.sceneWidth / canvas.grid.grid.w * 4 / 3; i++) {
        style.fontSize = canvas.dimensions.size / 2
        const name = new PreciseText(`${i}`, style);
        name.anchor.set(0.5)
        name.position.set(i * (canvas.grid.grid.w * 3 / 4) + pX + canvas.grid.grid.w / 2, +pY - canvas.grid.grid.h / 3)
        canvas.tiles.addChild(name)
    }
    for (let i = 0; i < canvas.dimensions.sceneHeight / canvas.grid.grid.h + 1; i++) {
        style.fontSize = canvas.dimensions.size / 2
        const name = new PreciseText(`${i}`, style);
        let evenPad = canvas.grid.grid.even ? canvas.grid.grid.w / 2 : 0;
        name.anchor.set(0.5, 0.5)
        name.position.set(pX - canvas.grid.grid.w / 3, i * (canvas.grid.grid.h) + pY - evenPad)
        canvas.tiles.addChild(name)
    }
}

function rowHex() {

    for (let i = 0; i < (canvas.dimensions.sceneWidth / canvas.grid.grid.w)+2; i++) {
        style.fontSize = canvas.dimensions.size / 2
        const name = new PreciseText(`${i}`, style);
        let evenPad = canvas.grid.grid.even ? canvas.grid.grid.w / 2 : 0;
        name.anchor.set(0.5)
        name.position.set(pX + (i * pW) + offX  ,  pY - canvas.grid.grid.h / 3)
        canvas.tiles.addChild(name)
    }
    for (let i = 0; i < canvas.dimensions.sceneHeight / canvas.grid.grid.h * 4 / 3; i++) {
        style.fontSize = canvas.dimensions.size / 2
        const name = new PreciseText(`${i}`, style);
        name.anchor.set(0.5, 0.5)
        name.position.set(pX - canvas.grid.grid.w / 3,   pY + i * (canvas.grid.grid.h * 3 / 4) + offY)
        canvas.tiles.addChild(name)
    }
}

function squareGrid() {
    for (let i = 0; i < canvas.dimensions.sceneWidth / canvas.dimensions.size; i++) {
        style.fontSize = canvas.dimensions.size / 2
        const name = new PreciseText(`${i}`, style);
        name.anchor.set(0.5)
        name.position.set(i * canvas.dimensions.size + pX + pG, -canvas.dimensions.size + pY + pG)
        canvas.tiles.addChild(name)
    }

    for (let i = 0; i < canvas.dimensions.sceneHeight / canvas.dimensions.size; i++) {
        style.fontSize = canvas.dimensions.size / 2
        const name = new PreciseText(`${i}`, style);
        name.anchor.set(0.5)
        name.position.set(-canvas.dimensions.size + pX + pG, i * canvas.dimensions.size + pY + pG)
        canvas.tiles.addChild(name)
    }
}