var certificat = $(".certificat").get(0);
// to canvas
$('#save-as-png').click(function (e) {
    html2canvas(certificat).then(function (canvas) {
        // canvas width
        var canvasWidth = canvas.width;
        // canvas height
        var canvasHeight = canvas.height;
        // convert canvas to image
        var img = Canvas2Image.convertToImage(canvas, canvasWidth, canvasHeight);
        w = canvasWidth;
        h = canvasHeight;
        // save as image
        Canvas2Image.saveAsImage(canvas, w, h, "png", "certificat");

    });
});