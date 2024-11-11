// import React from 'react'
import { useEffect, useRef, useState } from 'react';
import clear from '../04 Weather App React Assets/Assets/clear.png';
import cloud from '../04 Weather App React Assets/Assets/cloud.png';
import drizzle from '../04 Weather App React Assets/Assets/drizzle.png';
import rain from '../04 Weather App React Assets/Assets/rain.png';
import snow from '../04 Weather App React Assets/Assets/snow.png';
export default function Countainer() {
    const cityname="London"
    const inputref=useRef();
    const allicons={
        "01d":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":cloud,
        "04n":cloud,
        "09d":drizzle,
        "09n":drizzle,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow,

    }
    // const [name,setname]=useState("Londen");
    const [weatherdata,setweatherdata]=useState([]);
    const search= async(city)=>{
        if(city==="")
        {
            alert("Please enter a city name");
            return;
        }
        
        try
        {
            const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=a4be85c87f4b0ee847accb8a115f876b&units=metric`;
             
            const response= await fetch(url);
            const data= await response.json();
             const icon=allicons[data.weather[0].icon || clear];
            console.log(data);
            setweatherdata({
                humidity: data.main.humidity,
                name: data.name,
                temp:Math.floor(data.main.temp),
                weather: data.weather[0].main,
                description: data.weather[0].description,
                icon: icon,
                windspead: Math.floor(data.wind.speed),
            })
        }catch(error)
        {
            console.error(error);
        }
    }
    useEffect(()=>
    {
        search(cityname);
    },[]
    )
   
  return (
    <div className=" bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg  w-[400px] h-[500px] flex flex-col justify-around ">
        {weatherdata ? <div >
        
        <div className="mx-10 bg-white rounded-lg flex justify-between  items-center">
            <input type="text" placeholder=" Search ..."  className=" outline-none ml-1" ref={inputref}/>
            <div><i className="fa-solid fa-magnifying-glass  bg-slate-100 hover:bg-slate-400 duration-100 ease-in w-[30px]
             text-[20px] h-[30px] flex justify-center items-center rounded-full hover:cursor-pointer"
              onClick={()=>search(inputref.current.value)}></i></div>
        </div>
        <div className=' grid place-content-center '>
            <img src={weatherdata.icon} alt={weatherdata.icon}  className='w-48'/>
            <h1 className='text-4xl  text-center font-extrabold text-white'>{weatherdata.temp}°C</h1>
            <h2 className='text-3xl font-bold text-center text-white'>{weatherdata.name}</h2>
        </div>
        <div className='flex align-middle justify-around mt-10 '>
            <div className='flex'>
                <div><i className="fa-solid fa-water text-xl text-white "></i></div>
                <div>
                <div className='text-2xl ml-3 text-white'>{weatherdata.humidity}%</div>
                <span className='text-white'>Humidity</span>
                </div>
            </div>
            <div className=' flex'>
                <span><i className="fa-solid fa-wind text-xl text-white"></i></span>
                <div className=''>
                <div className='text-2xl ml-3 text-white'>{weatherdata.windspead} Km/h</div>
                <span className='text-white'>Wind Speed</span>
                </div>
            </div>
        </div>
        </div> : <></>}
    </div>
  )
}
 