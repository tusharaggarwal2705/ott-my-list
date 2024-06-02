export const PAGE_SIZE = 10;

export const getSkipLimit = (page = 1, pageSize?: number) => {
  const skip = (page - 1) * PAGE_SIZE;
  const limit = pageSize | PAGE_SIZE;
  return { skip, limit };
};
