import React, { useState, useEffect } from 'react';
import api from '../../context/axiosInstance';

function Promo() {
  const [promos, setPromos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promoForm, setPromoForm] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    startDate: '',
    endDate: '',
    priority: ''
  });
  const [editingPromoId, setEditingPromoId] = useState(null);

  useEffect(() => {
    fetchPromos();
  }, []);

  // Fetch all promos
  const fetchPromos = async () => {
    try {
      const response = await api.get('/promos');
      setPromos(response.data);
    } catch (error) {
      console.error("Error fetching promos:", error);
    }
  };

  // Open the modal for adding/editing
  const openModal = (promo = null) => {
    if (promo) {
      setPromoForm(promo);
      setEditingPromoId(promo._id);
    } else {
      setPromoForm({
        title: '',
        description: '',
        image: '',
        link: '',
        startDate: '',
        endDate: '',
        priority: ''
      });
      setEditingPromoId(null);
    }
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromoForm({ ...promoForm, [name]: value });
  };

  // Add or update promo
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPromoId) {
        // Update promo
        await api.put(`/promos/${editingPromoId}`, promoForm);
      } else {
        // Add new promo
        await api.post('/promos', promoForm);
      }
      fetchPromos();
      closeModal();
    } catch (error) {
      console.error("Error submitting promo form:", error);
    }
  };

  // Delete a promo
  const handleDelete = async (id) => {
    try {
      await api.delete(`/promos/${id}`);
      fetchPromos();
    } catch (error) {
      console.error("Error deleting promo:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Promotions</h1>
      <button
        onClick={() => openModal()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Add Promo
      </button>

      {/* Table of promos */}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Title</th>
            <th className="py-2 px-4 border">Description</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {promos.map((promo) => (
            <tr key={promo._id}>
              <td className="py-2 px-4 border">{promo.title}</td>
              <td className="py-2 px-4 border">{promo.description}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => openModal(promo)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(promo._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/editing promos */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-lg font-bold mb-4">{editingPromoId ? 'Edit Promo' : 'Add Promo'}</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                name="title"
                value={promoForm.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="text"
                name="description"
                value={promoForm.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="text"
                name="image"
                value={promoForm.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="text"
                name="link"
                value={promoForm.link}
                onChange={handleInputChange}
                placeholder="Link"
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="date"
                name="startDate"
                value={promoForm.startDate}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="date"
                name="endDate"
                value={promoForm.endDate}
                onChange={handleInputChange}
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="number"
                name="priority"
                value={promoForm.priority}
                onChange={handleInputChange}
                placeholder="Priority"
                className="w-full mb-4 p-2 border rounded"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  {editingPromoId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Promo;
