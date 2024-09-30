/**
 * This function leave original transformations untouched.
 * Adding new transformations after original transformations in separate url segment
 *
 * Example paths:
 *
 * c_crop,g_custom/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png --> c_crop,g_custom/<NEW TRANSFORMATIONS>/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png
 * c_crop,g_custom/v1678797597/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png --> c_crop,g_custom/<NEW TRANSFORMATIONS>/v1678797597/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png
 * t_presenter_square/shows/apd859c4sg8472cdbhbj.jpg --> t_presenter_square/<NEW TRANSFORMATIONS>/shows/apd859c4sg8472cdbhbj.jpg
 * v1678797597/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png --> <NEW TRANSFORMATIONS>/v1678797597/brand_manager/stations/gndtwqpmszc1rvqo2hgr.png
 * tracks/46307.jpg --> <NEW TRANSFORMATIONS>/tracks/46307.jpg
 */

export function insertCloudinaryTransformations(src: string, props: string[]) {
  const cloudinaryBase = "https://media.bauerradio.com/image/upload/";
  const [, path] = src.split(cloudinaryBase);
  const urlSegments = path.split("/");
  const transformationsRegex =
    /(w_|h_|l_|a_|b_|e_|g_|o_|r_|x_|y_|z_|q_|f_|m_|t_|usm_|ar_|bo_|dpr_|fp_|gsm_|ht_|fl_|pg_)/;

  let lastTransformationsSegment = 0;

  urlSegments.forEach((segment, index) => {
    if (transformationsRegex.test(segment)) {
      lastTransformationsSegment = index + 1;
    }
  });

  urlSegments.splice(lastTransformationsSegment, 0, props.join(","));

  return cloudinaryBase + urlSegments.join("/");
}
