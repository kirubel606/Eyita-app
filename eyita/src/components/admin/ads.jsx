import React, { useState, useEffect } from 'react';
import api from '../../context/axiosInstance';

function Ads() {
  const [advert, setAdvert] = useState({
    adSlot1: '',
    adSlot2: '',
    adSlot3: '',
    adClient: ''
  });
  const [showModal, setShowModal] = useState(false);

  // Fetch the advert data when the component mounts (Only for existing advert details)
  useEffect(() => {
    const fetchAdvert = async () => {
      try {
        const response = await api.get('/adverts');
        // If the response contains an advert, update the state
        if (response.data) {
          setAdvert(response.data);
        }
      } catch (error) {
        console.error("Error fetching advert:", error);
      }
    };
    fetchAdvert();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdvert((prev) => ({ ...prev, [name]: value }));
  };

  // Submit the advert data to the backend (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send PUT request to the backend
      const response = await api.put('/4', advert);
      alert(response.status === 200 ? "Ad details updated successfully." : "Ad created successfully.");
      setShowModal(false); // Close the modal after submission
    } catch (error) {
      console.error("Error saving advert:", error);
      alert("Failed to save ad details.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage AdSense Links</h1>

      {/* Table to display current links */}
      <table className="min-w-full bg-white shadow-md rounded-lg mb-4">
        <thead>
          <tr>
            <th className="py-2 px-4">Ad Slot 1</th>
            <th className="py-2 px-4">Ad Slot 2</th>
            <th className="py-2 px-4">Ad Slot 3</th>
            <th className="py-2 px-4">Ad Client</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border">{advert.adSlot1}</td>
            <td className="py-2 px-4 border">{advert.adSlot2}</td>
            <td className="py-2 px-4 border">{advert.adSlot3}</td>
            <td className="py-2 px-4 border">{advert.adClient}</td>
          </tr>
        </tbody>
      </table>

      {/* Button to open modal */}
      <button onClick={() => setShowModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded shadow">
        Edit Links
      </button>

      {/* Modal to edit links */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Edit AdSense Links</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Ad Slot 1</label>
                <input
                  type="text"
                  name="adSlot1"
                  value={advert.adSlot1}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Ad Slot 2</label>
                <input
                  type="text"
                  name="adSlot2"
                  value={advert.adSlot2}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Ad Slot 3</label>
                <input
                  type="text"
                  name="adSlot3"
                  value={advert.adSlot3}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Ad Client</label>
                <input
                  type="text"
                  name="adClient"
                  value={advert.adClient}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-3 bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ads;
