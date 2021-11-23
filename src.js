let m = new Object(); // map

let w =(x, y, value)=> { // write
    if (!m[x]) m[x] = new Object();
    return m[x][y] = value;
}
let r =(x, y)=> m[x]?.[y] ?? 0; // read
let rv =(x, y)=> r(x - 1, y - 1) + r(x - 1, y) + r(x - 1, y + 1) + r(x, y - 1) + r(x, y + 1) + r(x + 1, y - 1) + r(x + 1, y) + r(x + 1, y + 1); // read vicinities
let gn =(x, y)=> r(x, y) ? rv(x, y) == 2 || rv(x, y) == 3 : rv(x, y) == 3; // get next