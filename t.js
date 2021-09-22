function getSome() {
    return null;
}
function getSomeMore() {
    return ["some more"];
}
function getMost() {
    return ["get most"];
}

const mainLoop = () => {
    let s = getSome() || getSomeMore() || getMost();
    console.log(s);
};
mainLoop();