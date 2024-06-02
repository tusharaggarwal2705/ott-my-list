import { PAGE_SIZE } from "./constant";

export const getSkipLimit = (page: number = 1, pageSize? :number) =>{
    const skip = (page - 1) * PAGE_SIZE;
    const limit = pageSize | PAGE_SIZE;
    return {skip , limit}
}