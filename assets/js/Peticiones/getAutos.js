export const getAutos = async() =>{
    try{

        const response = await fetch("https://trycar.onrender.com");
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json();
        if (!data.results){
            throw new Error("results property is missing in the response data");
        }


        return data.results;
    }catch(error){
        console.log(`el error es: ${error}`);
        throw error;
    }
}