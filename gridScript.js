function setGridsColumnStyle(grids, columnStyle) {
    for (let i = 0; i < grids.length; i++) {
        grids.item(i).style.gridTemplateColumns = columnStyle;
    }
}

function setGridStyleFromSize() {
    if (window.innerWidth < 330) {
        setGridsColumnStyle(grids, "auto");
    }
    else if (window.innerWidth < 560) {
        setGridsColumnStyle(grids, "auto auto");
    }
    else {
        setGridsColumnStyle(grids, "auto auto auto");
    }
}

let grids = document.getElementsByClassName("grid");
setGridStyleFromSize();
addEventListener("resize", event => {
    setGridStyleFromSize();
});