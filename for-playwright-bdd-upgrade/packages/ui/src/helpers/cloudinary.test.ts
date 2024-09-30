import { insertCloudinaryTransformations } from "./cloudinary";

describe("insertCloudinaryTransformations", () => {
  const newTransformations = ["q_auto", "w_200"];

  it("should add new transformations after original transformations", () => {
    const originalSrc =
      "https://media.bauerradio.com/image/upload/c_crop,g_custom/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png";
    const result = insertCloudinaryTransformations(
      originalSrc,
      newTransformations,
    );
    expect(result).toContain(
      `https://media.bauerradio.com/image/upload/c_crop,g_custom/${newTransformations.join(
        ",",
      )}/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png`,
    );
  });

  it("should add new transformations after multiple original transformations", () => {
    const originalSrc =
      "https://media.bauerradio.com/image/upload/c_crop,g_custom/r_max/f_auto/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png";
    const result = insertCloudinaryTransformations(
      originalSrc,
      newTransformations,
    );
    expect(result).toContain(
      `https://media.bauerradio.com/image/upload/c_crop,g_custom/r_max/f_auto/${newTransformations.join(
        ",",
      )}/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png`,
    );
  });

  it("should add new transformations after original transformations before version", () => {
    const originalSrc =
      "https://media.bauerradio.com/image/upload/c_crop,g_custom/v1678797597/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png";
    const result = insertCloudinaryTransformations(
      originalSrc,
      newTransformations,
    );
    expect(result).toContain(
      `https://media.bauerradio.com/image/upload/c_crop,g_custom/${newTransformations.join(
        ",",
      )}/v1678797597/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png`,
    );
  });

  it("should add new transformations after multiple original transformations before version", () => {
    const originalSrc =
      "https://media.bauerradio.com/image/upload/c_crop,g_custom/r_max/f_auto/v1678797597/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png";
    const result = insertCloudinaryTransformations(
      originalSrc,
      newTransformations,
    );
    expect(result).toContain(
      `https://media.bauerradio.com/image/upload/c_crop,g_custom/r_max/f_auto/${newTransformations.join(
        ",",
      )}/v1678797597/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png`,
    );
  });

  it("should add new transformations if no original transformations is present before version", () => {
    const originalSrc =
      "https://media.bauerradio.com/image/upload/v1678797597/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png";
    const result = insertCloudinaryTransformations(
      originalSrc,
      newTransformations,
    );
    expect(result).toContain(
      `https://media.bauerradio.com/image/upload/${newTransformations.join(
        ",",
      )}/v1678797597/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png`,
    );
  });

  it("should add new transformations if no original transformations is present", () => {
    const originalSrc =
      "https://media.bauerradio.com/image/upload/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png";
    const result = insertCloudinaryTransformations(
      originalSrc,
      newTransformations,
    );
    expect(result).toContain(
      `https://media.bauerradio.com/image/upload/${newTransformations.join(
        ",",
      )}/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png`,
    );
  });
});
