import React, { use } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { io } from "socket.io-client"

export const Tempchat = () => {

    // array to hold messages
    const [li,Setli] =useState([]);

    let [bool,Setbool] = useState(false)

    const [input, Setinput] = useState("");

    // use ref to make socket reacheble across functions
    let socket = useRef(null)

    // connect to the socket once
    useEffect( ()=>
    {
        socket.current  = io("http://192.168.11.112:3000");

        // when
        socket.current.on("response",(res)=>{
            Setli(prev => [...prev, {type:"reciv" , value: res}]);
        }

        
    )
},[])

    // function to send the message
    const send = (e)=>{
        if(input)
        socket.current.emit("message",e)
        Setli(prev => [...prev, {type:"sent" , value: e}]);
    }
    
    
    // when bool changes send the msg
    useEffect(()=>{
        
        send(input);
        Setinput("")
    },[bool])

    


    return (
        <>
            <section className='flex justify-center  relative w-full h-full'>

                <div className="w-[80%] overflow-auto h-[85vh]  ">
                    <div className="  flex gap-2 flex-col">
                        {li.map(e=>
                            e.value != "" ?
                            <div className={` w-fit px-2 py-1 rounded-[5px] text-white  text-2xl ${e.type == "sent" ? "bg-purple-500 self-end ":"bg-yellow-500  "}`} >{e.value}</div>
                            :null
                        )}
                    </div>
                </div>
                <div className="flex  fixed bottom-10 left-1/2 -translate-x-1/2 w-[80%] gap-4">

                    <input onChange={(e)=> {Setinput(e.target.value) }}  value={input} className='w-[100%] border rounded-[5px] p-2 ' type="text" placeholder='type message here' />
                    <button onClick={ ()=> Setbool(!bool)} className='bg-sky-400 p-2 rounded-[5px] items-center justify-center flex text-white'>send</button>
                </div>


            </section>        
        </>
    );
};

