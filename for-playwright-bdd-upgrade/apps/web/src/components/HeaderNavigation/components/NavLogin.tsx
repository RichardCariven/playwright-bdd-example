import React from "react";

import { useCrowdin } from "@rayo/localisation";
import {
  PremiumUserFilledIcon,
  PremiumUserIcon,
} from "@rayo/ui/icons/PremiumUser";
import { ProfileFilledIcon, ProfileIcon } from "@rayo/ui/icons/Profile";
import { cn } from "@rayo/ui/tailwind/utils/cn";
import {
  Menu,
  MenuItem,
  MenuItems,
  MenuLink,
  MenuPopover,
} from "@reach/menu-button";
import { signIn } from "@web/actions/signIn";
import { signOut } from "@web/actions/signOut";

import NavButtonItem from "./NavButtonItem";
import NavProfileButton from "./NavProfileButton";

export type NavLoginType = {
  premiumUser?: boolean;
  helloName?: string;
  loggedIn?: boolean;
};

export default function NavLogin({
  premiumUser,
  loggedIn,
  helloName,
}: NavLoginType) {
  const t = useCrowdin(["client-common"]);

  if (!loggedIn) {
    return (
      <NavButtonItem
        label={t("nav-login")}
        Icon={ProfileIcon}
        IconHover={ProfileFilledIcon}
        onClick={() => signIn()}
      />
    );
  }

  const menuItemClassNames =
    "cursor-pointer text-nowrap px-4 py-3 text-right text-neutral body-s-medium [&[data-selected]]:bg-neutral-light";

  return (
    <Menu>
      {({ isExpanded }) => (
        <>
          <NavProfileButton
            className={cn("peer max-w-[180px]", isExpanded && "isExpanded")}
            label={t("nav-login-user", { name: helloName ?? "" })}
            ariaLabel={t("nav-profile-menu-sr", { name: helloName ?? "" })}
            Icon={premiumUser ? PremiumUserIcon : ProfileIcon}
            IconHover={premiumUser ? PremiumUserFilledIcon : ProfileFilledIcon}
          />
          <MenuPopover
            data-testid="profile-menu-portal"
            position={(btn, nav) =>
              btn && nav
                ? {
                    position: "fixed",
                    top: `${btn.top + btn.height}px`,
                    left: `${btn.right - nav.width}px`,
                  }
                : {}
            }
          >
            <MenuItems className="mt-2 grid min-w-[200px] animate-slide-down overflow-hidden rounded-xl bg-neutral-invert py-2 shadow-lg outline-none motion-reduce:animate-none">
              <MenuLink className={menuItemClassNames}>
                {t("nav-account-settings")}
              </MenuLink>
              <MenuItem
                className={menuItemClassNames}
                onSelect={() => signOut()}
              >
                {t("nav-sign-out")}
              </MenuItem>
            </MenuItems>
          </MenuPopover>
        </>
      )}
    </Menu>
  );
}
