import SignUp from './signup/page'
import Login from './login/page'
import { Toaster } from 'react-hot-toast';
export default function Home() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <Login/>
    </>
  );
}
