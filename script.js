const pixelCanvas = new PixelCanvas();

function setup() {
    canvas.width = innerHeight;
    canvas.height = innerHeight;

    let pixelSize = 1;
    for (let x = 0; x < innerHeight; x += pixelSize) {
        for (let y = 0; y < innerHeight; y += pixelSize) {
            // for each pixel, we must find if f(z) iterated from 0 remains bounded

            // the Mandelbrot set will be contained within -2 and 2, which we must map to take up the entire canvas
            let a = x.mapTo(0, innerHeight, -2, 2);
            let b = y.mapTo(0, innerHeight, -2, 2);

            // we need to store the original a and b in order to add c to each iteration
            let ca = a;
            let cb = b;

            //sconsole.log("A,B: ", a, b);
            let n = 0;
            // we disregard the value of z, since f_c(z) = z^2 + c will produce c^2 for z = 0;
            // iterate function 100 times and stop if it isn't bound
            while (n < 100) {
                // c is a complex number a + bi
                // for f_c(z_n), the next iteration---f_c(z_(n+1))---will equal this iteration squared
                // for example:
                // f_c(z_0) = 0^2 + c = c
                // f_c(z_1) = c^2 + c
                // f_c(z_2) = (c^2 + c)^2 + c
                // f_c(z_3) = ((c^2 + c)^2 + c)^2 + c
                // replacing c^2 with a + bi would look like this: (a + bi)^2
                // from there, we could simplify to (a^2-b^2) + 2abi

                // c^2 = ***(a^2-b^2)*** + 2abi <-- calculate the a for the next iteration
                let aa = a * a - b * b;

                // c_(n+1) = (a^2-b^2) + ***2abi*** <--- calculate the b for the next itertaion
                let bb = 2 * a * b;

                // update the values for the next iteration
                a = aa + ca;
                b = bb + cb;

                // stop iteration if tending towards "infinity"
                if (a * a + b * b > 4) break;
                n++;
            }

            // color based on how long the sequence stayed bound
            const bright = n.mapTo(0, 100, 0, 255);
            pixelCanvas.drawPixel(
                { x, y },
                `rgba(${bright},${bright},${bright},255)`,
                pixelSize
            );
        }
    }
}

function draw() {
    requestAnimationFrame(draw);

    //context.fillStyle = "#FFF";
    //context.fillRect(0, 0, innerWidth, innerHeight);
}

setup();
draw();
