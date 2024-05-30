export const getAutos = async() =>{
    try{

        const response = await fetch("https://trycar.onrender.com");
        const data = await response.json();
      
        return data.results;

    }catch(error){
        console.log(`el error es: ${error}`);
    }
}