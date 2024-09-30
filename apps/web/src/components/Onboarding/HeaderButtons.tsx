import { getCrowdinTranslations, getLocale } from "@rayo/localisation/server";
import { IconButton } from "@rayo/ui/components";
import { ChevronLeft } from "@rayo/ui/icons/ChevronLeft";
import { CloseIcon } from "@rayo/ui/icons/Close";

export const HeaderButtons = async ({
  showBackButton,
  showCloseButton,
}: {
  showBackButton?: boolean;
  showCloseButton?: boolean;
}) => {
  const locale = getLocale();
  const t = await getCrowdinTranslations(locale, ["server-common"]);
  return (
    <div className="mx-6 flex h-[3.75rem]">
      {showBackButton && (
        <IconButton
          className="mr-auto"
          aria-label={t("icon-go-back")}
          variant="secondary"
          Icon={ChevronLeft}
        />
      )}
      {showCloseButton && (
        <IconButton
          className="ml-auto"
          aria-label={t("icon-close")}
          variant="secondary"
          Icon={CloseIcon}
        />
      )}
    </div>
  );
};
