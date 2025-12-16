import { useEffect, useState } from "react"
import { getTenantRequestsByTenantId } from "../../../../apis/apis";

export default function RequestedProperties({tenantId}){

    const [tenantRequests,setTenantRequests] = useState([]); 

    let loadTenantRequests = async () => {
        console.log('hi');
        const res = await getTenantRequestsByTenantId(tenantId);
        console.log(res.data);
        setTenantRequests(res.data);
    }

    useEffect(()=>{
        loadTenantRequests();

    },[])

    return (
        <>
          <h1>Requested Properties</h1>
          <h1>{JSON.stringify(tenantRequests)}</h1>
        </>
    )
}