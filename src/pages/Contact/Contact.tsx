import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e : any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e : any) => {
    e.preventDefault();
    setShowModal(true); 
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false); 
      }, 2000);

      return () => clearTimeout(timer); 
    }
  }, [showModal]);

  return (
    <div className="pt-24 pb-12 bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className='text-center my-16 font-medium text-4xl text-white'>LIÊN HỆ</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-300 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Gửi tin nhắn</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Họ tên</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Nhập họ tên'
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Nhập email'
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Nội dung</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder='Nhập tin nhắn'
                //   rows="4"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 w-full"
              >
                Gửi
              </button>
            </form>
          </div>
          
          <div className="bg-gray-300 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
            <img src='https://img.freepik.com/premium-vector/film-production-cinema-logo-design-template_618034-260.jpg' alt='Contact Info' />
            <p className="text-gray-700 mb-2 mt-5">
              <strong>Địa chỉ:</strong> Q7, Thành phố Hồ Chí Minh, Việt Nam
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> contact@example.com
            </p>
            <p className="text-gray-700">
              <strong>Điện thoại:</strong> (123) 456-7890
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-xl text-center">
            <img 
              src='https://freepngimg.com/download/icon/cross/2836-done.png' 
              width={100}
              className="mx-auto mb-4"
              alt="Thank you"
            />
            <p className="text-gray-700">Cảm ơn bạn đã liên hệ với chúng tôi!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
