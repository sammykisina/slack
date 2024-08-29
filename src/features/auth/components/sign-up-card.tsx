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
import { TriangleAlert } from 'lucide-react';
import { useAuthActions } from '@convex-dev/auth/react';

/**
 * TYPES
 */
interface SignUpCardProps {
  setAuthState: (authState: AuthFlow) => void;
  authState: AuthFlow;
}

export const SignUpCard = ({ setAuthState, authState }: SignUpCardProps) => {
  /**
   * === STATES ===
   */
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [pending, setPending] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');

  const { signIn } = useAuthActions();

  /**
   * === FUNCTIONS ===
   */
  const onSignUpWithProvider = async (provider: 'github' | 'google') => {
    setPending(true);
    signIn(provider).finally(() => setPending(false));
  };

  const handleOnPasswordSignUp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setPending(true);
    signIn('password', { email, password, flow: authState })
      .catch((error) => {
        console.error(error);
        setError('Something went wrong.');
      })
      .finally(() => setPending(false));
  };

  return (
    <Card className='w-full h-full p-8'>
      <CardHeader className='px-0 pt-0'>
        <CardTitle>Sign up to continue</CardTitle>
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
        <form onSubmit={handleOnPasswordSignUp} className='space-y-2.5'>
          <Input
            disabled={pending}
            value={name}
            placeholder='Name'
            type='name'
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <Input
            disabled={pending}
            value={confirmPassword}
            placeholder='Confirm Password'
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type='submit' className='w-full' size='lg' disabled={pending}>
            Continue
          </Button>
        </form>

        <Separator />

        <div className='flex flex-col gap-y-2.5'>
          <Button
            onClick={() => onSignUpWithProvider('google')}
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
            onClick={() => onSignUpWithProvider('github')}
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
          Already have an account?{' '}
          <span
            onClick={() => setAuthState('signIn')}
            className='text-sky-700 hover:underline cursor-pointer'
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
