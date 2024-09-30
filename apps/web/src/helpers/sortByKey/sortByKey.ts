export const sortByKey = <T>(
  items: T[],
  order: (number | string)[],
  key: keyof T,
) => {
  return items.sort((a, b) => {
    const indexA = order.indexOf(a[key] as string | number);
    const indexB = order.indexOf(b[key] as string | number);

    return (
      (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB)
    );
  });
};
