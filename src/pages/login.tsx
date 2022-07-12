import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Redirection } from '../components/Redirection';

const VerifyToken = dynamic(() => import('../components/VerifyToken'), {
  ssr: false,
});
const LoginForm = dynamic(() => import('../components/LoginForm'), {
  ssr: false,
});

function LoginPage() {
  const router = useRouter();

  const hash = router.asPath.split('#token=')[1];

  return (
    <div className="w-full min-h-screen bg-gray-200 p-20">
      <div className="bg-white w-1/2 px-8 pt-6 pb-8 shadow-lg rounded m-auto">
        {hash ? <VerifyToken hash={hash} /> : <LoginForm />}
      </div>
      <Redirection />
    </div>
  );
}

export default LoginPage;
