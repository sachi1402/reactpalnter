function  handlepredict(url){
    console.log(document.getElementById('img'));
    const example = tf.browser.fromPixels(document.getElementById('img'));
    console.log(example,'raw');
    const imageResize = tf.image.resizeBilinear(example,[256,256],false)
    const upscale =imageResize.expandDims(0)
    console.log(upscale,'up');
    (async () => {const prediction = await model.predict(upscale);
    // model.predict(url)
    console.log(prediction,'fy');
    let fei =  await prediction.array()
    setpred(fei[0])
    console.log(fei,'fei')})();
  }