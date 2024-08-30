import axiosInstances from "../axios";

// calling the route links from laravel API Route
// simple and clean hehe
const baseUrl = '/leaders';

//Fetch Data
export const fetchData = async () => {
    try{
        const response = await axiosInstances.get(baseUrl);
        return response.data;
    }catch(error){
        console.error('Error fetching the data',error); 
        throw error;
    }
}

//create Data
export const createData = async (leadersData: {name: string; email:string; phoneNumber:string; role:string; password:string;}) => {
    try{
        const response = await axiosInstances.post(baseUrl,leadersData);
        return response.data;
    }catch (error){
        console.error('Error creating new leader..',error);
        throw error;
    }
}

// Update Data
export const editData = async (id: number, leaderData: {name: string; email: string; phoneNumber: string}) => {
    try {
        const response = await axiosInstances.put(`${baseUrl}/${id}`, leaderData);
        return response.data;
    } catch (error) {
        console.error('Error updating leader', error);
        throw error;
    }

}

// Delete Data
export const removeData = async (id: number) => {
    try {
        await axiosInstances.delete(`${baseUrl}/${id}`);
    } catch (error) {
        console.error('Error deleting leader', error);
        throw error;
    }
}



