import { Option } from "$core";

export interface TryInto<T> {
    try_into(): Option<T>;
}
