let m = new Object(); // map
let ep = new Array(); // positions to evaluate
let ctr = 0; // counter

let w =(m, x, y, v)=> (m[x] = m[x] ?? new Object())[y] = v; // overwrite
let r =(x, y)=> m[x]?.[y] ?? 0; // read
let rv =(x, y)=> r(x - 1, y - 1) + r(x - 1, y) + r(x - 1, y + 1) + r(x, y - 1) + r(x, y + 1) + r(x + 1, y - 1) + r(x + 1, y) + r(x + 1, y + 1); // read vicinities
let gn =(x, y)=> r(x, y) ? rv(x, y) == 2 || rv(x, y) == 3 : rv(x, y) == 3; // get next

let cw =(x, y, v)=> { // client write
    w(m, x, y, !!v); // write
    ep.push([x - 1, y - 1], [x - 1, y], [x - 1, y + 1], [x, y - 1], [x, y], [x, y + 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]); // add positions to evaluate
};

let e =(ep)=> { // evaluate
    let nm = new Object(); // next map
    let nep = new Array(); // next positions to evaluate
    let x, y; // position
    ep.forEach(p => ( 
        [x, y] = p, // unpack
        nm[x]?.[y] ?? // filter out already evaluated
        (ctr++, // increment counter
        (w(nm, x, y, gn(x, y)) && nep.push(p) || r(x, y)) && // write next map
        nep.push([x - 1, y - 1], [x - 1, y], [x - 1, y + 1], [x, y - 1], [x, y + 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1])) // add next positions to evaluate
    ));
    m = nm; // update map
    return nep; // return next positions to evaluate
}