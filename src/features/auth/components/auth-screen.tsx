'use client';

import React from 'react';
import { AuthFlow } from '../types';
import { SignInCard } from './sign-in-card';
import { SignUpCard } from './sign-up-card';

export const AuthScreen = () => {
  /**
   * === STATES ===
   */
  const [authState, setAuthState] = React.useState<AuthFlow>('signIn');

  return (
    <div className='h-full flex items-center justify-center bg-[#5C3B58]'>
      <div className='md:h-auto md:w-[420px]'>
        {authState === 'signIn' ? (
          <SignInCard setAuthState={setAuthState} authState={authState} />
        ) : (
          <SignUpCard setAuthState={setAuthState} authState={authState} />
        )}
      </div>
    </div>
  );
};
