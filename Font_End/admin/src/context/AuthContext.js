import { createContext, useReducer } from 'react';

const INITIAL_STATE = {
  user: null,          // Trạng thái ban đầu của người dùng (chưa đăng nhập)
  loading: false,      // Trạng thái ban đầu cho việc tải dữ liệu
  error: null,         // Trạng thái ban đầu cho thông báo lỗi
};

// Tạo AuthContext
export const AuthContext = createContext(INITIAL_STATE);
/* AuthContext là một context React được tạo bằng createContext. Nó sẽ lưu trữ trạng thái đăng nhập của người dùng và cung cấp cho các thành phần con.
AuthReducer là một hàm reducer, được sử dụng để thay đổi trạng thái dựa trên các hành động (action) như "LOGIN_START", "LOGIN_SUCCESS", "LOGIN_FAILURE", "LOGOUT". Đây là nơi bạn quyết định cách cập nhật trạng thái của ứng dụng.
AuthContextProvider là một thành phần gốc của ứng dụng mà bạn sẽ bọc bên ngoài ứng dụng của bạn. Nó cung cấp trạng thái và hàm dispatch thông qua context cho toàn bộ ứng dụng.*/
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,    // Đặt người dùng thành null khi đăng nhập bắt đầu
        loading: true, // Đặt trạng thái loading là true
        error: null,   // Đặt lỗi thành null
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload, // Đặt người dùng thành dữ liệu đã đăng nhập
        loading: false,       // Kết thúc việc tải
        error: null,          // Đặt lỗi thành null
      };
    case "LOGIN_FAILURE":
      return {
        user: null,           // Đặt người dùng thành null vì đăng nhập thất bại
        loading: false,       // Kết thúc việc tải
        error: action.payload, // Lưu thông báo lỗi
      };
    case "LOGOUT":
      return {
        user: null,           // Đặt người dùng thành null khi đăng xuất
        loading: false,       // Kết thúc việc tải
        error: action.payload, // Lưu thông báo lỗi (nếu có)
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(state.user));
  // }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
