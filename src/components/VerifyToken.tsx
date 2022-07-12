import { useRouter } from 'next/router';
import { trpc } from '../utils/trpc';

type Props = {
  hash: string;
};

const VerifyToken: React.FC<Props> = ({ hash }: Props) => {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery(['user.verify-otp', { hash }]);

  if (isLoading) {
    return <p>Verifying...</p>;
  }

  router.push(data?.redirect.includes('login') ? '/' : data?.redirect || '/');

  return <p>Redirecting...</p>;
};

export default VerifyToken;
