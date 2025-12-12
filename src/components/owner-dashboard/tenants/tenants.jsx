import { useEffect, useState } from "react"
import { getTenants } from "../../../apis/apis";

export default function Tenants({owner}){

    const [tenants,setTenants] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);
    async function loadTenants(){
        let res = await getTenants(owner.userId);

        if(res.status === 200){
            setTenants(res.data);
            setIsLoaded(true);
        }
        console.log(res.data);
    }

    useEffect(()=>{
        loadTenants();
    },[])

    return (
        <>
        {isLoaded ? <h1>{JSON.stringify(tenants)}</h1> :<h1>Loading...</h1>}
        </>
    );
}