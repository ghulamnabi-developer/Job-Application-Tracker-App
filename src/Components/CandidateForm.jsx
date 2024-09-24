import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { storage, db } from '../firebase'; // Your Firebase config
import { v4 as uuid } from 'uuid';

const CandidateForm = () => {
  const [candidate, setCandidate] = useState({
    name: '',
    email: '',
    address: '',
    picture: null,
  });
  const [loading, setLoading] = useState(false); // Loading state to manage the form

  const handleInputChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCandidate({ ...candidate, picture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when the form is submitted

    try {
      let imageUrl = '';

      if (candidate.picture) {
        // Upload image to Firebase Storage
        const imageRef = ref(storage, `candidates/${uuid()}_${candidate.picture.name}`); // Use UUID for unique names
        const snapshot = await uploadBytes(imageRef, candidate.picture);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Save candidate data to Firestore in Native mode
      await addDoc(collection(db, 'candidates'), {
        name: candidate.name,
        email: candidate.email,
        address: candidate.address,
        imageUrl: imageUrl, // Store image URL in Firestore
      });

      // Show success alert once everything is done
      alert('Candidate added successfully!');

      // Reset form fields after successful submission
      setCandidate({
        name: '',
        email: '',
        address: '',
        picture: null,
      });
    } catch (error) {
      console.error('Error adding candidate:', error);
      alert('Failed to add candidate. Please try again.'); // Show error alert
    } finally {
      setLoading(false); // Stop loading and enable form fields again
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Add New Candidate</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            value={candidate.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            value={candidate.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            value={candidate.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Picture</label>
          <input
            type="file"
            className="w-full"
            onChange={handleFileChange}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading} // Disable the button when loading
        >
          {loading ? 'Adding...' : 'Add Candidate'}
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;
