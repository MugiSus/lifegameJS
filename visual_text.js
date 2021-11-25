let visualiseAsTxtRect =(x, y, w, h)=> {
    return (
        new Array(h).fill(0).map((_, i) =>  
            new Array(w).fill(0).map((_, j) => 
                m[x + j]?.[y + i] == undefined ? '  ' : m[x + j][y + i] ? '██' : '░░'
            ).join("")
        ).join("\n") + 
        ` [done ${new Date().getTime()}]`
    );
}