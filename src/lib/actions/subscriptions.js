import { serverMutation } from "../core/server";

export const createSubscription = async (data) => {
    const res = await serverMutation('/api/subscriptions', data);
    return res;
};