
import './App.css';
import {useRef,useEffect,useState} from 'react'
import * as tf from '@tensorflow/tfjs'
import Webcam from 'react-webcam';
// import model from './tfjs_model/model.json' 
// import { model } from '@tensorflow/tfjs';
function App() {
  const [model, setmodel] = useState(null);
  const [pred, setpred] = useState([]);
  const [picSrc, setpicSrc] = useState(null);
  const [desis, setdesis] = useState(["Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy", "Blueberry___healthy", "Cherry_(including_sour)___healthy", "Cherry_(including_sour)___Powdery_mildew", "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)__Common_rust", "Corn_(maize)___healthy", "Corn_(maize)___Northern_Leaf_Blight", "Grape___Black_rot", "Grape__Esca(Black_Measles)", "Grape___healthy", "Grape__Leaf_blight(Isariopsis_Leaf_Spot)", "Orange__Haunglongbing(Citrus_greening)", "Peach___Bacterial_spot", "Peach___healthy", "Pepper,bell__Bacterial_spot", "Pepper,bell__healthy", "Potato___Early_blight", "Potato___healthy", "Potato___Late_blight", "Raspberry___healthy", "Soybean___healthy", "Squash___Powdery_mildew", "Strawberry___healthy", "Strawberry___Leaf_scorch", "Tomato___Bacterial_spot"]);
  const img = useRef(null)
  const camra= useRef(null)
  const camraImg= useRef(null)
  useEffect(() => {
    (async () => {
      const model1 = await tf.loadLayersModel('./tfjs_model/model.json')
      setmodel(model1) 
    })();
    console.log(model)
    console.log('hi')
    
    return () => {
      // this now gets called when the component unmounts
    };
    
  }, []);
  function  handlepredict(url){
    console.log(url);
    const example = tf.browser.fromPixels(url.current);
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

  // cam 
  function handleCam(e){
    // console.log(camra.current.getScreenshot({width: 256, height: 256}))
    setpicSrc(camra.current.getScreenshot({width: 256, height: 256}))
  }
  return (
    <div className="App">
      <h1>hello</h1>
      <Webcam ref= {camra} width="256px" high="256px"  onClick={e=>handleCam(e)}/>
      {model != null &&<p>{model.name}</p>}
      {model != null &&<button onClick={()=>handlepredict(img)}>{model.name}</button>}
      <img src="./testpic.JPG" ref={img} id ='img'/>
      {
      // pred.map((e,key)=> e>=1?<div key={key}>{desis[key]}</div>: <div></div>)
      pred.map((e,key)=> {
        if(e>=1){
        return <div key={key}>{desis[key]}</div>
        }
               })
      }
      {picSrc && <img src={picSrc} ref={camraImg}  onClick={(e)=>handlepredict(camraImg)} id='snap'/>}
      
    </div>
  );
}

export default App;
