import { headers } from "next/headers";

const IP_HEADER_PRIORITY = [
    "cf-connecting-ip",
    "x-client-ip",
    "x-forwarded-for",
    "x-real-ip",
    "x-cluster-client-ip",
    "forwarded-for",
    "forwarded",
];

export const getIpAddress = async () => {
    const headerLists = await headers()
    for (let header of IP_HEADER_PRIORITY) {
        const value = headerLists.get(header)
        if (typeof value == "string") {
            const ip = value.split(",")[0].trim()
            if (ip) return ip
        }

    }
    return "0.0.0.0"
}