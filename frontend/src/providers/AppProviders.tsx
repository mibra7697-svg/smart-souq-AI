'use client';

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from '@/providers/AuthProvider';
import { SolanaProvider } from "@/components/web3/SolanaProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider defaultColorScheme="light">
      <Notifications />
      <AuthProvider>
        <SolanaProvider>{children}</SolanaProvider>
      </AuthProvider>
    </MantineProvider>
  );
}
