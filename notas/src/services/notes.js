import axios from 'axios';

const url= "http://localhost:3001/api/notes"

const getAll=()=>{
    const request=axios.get(url)
    const NoExist={
        id:1000,
        content:"Es una nota error",
        date:"2023-03-15",
        important:true
    }
    return request.then(response=>response.data.concat(NoExist))
}

const create=newObject=>{
    const request=axios.post(url,newObject)
    return request.then(response=>response.data)

}

const update=(id,newObject)=>{
    const request =axios.put(`${url}/${id}`,newObject)
    return request.then(response=>response.data)
    

}

export default {getAll,create,update}