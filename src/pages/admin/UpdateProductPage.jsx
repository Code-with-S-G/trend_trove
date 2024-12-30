import React, { useContext, useMemo, useState } from 'react';
import { Plus, RefreshCw, X } from 'lucide-react';
import Layout from '@/components/Layout/Layout';
import myContext from '@/context/myContext';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteDoc, doc, setDoc, Timestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { fireDB } from '@/firebase/FirebaseConfig';

const categoryList = [
  { name: 'Mens wear' },
  { name: 'Womens wear' },
  { name: 'Kids wear' },
  { name: 'Laptops' },
  { name: 'Mobiles' },
  { name: 'Home Appliences' },
  { name: 'Sofas' },
  { name: 'Dinning Tables' },
  { name: 'Beds' },
];

const UpdateProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProduct } = context;
  const [prevCategory, setPrevCategory] = useState('');

  // navigate
  const navigate = useNavigate();
  const { id } = useParams();

  // product state
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    stock: '',
    category: '',
    description: '',
    images: [],

    time: Timestamp.now(),
    date: new Date().toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  const removeImageField = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const updateProductFunction = async (e) => {
    e.preventDefault();
    if (
      formData.title == '' ||
      formData.price == '' ||
      formData.stock == '' ||
      formData.category == '' ||
      formData.description == '' ||
      formData.images[0] == '' ||
      formData.images[1] == '' ||
      formData.images[2] == '' ||
      formData.images[3] == ''
    ) {
      return toast.error('all fields are required');
    }
    setLoading(true);

    try {
      await deleteDoc(doc(fireDB, prevCategory, id));
      await setDoc(doc(fireDB, formData.category, id), formData);
      toast.success('Product updated successfully!');
      navigate('/admin-dashboard');
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Failed to update the product. Please try again!');
    }
  };

  useMemo(() => {
    if (!getAllProduct.length) return;

    const getProduct = getAllProduct.filter((item) => item.id === id);

    if (getProduct.length > 0) {
      setFormData({
        title: getProduct[0]?.title || '',
        price: getProduct[0]?.price || '',
        images: getProduct[0]?.images || [],
        category: getProduct[0]?.category || '',
        description: getProduct[0]?.description || '',
        stock: getProduct[0]?.stock || '',
        time: getProduct[0]?.time || Timestamp.now(),
        date:
          getProduct[0]?.date ||
          new Date().toLocaleString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }),
      });
      setPrevCategory(getProduct[0]?.category || '');
    }
  }, [getAllProduct, id]);

  return (
    <Layout>
      <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900">
        <form onSubmit={updateProductFunction} className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-[#1c1c1c] rounded-xl border border-slate-300 dark:border-slate-600 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6">
              <h2 className="text-3xl font-bold text-white">Update Product</h2>
              <p className="mt-2 text-white opacity-90">Complete the form below to update a product to your inventory</p>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
              {/* Basic Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Product Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900 dark:text-white"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900 dark:text-white"
                  >
                    <option value="">Select a category</option>
                    {categoryList.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500 dark:text-gray-400">₹</span>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full p-2 pl-8 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900 dark:text-white"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Stock Quantity</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900 dark:text-white"
                    placeholder="Enter stock quantity"
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Product Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900 dark:text-white"
                  placeholder="Describe your product..."
                />
              </div>

              {/* Image URLs Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Product Images</label>
                  <button type="button" onClick={addImageField} className="flex items-center gap-2 px-3 py-1 text-sm bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors">
                    <Plus size={16} />
                    Add Image
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {formData.images.map((url, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className="flex-1 p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-400 text-gray-900 dark:text-white"
                        placeholder={`Image URL ${index + 1}`}
                      />
                      {formData.images.length > 0 && (
                        <button type="button" onClick={() => removeImageField(index)} className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">
                          <X size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="p-6 bg-gray-50 dark:bg-gray-700">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-200 transition duration-300"
              >
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw size={20} />
                  <span>Update Product</span>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateProductPage;
