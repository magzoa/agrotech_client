import {http} from './config';
export default{
    listarAbouts:()=>{
        return http.get('api/abouts');
    },
    save:(about)=>{
        return http.post('api/about',about)
    },
    update:(about)=>{
        return http.put('api/about',about)
    },
    delete:(about)=>{
        return http.delete('api/about/'+about.id)
    }
}
