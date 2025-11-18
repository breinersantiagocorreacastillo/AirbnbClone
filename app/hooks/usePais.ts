import  countries  from "world-countries";


const formatoPaises = countries.map((country)=>({
    value: country.cca2, //codigo del pais
    label: country.name.common, //nombre del pais
    latlng: country.latlng, //coordenadas geograficas
    region: country.region, //region geografica
    flag: country.flag, //bandera del pais
}));
export default function usePais(){
   const getAll = ()=> formatoPaises;

   const getByValue = (value: string) => {
    return formatoPaises.find((item) => item.value === value);//buscar pais por su codigo
   };
   return {
    getAll,//retorna todos los paises
    getByValue,//retorna un pais por su codigo
   };
}