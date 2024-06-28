import React from 'react'
import './Container.css'
import { useState,useEffect,useRef } from 'react'

const Container = () => {
  const inputCity=useRef();
  const[pdata,setPdata]=useState(false);
  const returnData = async(city)=>{
    if(city===""){
      alert("Enter city name");
      return;
    }
    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API}`;
      const res= await fetch(url);
      const data=await res.json();
      if(!res.ok){
        alert("Enter valid city name");
        return;
      }
      setPdata({
        name:data.name,
        temp:data.main.temp,
        humidity:data.main.humidity,
        icon:`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        speed:data.wind.speed,
      })
      console.log(data);
      console.log(data.wind.speed);
      console.log(data.main.temp);
      console.log(data.main.humidity);
    }  catch(e){
      setPdata(false);
    }
  }
  useEffect(()=>{
    returnData('Florida');
  },[])

  return (
    <div className='container'>
        <div className="search">
            <input ref={inputCity} type="text" placeholder='Enter City' />
            <img src="https://i.pinimg.com/736x/fa/0e/7b/fa0e7b992eff03c576727e95c746005c.jpg" alt="" srcset="" onClick={()=>returnData(inputCity.current.value)}/>
        </div>
        <img src={pdata.icon} alt="img" srcset="" className='icon'/>
        <p className='temp'>{pdata.temp}°C</p>
        <p className='place'>{pdata.name}</p>
        <div className='other'>
          <div className="wind">
            <p className='speed'>{pdata.speed}km/h</p>
            <p className='display'>Wind Speed</p>
          </div>
          <div className="humid">
            <p className='ity'>{pdata.humidity}%</p>
            <p className='display'>Humidity</p>
          </div>
        </div>
    </div>
  )
}

export default Container
