import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { storage, db } from '../firebase'; // Your Firebase config
import { ref, deleteObject } from 'firebase/storage';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const candidatesCollection = collection(db, 'candidates');
        const candidatesSnapshot = await getDocs(candidatesCollection);
        const candidatesList = candidatesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setCandidates(candidatesList);
      } catch (error) {
        console.error('Error fetching candidates:', error);
        alert('Failed to fetch candidates. Please try again.'); // Error handling for fetching
      }
    };

    fetchCandidates();
  }, []);

  const handleDelete = async (id, imageUrl) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {

          // Delete image from Firebase Storage
          const storageRef = ref(storage, imageUrl);
          await deleteObject(storageRef);

        // Delete candidate document from Firestore
        await deleteDoc(doc(db, 'candidates', id));

        // Update state to remove the deleted candidate from the list
        setCandidates((prevCandidates) => prevCandidates.filter((candidate) => candidate.id !== id));
        alert('Candidate deleted successfully!');
      } catch (error) {
        console.error('Error deleting candidate:', error);
        alert('Failed to delete candidate. Please try again.'); // Error handling for deletion
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Candidates List</h2>
      <ul className="space-y-4">
        {candidates.map((candidate) => (
          <li key={candidate.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center flex-1">
              <div className="flex-shrink-0">
                {candidate.imageUrl && (
                  <img src={candidate.imageUrl} alt={candidate.name} className="w-16 h-16 rounded-full mr-4" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{candidate.name}</h3>
                <p className="text-gray-600">{candidate.email}</p>
                <p className="text-gray-600">{candidate.address}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(candidate.id, candidate.imageUrl)}
              className="bg-red-500 text-white py-1 px-3 rounded-lg"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;
