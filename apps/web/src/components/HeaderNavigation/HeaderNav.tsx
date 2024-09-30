"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

import { useCrowdin } from "@rayo/localisation";
import { Link, LinkButton } from "@rayo/ui/components";
import { BurgerIcon } from "@rayo/ui/icons/Burger";
import { CloseIcon } from "@rayo/ui/icons/Close";
import { LibraryFilledIcon, LibraryIcon } from "@rayo/ui/icons/Library";
import { PremiumIcon } from "@rayo/ui/icons/Premium";
import { SearchFilledIcon, SearchIcon } from "@rayo/ui/icons/Search";
import Logo from "@rayo/ui/logos/Logo";
import { cn } from "@rayo/ui/tailwind/utils/cn";
import useObserver from "@web/hooks/useObserver/useObserver";

import NavLinkButtonItem from "./components/NavLinkButtonItem";
import NavLinks, { type NavLinksType } from "./components/NavLinks";
import NavLogin, { type NavLoginType } from "./components/NavLogin";

type HeaderNavType = {
  navItems?: NavLinksType["items"];
  login?: NavLoginType;
  premium?: boolean;
};

const navObserver: IntersectionObserverCallback = ([e]) => {
  e.target.classList.toggle("isSticky", e.intersectionRatio < 1);
};

export default function HeaderNav({ login, premium, navItems }: HeaderNavType) {
  // This state is for when <dialog> is not supported by browser
  const [open, setOpen] = useState(false);

  const mainNav = useObserver<HTMLDivElement>(navObserver, { threshold: [1] });
  const mobileNav = useRef<HTMLDialogElement>(null);
  const params = useParams();
  const t = useCrowdin(["client-common"]);

  useEffect(() => {
    closeMobileNav();
  }, [params]);

  function handleMobileNavClick(e: React.MouseEvent<HTMLDialogElement>) {
    const target = e?.target as HTMLDialogElement;
    if (target?.nodeName === "DIALOG") {
      closeMobileNav();
    }
  }

  function openMobileNav() {
    document.body.classList.add("overflow-hidden");
    mobileNav.current?.classList.add("animate-mobile-nav-close");
    if (typeof HTMLDialogElement === "function") {
      mobileNav.current?.showModal();
      return;
    }
    setOpen(true);
  }

  function closeMobileNav() {
    document.body.classList.remove("overflow-hidden");
    if (typeof HTMLDialogElement === "function") {
      mobileNav.current?.close();
      return;
    }
    setOpen(false);
  }

  return (
    <>
      <div
        className={cn(
          "sticky -top-1 z-[999] grid w-full grid-cols-2 items-center px-6 py-5 transition-all",
          "[&.isSticky]:bg-neutral-invert [&.isSticky]:shadow-md",
        )}
        ref={mainNav}
      >
        <div className="grid auto-cols-max grid-flow-col items-center gap-4">
          <Link
            href="/"
            aria-label={t("nav-to-home")}
            title={t("nav-to-home")}
            className="rounded-full p-2"
          >
            <Logo />
          </Link>
          <nav className="hidden auto-cols-max grid-flow-col gap-4 xl:grid">
            <NavLinks items={navItems} />
          </nav>
        </div>
        <div className="grid auto-cols-max grid-flow-col items-center justify-end gap-4">
          {premium && (
            <LinkButton
              size="sm"
              className="hidden grid-flow-col gap-2 xl:grid"
              href="#"
            >
              <PremiumIcon className="size-5" />
              <span>{t("premium-button-label")}</span>
            </LinkButton>
          )}
          <NavLinkButtonItem
            href=""
            label={t("nav-search")}
            Icon={SearchIcon}
            IconHover={SearchFilledIcon}
          />
          <NavLinkButtonItem
            href=""
            label={t("nav-my-library")}
            Icon={LibraryIcon}
            IconHover={LibraryFilledIcon}
          />
          <NavLogin {...login} />
          <button
            onClick={openMobileNav}
            className="xl:hidden"
            aria-label={t("nav-open-menu")}
            title={t("nav-open-menu")}
            data-testid="open-menu"
          >
            <BurgerIcon className="size-7 fill-neutral" />
          </button>
        </div>
      </div>
      <dialog
        onClick={handleMobileNavClick}
        data-testid="mobile-nav"
        ref={mobileNav}
        className={cn(
          "invisible fixed -right-3/4 top-0 z-10 mr-0 block h-full max-h-none w-3/4 max-w-sm bg-neutral-invert shadow-[0_0_0_200vw_rgba(22,14,33,0)] transition-shadow backdrop:opacity-0 open:shadow-[0_0_0_200vw_rgba(22,14,33,0.8)]",
          "open:visible open:animate-mobile-nav-open motion-reduce:animate-none motion-reduce:open:right-0 motion-reduce:open:animate-none",
          open &&
            "visible animate-mobile-nav-open bg-neutral-invert shadow-[0_0_0_200vw_rgba(22,14,33,0.8)]",
        )}
      >
        <div className="grid h-full justify-end gap-10 overflow-auto overscroll-contain px-6 py-6">
          <div className="grid auto-rows-max justify-end">
            <button
              onClick={closeMobileNav}
              aria-label={t("nav-close-menu")}
              title={t("nav-close-menu")}
              data-testid="close-menu"
            >
              <CloseIcon className="size-7 fill-neutral" />
            </button>
          </div>
          <nav className="grid grid-flow-row auto-rows-max gap-9">
            <NavLinks items={navItems} mobile />
          </nav>
          {premium && (
            <div className="grid auto-rows-max justify-end">
              <LinkButton href="#">
                <PremiumIcon className="mr-2 size-5" />
                {t("premium-button-label")}
              </LinkButton>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
