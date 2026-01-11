import NavbarWrapper from "@/features/users/components/NavbarWrapper";
import Footer from "@/features/users/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full min-h-screen flex flex-col bg-neutral-50 text-neutral-600">
    <NavbarWrapper />

      <div className="pt-[8ch]">{children}</div>
      <Footer/>
    </main>
  );
}
