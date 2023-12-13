import React, { useEffect } from 'react';
import { useAuth } from 'containers/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const auth = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (auth) {
      // Gọi hàm logout từ auth context để đăng xuất
      auth.logout();
    }

    // Điều hướng người dùng đến trang chính sau khi đăng xuất
    navigate('/');
  }, [auth, navigate]);

  return (
    <div>
      <p>Đang đăng xuất...</p>
    </div>
  );
}

export default Logout;
