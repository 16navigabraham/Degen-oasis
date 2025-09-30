
'use client';

import { useWallet } from '@/context/wallet-context';
import { Button } from '@/components/ui/button';
import { Copy, KeyRound, Loader2, LogOut, Wallet } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function WalletConnect() {
  const { walletAddress, isConnected, isConnecting, connectWallet, disconnectWallet } = useWallet();
  const { toast } = useToast();

  const copyToClipboard = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast({
        description: "Address copied to clipboard!",
      });
    }
  };

  if (isConnecting) {
    return (
      <Button disabled variant="outline" className="flex items-center gap-2">
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        Connecting...
      </Button>
    )
  }

  if (isConnected && walletAddress) {
    const truncatedAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 border-green-500/50 hover:border-green-500/80">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className='font-mono text-sm'>{truncatedAddress}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-2'>
                <div className='flex items-center gap-3'>
                  <Avatar className='h-10 w-10'>
                      <AvatarFallback className='bg-primary/20 text-primary'>
                          <Wallet className='h-5 w-5'/>
                      </AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col'>
                    <p className='text-sm font-medium leading-none'>Degen Wallet</p>
                    <p className='text-xs leading-none text-muted-foreground mt-1'>{truncatedAddress}</p>
                  </div>
                </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={copyToClipboard} className='gap-2 cursor-pointer'>
            <Copy />
            <span>Copy Address</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={disconnectWallet} className='gap-2 cursor-pointer text-red-500/80 hover:!text-red-500'>
            <LogOut/>
            <span>Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button onClick={connectWallet} className={cn(
      "relative overflow-hidden rounded-md p-[1px]",
      "transition-all duration-300 ease-in-out bg-background hover:bg-opacity-80"
    )}>
      <span className="absolute inset-[-1000%] animate-rainbow-spin bg-[conic-gradient(from_90deg_at_50%_50%,#a855f7_0%,#06b6d4_50%,#ec4899_100%)]" />
      <div className={cn(
        "relative z-10 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors",
        "bg-background text-foreground hover:bg-background/80",
        "w-full h-full px-4 py-2 gap-2 rounded-[calc(var(--radius)-1px)]"
      )}>
        <KeyRound />
        Connect Wallet
      </div>
    </Button>
  );
}
