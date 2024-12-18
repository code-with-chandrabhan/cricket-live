import { useState, useEffect } from 'react';
import React from 'react';
import red from './red.png';
function App() {
  const [data, setData] = useState([]);
  const[inputData, setInputData] = useState("");
  const [search, setSearch] = useState("");
  const getData = async () => {
    try {
      const response = await fetch('https://api.cricapi.com/v1/cricScore?apikey=249434ea-2514-4c86-a6f6-052f9288195e');
      const data = await response.json();
      
      setData(data.data);
    } catch (error) {
      
    }
    
  }
  useEffect(() => {
    getData();
  }, []);
const handleInput = (e) => {
  
  setInputData(e.target.value);
}
const handleBtn = () => {
 
  setSearch(inputData);
  getData();

}
  return (
  <>        <header className='bg-black text-white py-6 fixed w-full'>
          <div className='text-center text-2xl'>
            <input type="text" placeholder="search"  className='rounded-md px-4 text-black' onChange={handleInput}/>
            <button className='bg-red-700 text-white ml-2 rounded-md px-2 hover:bg-red-600' onClick={handleBtn}>Search</button>
          </div>
          </header>

          <div className='flex justify-center items-center gap-2 pt-20 text-2xl '>
            <img className='w-5' src={red} alt="red" />
            <p>Live Cricket Score APP</p>
          </div>
          <div className='grid md:grid-cols-4  gap-2 mt-4 p-4 '>
            {data.map((curVal) => {
             if(curVal.status != "Match not started"){
              if(curVal.series.includes(search)  || curVal.t1.includes(search) || curVal.t2.includes(search)){
                if(curVal.series.includes(search)){
                  return (
                    <div className=' w-80 h-60 border-2 border-gray-400 p-4 rounded-md'>
                     <h3 className='text-xl font-bold'>{curVal.series}</h3>
                     <h3 className=''>{curVal.matchtype}</h3>
                     <div className='flex justify-between mt-4  '>
                       <div className=''>
                       <img className='' src={curVal.t1img} alt="t1img" />
                       <p>{curVal.t1score}</p>
                       </div>
                       <div className=''>
                       <img className='' src={curVal.t2img} alt="t2img" />
                       <p>{curVal.t2score}</p>
                       </div>
                     </div>
                     <p>{curVal.status}</p>
                     </div>
                  )
                }
               
                return (
                  <div className="">
                   <h3>{curVal.series}</h3>
                   <h3>{curVal.matchtype}</h3>
                  
                   <div>
                     <img src={curVal.t1img} alt="t1img" />
                     <p>{curVal.t1score}</p>
                   </div>
                   <div>
                     <img src={curVal.t2img} alt="t2img" />
                     <p>{curVal.t2score}</p>
                   </div>
                   <p>{curVal.status}</p>
                   </div>
                )
              }
            
              
             }
             if(search == "" && curVal.status == "Match not started"){
             return (
              
               <div className=' w-80 h-60 border-2 border-gray-400 p-4 rounded-md'>
                <h3 className='text-xl font-bold'>{curVal.series}</h3>
                <h3 className=''>{curVal.matchtype}</h3>
                <div className='flex justify-between mt-4  '>
                  <div className=''>
                  <img className='' src={curVal.t1img} alt="t1img" />
                  <p>{curVal.t1score}</p>
                </div>
                <div>
                  <img className='' src={curVal.t2img} alt="t2img" />
                  <p>{curVal.t2score}</p>
                </div>
                </div>

                <p className='mt-4 text-center text-xl'>{curVal.status}</p>
                </div>
                
             )
             }
             
           })}
          </div>
          
  
  
  </>
 
  
  );
}

export default App;
