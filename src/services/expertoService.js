import {http} from './config';
export default{
    listarExpertos:()=>{
        return http.get('api/expertos');
    },
    save:(experto)=>{
        return http.post('api/experto',experto)
    },
    update:(experto)=>{
        return http.put('api/experto',experto)
    },
    delete:(experto)=>{
        return http.delete('api/experto/'+experto.id)
    }
}
