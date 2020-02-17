function PixelCanvas() {
    this.drawPixel = function(coords, style, pixelSize) {
        context.fillStyle = style;
        context.fillRect(coords.x, coords.y, pixelSize, pixelSize);
    };
}
