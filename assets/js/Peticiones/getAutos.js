export const getAutos = async() =>{
    try{

        const response = await fetch("https://trycar.onrender.com");
        console.log(response);
        const data = await response.json();
        //console.log(data.results);
      
        return data.autos;
        

    }catch(error){
        console.log(`el error es: ${error}`);
    }
}