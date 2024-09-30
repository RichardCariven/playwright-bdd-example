import { listenApi, type LapiSchema } from "../..";
import { handleError } from "../helix/handleError";

export const getAggregatorBrand = async ({
  aggregatorBrandCode,
}: {
  aggregatorBrandCode: string;
}) => {
  const oneHour = 3600;
  try {
    const { data, error: brandsError } = await listenApi.GET(
      "/aggregatorbrands",

      {
        params: {
          query: {
            // @ts-expect-error filter needs update in spec
            "_filter[AggregatorBrandCode]": aggregatorBrandCode,
          },
        },
        next: { revalidate: oneHour },
      },
    );

    // @ts-expect-error /aggregatorbrands incorrect typing. More detail on PLS 721
    const brands:
      | LapiSchema.components["schemas"]["AggregatorBrand"][]
      | undefined = data;

    if (brandsError || !brands?.length) {
      throw new Error("LAPI -> /aggregatorbrands request failed");
    }

    return brands[0];
  } catch (error) {
    handleError({
      message: "Error in getBrands",
      error,
    });
  }
};
