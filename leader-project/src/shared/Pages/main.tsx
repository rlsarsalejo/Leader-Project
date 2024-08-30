import { Plus,Pencil,Trash2 } from 'lucide-react'
// list of modals
import AddNewLeaderModal from '../components/Modals/CreateNewLeaderModal'
import EditModal from '../components/Modals/EditDataModal'
import DeleteModal from '../components/Modals/DeleteDataModal'
import React,{useEffect, useState} from 'react';
import { fetchData, createData,editData, removeData } from '../utils/services/apiServices';


const main: React.FC = () => {
  
   
    //display message 
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({});

    // Load leaders Data
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const loadleaders = async () => {
        setIsLoading(true);
        try{
            const data = await fetchData();
            if (Array.isArray(data)) {
              setLeaders(data);
          } else {
              console.error('Expected an array but got:', data);
              setLeaders([]); // Default to an empty array if data is not an array
          }
        }catch (error){
            console.error('Failed to load leaders:', error);
            setErrorMessage('Failed to load leaders data.');
            setLeaders([]);
        }finally{
            setIsLoading(false);
        }
    }   

    // Edit Data Area //

    // EditModal Function
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [currentLeader, setCurrentLeader] = useState<any>(null);
    const openEditModal = (leader: any) => {
        setCurrentLeader(leader);
        setIsEditModalOpen(true);
      };
      
      const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentLeader(null);
      };

    const editLeader = async (id: number, leaderData: { name: string; email: string; phoneNumber: string }) => {
        try {
          await editData(id, leaderData);
          loadleaders();
          setSuccessMessage('Leader updated successfully!');
          setValidationErrors({});
        } catch (error:any) {
          if (error.response && error.response.data.errors) {
            setValidationErrors(error.response.data.errors);
          }
          setErrorMessage('Error updating leader');
        }
        closeEditModal();
      };



    /// Create New Data Area ///

    //Add Modal Functions
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () =>  setIsModalOpen(false);
    const [leaders, setLeaders] = useState<any[]>([]);
     
    //Add new Data using the Modal
    const addLeader = async (leaderData: {name:string; email:string; phoneNumber:string; role: string; password:string;}) => {
        try{
            await createData(leaderData);
            loadleaders();
            setSuccessMessage('Leader added successfully!');
            setErrorMessage(null);
            closeModal();
        }catch(error: any){
            console.error('Error adding leader:', error);
            setSuccessMessage(null);
            setErrorMessage('Failed to add leader.');
            if (error.response && error.response.data && error.response.data.errors) {
                setValidationErrors(error.response.data.errors);
              }
        }   
    }

    // Delete Data Area //
    const openDeleteModal = (leader: any) => {
        setCurrentLeader(leader);
        setIsDeleteModalOpen(true);
      };
    
      const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setCurrentLeader(null);
      };
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const deleteLeader = async (id: number) => {
        try {
          await removeData(id);
          loadleaders();
          setSuccessMessage('Leader deleted successfully!');
          setIsDeleteModalOpen(false);
        } catch (error) {
          setErrorMessage('Error deleting leader');
        }
      };


 /// Effects Area ///

  //3s ra ang display
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

    // displaying the data
    useEffect(() =>{
        loadleaders();
    },[]);
  return (
    <div className='overflow-x-auto bg-white shadow-md rounded-lg p-5 nt-5 '>
        <div className='flex mb-5 justify-between'>
            <h1 className='text-lg font-semibold'>Leader's Data</h1>
            <button  onClick={openModal} className='flex items-center space-x-2 bg-blue-500 p-2 text-sm font-semibold text-white'>
                <Plus className='h-5 w-5' /> Add new
            </button>
        </div>
                 {/* Success message */}
                {successMessage && (
                    <div className="mb-4 p-4 text-green-800 bg-green-200 rounded-lg">
                    {successMessage}
                    </div>
                )}

                {/* Error message */}
                {errorMessage && (
                    <div className="mb-4 p-4 text-red-800 bg-red-200 rounded-lg">
                    {errorMessage}
                    </div>
                )}
       

        <table className='min-w-full table-auto'>
            <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-center">Email</th>
              <th className="py-3 px-6 text-center">Roles</th>
              <th className="py-3 px-6 text-center">Phone Number</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
                {isLoading ? (
                     <tr>
                     <td colSpan={7} className="py-3 px-6 text-center text-2xl">
                         Fetching data pls wait.....
                     </td>
                 </tr>

                ): leaders.length === 0 ? (
                    <tr>
                    <td colSpan={5} className="py-3 px-6 text-center">
                        No data available
                    </td>
                    </tr>
                ): (
                    
                    leaders.map((leader) => (
                        <tr key={leader.id} className="border-b border-gray-200 text-lg hover:bg-gray-100">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="font-medium">{leader.id}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left">
                          <div className="flex items-center">
                            <span>{leader.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span>{leader.email}</span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span>{leader.role}</span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-lg">
                            {leader.phoneNumber}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button onClick={() => openEditModal(leader)} className="flex items-center space-x-2 bg-blue-500 p-2 text-white rounded-md">
                              <Pencil className="h-5 w-5" />
                            </button>
                            <button
                                 onClick={() => openDeleteModal(leader)}    
                              className="flex items-center space-x-2 bg-red-500 p-2 text-sm rounded-md text-white"
                            >
                              <Trash2 className="h-5 w-5 " /> 
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                )}


               
            
            </tbody>
        </table>
        {/* Delete Modal */}
       <DeleteModal
            isOpen={isDeleteModalOpen} 
            onClose={closeDeleteModal} 
            onDelete={() => currentLeader && deleteLeader(currentLeader.id)}
          />
          {/* Add Modal */}
        <AddNewLeaderModal isOpen={isModalOpen} onClose={closeModal} onSave={addLeader} validationErrors={validationErrors} />
       
        {/* Update Modal */}
        {currentLeader && (
        <EditModal
          isOpen={isEditModalOpen} 
          onClose={closeEditModal} 
          onSave={editLeader} 
          leaderData={currentLeader} 
          validationErrors={validationErrors}
        />
      )}
    </div>
  )
}

export default main