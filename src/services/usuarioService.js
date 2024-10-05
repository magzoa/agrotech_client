import {http} from './config';
export default{
    listarUsuarios:()=>{
        return http.get('api/usuarios');
    },
    save:(usuario)=>{
        return http.post('api/usuario',usuario)
    },
    update:(usuario)=>{
        return http.put('api/usuario',usuario)
    },
    delete:(usuario)=>{
        return http.delete('api/usuario/'+usuario.id)
    }
}
