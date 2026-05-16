"use client";

import { usePathname } from "next/navigation";
import { AnnouncementBar } from "./announcement-bar";
import { Header } from "./header";
import { Footer } from "./footer";
import { CartProvider, useCart } from "./cart-provider";
import { WishlistProvider, useWishlist } from "./wishlist-provider";
import { QuickViewProvider } from "./quick-view-provider";
import { AuthProvider } from "./auth-provider";
import { SellerBoostPopup } from "./seller-boost-popup";

function StoreShell({ children }: { children: React.ReactNode }) {
  const { openCart, itemCount } = useCart();
  const { wishlistItems } = useWishlist();

  return (
    <>
      <AnnouncementBar />
      <Header onCartOpen={openCart} cartCount={itemCount} wishlistCount={wishlistItems.length} />
      <main className="flex-1">{children}</main>
      <Footer />
      <SellerBoostPopup />
    </>
  );
}

function ShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSellerRoute = pathname?.startsWith("/seller");

  if (isSellerRoute) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <CartProvider>
      <WishlistProvider>
        <QuickViewProvider>
          <StoreShell>{children}</StoreShell>
        </QuickViewProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ShellInner>{children}</ShellInner>
    </AuthProvider>
  );
}
