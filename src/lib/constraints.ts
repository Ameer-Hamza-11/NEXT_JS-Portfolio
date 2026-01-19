export const SESSION_LIFETIME = 30 * 24 * 60 * 60;
export const SESSION_REFRESH_TIME = SESSION_LIFETIME / 2;

export const blogTypes = ["blog", "project"] as const;
export const blogStatus = ["draft", "published"] as const;

export const slugify = (text: string) => {
    return text.trim().toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
}