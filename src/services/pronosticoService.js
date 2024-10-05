import {http} from './config';
export default{
    listarPronosticos:()=>{
        return http.get('api/pronosticos');
    },
    save:(pronostico)=>{
        return http.post('api/pronostico',pronostico)
    },
    update:(pronostico)=>{
        return http.put('api/pronostico',pronostico)
    },
    delete:(pronostico)=>{
        return http.delete('api/pronostico/'+pronostico.id)
    }
}
