function countWays(A, B){
    if (A.x === B.x || A.y === B.y) {
        return 1;
    } else {
        if (A.x < B.x && A.y < B.y) {
          return countWays({x: A.x + 1, y: A.y}, B) + countWays({x: A.x, y: A.y + 1}, B );
        }
    }
}

const res = countWays({ x:0, y:0}, { x: 1, y: 1});
console.log(res);
