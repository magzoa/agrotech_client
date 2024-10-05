import {http} from './config';
export default{
    listarTutorials:()=>{
        return http.get('api/tutorials');
    },
    save:(tutorial)=>{
        return http.post('api/tutorial',tutorial)
    },
    update:(tutorial)=>{
        return http.put('api/tutorial',tutorial)
    },
    delete:(tutorial)=>{
        return http.delete('api/tutorial/'+tutorial.id)
    }
}
