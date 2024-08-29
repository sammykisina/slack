import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AuthFlow } from '../types';
import React from 'react';
import { useAuthActions } from '@convex-dev/auth/react';
import { TriangleAlert } from 'lucide-react';

/**
 * TYPES
 */
interface SignInCardProps {
  setAuthState: (authState: AuthFlow) => void;
  authState: AuthFlow;
}

export const SignInCard = ({ setAuthState, authState }: SignInCardProps) => {
  /**
   * === STATES ===
   */
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [pending, setPending] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const { signIn } = useAuthActions();

  /**
   * === FUNCTIONS ===
   */
  const onSignInWithProvider = async (provider: 'github' | 'google') => {
    setPending(true);
    signIn(provider).finally(() => setPending(false));
  };

  const handleOnPasswordSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setPending(true);
    signIn('password', { email, password, flow: authState })
      .catch((error) => {
        console.error(error);
        setError('Invalid email or password');
      })
      .finally(() => setPending(false));
  };

  return (
    <Card className='w-full h-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      {!!error && (
        <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
          <TriangleAlert className='size-4' />

          <p>{error}</p>
        </div>
      )}

      <CardContent className='space-y-5 px-0 pb-0'>
        <form onSubmit={handleOnPasswordSignIn} className='space-y-2.5'>
          <Input
            disabled={pending}
            value={email}
            placeholder='Email'
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            disabled={pending}
            value={password}
            placeholder='Password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type='submit' className='w-full' size='lg' disabled={pending}>
            Continue
          </Button>
        </form>

        <Separator />

        <div className='flex flex-col gap-y-2.5'>
          <Button
            onClick={() => onSignInWithProvider('google')}
            type='button'
            className='w-full relative'
            size='lg'
            disabled={pending}
            variant='outline'
          >
            <FcGoogle className='size-5 absolute top-2.5 left-3' />
            Continue with Google
          </Button>

          <Button
            onClick={() => onSignInWithProvider('github')}
            type='button'
            className='w-full relative'
            size='lg'
            disabled={pending}
            variant='outline'
          >
            <FaGithub className='size-5 absolute top-2.5 left-3' />
            Continue with Github
          </Button>
        </div>

        <p className='text-xs text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <span
            onClick={() => setAuthState('signUp')}
            className='text-sky-700 hover:underline cursor-pointer'
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
