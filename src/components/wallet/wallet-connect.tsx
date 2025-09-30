'use client';

import { useWallet } from '@/context/wallet-context';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Wallet } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from '../ui/avatar';

export default function WalletConnect() {
  const { walletAddress, isConnected, connectWallet, disconnectWallet } = useWallet();

  if (isConnected && walletAddress) {
    const truncatedAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Avatar className='h-6 w-6'>
                <AvatarFallback className='bg-primary/20 text-primary'>
                    <Wallet className='h-4 w-4'/>
                </AvatarFallback>
            </Avatar>
            <span className='font-mono'>{truncatedAddress}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>Connected</p>
                <p className='text-xs leading-none text-muted-foreground font-mono'>{truncatedAddress}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={disconnectWallet}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button onClick={connectWallet}>
        <LogIn className="mr-2 h-4 w-4" />
        Connect Wallet
    </Button>
  );
}
