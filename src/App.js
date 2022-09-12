
import './App.css';
import {useRef,useEffect,useState} from 'react'
import * as tf from '@tensorflow/tfjs'
import Webcam from 'react-webcam';
// import { BiLoaderCircle } from 'react-icons/bi';
function App() {
  const [model, setmodel] = useState(null);
  const [pred, setpred] = useState(null);
  const [picSrc, setpicSrc] = useState(null);
  const desis = ["Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy", "Blueberry___healthy", "Cherry_(including_sour)___healthy", "Cherry_(including_sour)___Powdery_mildew", "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)__Common_rust", "Corn_(maize)___healthy", "Corn_(maize)___Northern_Leaf_Blight", "Grape___Black_rot", "Grape__Esca(Black_Measles)", "Grape___healthy", "Grape__Leaf_blight(Isariopsis_Leaf_Spot)", "Orange__Haunglongbing(Citrus_greening)", "Peach___Bacterial_spot", "Peach___healthy", "Pepper,bell__Bacterial_spot", "Pepper,bell__healthy", "Potato___Early_blight", "Potato___healthy", "Potato___Late_blight", "Raspberry___healthy", "Soybean___healthy", "Squash___Powdery_mildew", "Strawberry___healthy", "Strawberry___Leaf_scorch", "Tomato___Bacterial_spot"]
  // const img = useRef(null)
  const camra= useRef(null)
  const camraImg= useRef(null)
  useEffect(() => {
    (async () => {
      const model1 = await tf.loadLayersModel('./tfjs_model/model.json')
      setmodel(model1) 
    })();  
    return () => {
     
    };
    
  }, [setmodel]);

  useEffect(() => {
    setpred(null)   
    
     return () => {
      
    };
  }, [picSrc]);

  // useEffect(() => {
    
  //   console.log("ca''",camraImg);
  //    return () => {
      
  //   };
  // }, [camraImg]);
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
    const max = Math.max(...fei[0]);
    const index = fei[0].indexOf(max);
    setpred(desis[index])
    console.log(fei,'fei')})();
  }

  // cam 
  function handleCam(e){
    console.log(desis.length)
    setpicSrc(camra.current.getScreenshot({width: 256, height: 256}))
  }
  return (
    <div className="App">
      {/* <h1>planter</h1> */}
      <Webcam ref= {camra} width="100%"   videoConstraints={{ facingMode: "environment"}}/>
      <div className="ccbtn">
      {model == null &&<p>Loading...</p>}
      <div className="cbtn" width="100%" height="100%" onClick={e=>handleCam(e)}/>
      </div>
      {picSrc?<div className="plant">
        <div style={{width: '70%', height: '70%' ,display:'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column',position: 'relative'}}>
        <img style={{borderRadius:'20px',position: 'relative',top:'100px'}} src={picSrc} ref={camraImg}  onClick={(e)=>handlepredict(camraImg)} id='snap' alt='snapshot'/>
        <div style={{width: '90%', height: '70%' ,paddingTop:'150px', backgroundColor:'#eee',borderRadius:'20px',display:'flex',justifyContent: 'flex-start',alignItems: 'center',flexDirection: 'column'}}>

        <h1 key={pred}>{pred?pred:'Analyzing Image ...'}</h1>

        <div style={{padding:'5px 50px',margin:'20px', backgroundColor:'rgb(65, 160, 238)',borderRadius:'20px',display:'flex',justifyContent: 'center',alignItems: 'center',cursor: 'pointer'}} onClick={(e)=>setpicSrc(null)}> <h3>Back</h3> </div>
        </div>
        </div>

      </div>:<div/>}
      {/* {model == null &&<p>Loading...</p>} */}
      {/* {model != null &&<button onClick={()=>handlepredict(img)}>{model.name}</button>} */}
      {/* <img src="./testpic.JPG" ref={img} id ='img' alt='leaf'/> */}
    </div>
  );
}

export default App;
