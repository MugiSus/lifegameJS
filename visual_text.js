let visualiseAsTxtRect =(x, y, w, h)=> {
    return (
        new Array(h).fill(0).map((_, i) =>  
            new Array(w).fill(0).map((_, j) => {
                switch (m[x + j]?.[y + i]) {
                    case false: return '░░';
                    case true: return '██';
                    default: return '  ';
                }
            }).join("")
        ).join("\n") + 
        ` [done ${new Date().getTime()}]`
    );
}