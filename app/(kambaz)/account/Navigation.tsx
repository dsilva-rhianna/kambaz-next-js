"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const pathname = usePathname();

  return (
    <Nav variant="pills">
      {currentUser ? (
        <>
          <NavItem>
            <NavLink as={Link} href="/account/profile" active={pathname.endsWith("profile")}>
              Profile
            </NavLink>
          </NavItem>
          {(currentUser as any)?.role === "ADMIN" && (
            <NavItem>
              <NavLink as={Link} href="/account/users" active={pathname.endsWith("users")}>
                Users
              </NavLink>
            </NavItem>
          )}
        </>
      ) : (
        <>
          <NavItem>
            <NavLink as={Link} href="/account/signin" active={pathname.endsWith("signin")}>
              signin
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink as={Link} href="/account/signup" active={pathname.endsWith("signup")}>
              signup
            </NavLink>
          </NavItem>
        </>
      )}
    </Nav>
  );
}