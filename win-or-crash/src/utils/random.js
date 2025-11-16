export function random(min,max) {
  return Math.random() * (max-min) + min;
}
export function randomColor(){
    let r = random(0,255);
    let g = random(0,255);
    let b = random(0,255);
    return 'rgba(' + r + ',' + g + ',' + b + ',1)';
}