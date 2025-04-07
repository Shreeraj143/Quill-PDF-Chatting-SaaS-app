import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-300 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href={"/"} className="flex z-40 font-semibold">
            <span>quill.</span>
          </Link>

          {/* Todo: Add mobile navbar */}

          <div className="hidden items-center space-x-4 sm:flex text-sm font-medium">
            <>
              <Link
                href={"/pricing"}
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Pricing
              </Link>

              <SignedOut>
                <SignInButton forceRedirectUrl={"/dashboard"} />
              </SignedOut>

              <SignedOut>
                <Link
                  href={"/sign-up"}
                  className={buttonVariants({
                    size: "sm",
                  })}
                >
                  Get Started
                  <ArrowRight />
                </Link>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
