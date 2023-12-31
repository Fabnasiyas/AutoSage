import {React,useState }from 'react';
import { useNavigate} from 'react-router-dom';
import axios from '../../axios';
import { useDispatch } from 'react-redux';
import {  toast } from 'react-toastify';
import img from '../../assets/car3.webp';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      try {
        const response = await axios.post('/admin/login', { email, password });
        console.log(response.data,'rsp dataa');
        if (!response.data.err) {    
          dispatch({type:'refresh'})        
         return navigate('/admin/home');
        } else {
          toast.error(response.data.message, {
            position :"top-center"
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error('All Fields are required', {
        position :"top-center"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8" style={{
      background: `url(${img})`,
      backgroundSize: '100% auto',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="loginbox py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-10">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
      </div>
          <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit} >
            <div>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder='Email address'
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>
          </div>
      </div>
    </div>
  );
};

export default Login;


