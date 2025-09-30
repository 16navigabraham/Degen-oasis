import Logo from "@/components/ui/logo";
import WalletConnect from "@/components/wallet/wallet-connect";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/30 backdrop-blur-lg">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Logo />
        <WalletConnect />
      </div>
    </header>
  );
}
