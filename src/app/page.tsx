'use client';

import { Button } from '@/components/ui/button';
import React from 'react';

import { useAuthActions } from '@convex-dev/auth/react';

const Home = () => {
  /**
   * === STATES ===
   */
  const { signOut } = useAuthActions();

  return (
    <div>
      <span> Login In</span>

      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
};

export default Home;
