import { getCurrentUser } from "@/features/auth/server/auth.queries";
import Navbar from "./Navbar";

const NavbarWrapper = async () => {
  const user = await getCurrentUser();

  return <Navbar user={user} />;
};

export default NavbarWrapper;
