import { useEffect,useState } from "react"


export const useWindowSize = () =>{
    const [Size,setSize] = useState([window.innerWidth,window.innerHeight])

    useEffect(()=>{
        const updateSize = ()=>{
            setSize([window.innerWidth,window.innerHeight])
        }
        window.addEventListener('resize',updateSize)

        return ()=> window.removeEventListener('resize',updateSize)
    },[])

    return {
        width:Size[0],
        height:Size[1]
    }
}