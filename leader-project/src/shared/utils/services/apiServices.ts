import axiosInstances from "../axios";

// calling the route links from laravel API Route
// simple and clean hehe
const getData = '/leaders';
const storeData = '/store';
const updateData = '/update';
const deleteData = '/delete';

//Fetch Data
export const fetchData = async () => {
    try{
        const response = await axiosInstances.get(getData);
        return response.data;
    }catch(error){
        console.error('Error fetching the data',error); 
        throw error;
    }
}

//create Data
export const createData = async (leadersData: {name: string; email:string; phoneNumber:string}) => {
    try{
        const response = await axiosInstances.post(storeData,leadersData);
        return response.data;
    }catch (error){
        console.error('Error creating new leader..',error);
        throw error;
    }
}

// Update Data
export const editData = async (id: number, leaderData: {name: string; email: string; phoneNumber: string}) => {
    try {
        const response = await axiosInstances.put(`${updateData}/${id}`, leaderData);
        return response.data;
    } catch (error) {
        console.error('Error updating leader', error);
        throw error;
    }

}

// Delete Data
export const removeData = async (id: number) => {
    try {
        await axiosInstances.delete(`${deleteData}/${id}`);
    } catch (error) {
        console.error('Error deleting leader', error);
        throw error;
    }
}



