import axios, { Method } from "axios";
import urljoin from "url-join";

export class SFW {
    public static async background(): Promise<Response> {
        return (await sendReq("/img/sfw/background/img"));
    }

    public static async bite(): Promise<Response> {
        return (await sendReq("/img/sfw/bite/gif"));
    }

    public static async blush(): Promise<Response> {
        return (await sendReq("/img/sfw/blush/gif"));
    }

    public static async cry(): Promise<Response> {
        return (await sendReq("/img/sfw/cry/gif"));
    }

    public static async cuddle(): Promise<Response> {
        return (await sendReq("/img/sfw/cuddle/gif"));
    }

    public static async dance(): Promise<Response> {
        return (await sendReq("/img/sfw/dance/gif"));
    }

    public static async eevee(type?: ImageType): Promise<Response> {
        return (await sendReq(`/img/sfw/dance/${type ? type.type : "gif"}`));
    }

    public static async feed(): Promise<Response> {
        return (await sendReq("/img/sfw/feed/gif"));
    }

    public static async fluff(): Promise<Response> {
        return (await sendReq("/img/sfw/fluff/gif"));
    }

    public static async holo(): Promise<Response> {
        return (await sendReq("/img/sfw/holo/img"));
    }

    public static async hug(): Promise<Response> {
        return (await sendReq("/img/sfw/hug/gif"));
    }

    public static async icon(): Promise<Response> {
        return (await sendReq("/img/sfw/icon/gif"));
    }

    public static async kiss(): Promise<Response> {
        return (await sendReq("/img/sfw/kiss/gif"));
    }

    public static async kitsune(): Promise<Response> {
        return (await sendReq("/img/sfw/kitsune/img"));
    }

    public static async lick(): Promise<Response> {
        return (await sendReq("/img/sfw/lick/gif"));
    }

    public static async neko(type?: ImageType): Promise<Response> {
        return (await sendReq(`/img/sfw/neko/${type ? type.type : "gif"}`));
    }

    public static async okami(): Promise<Response> {
        return (await sendReq("/img/sfw/okami/img"));
    }

    public static async pat(): Promise<Response> {
        return (await sendReq("/img/sfw/pat/gif"));
    }

    public static async poke(): Promise<Response> {
        return (await sendReq("/img/sfw/poke/gif"));
    }

    public static async senko(): Promise<Response> {
        return (await sendReq("/img/sfw/senko/gif"));
    }

    public static async slap(): Promise<Response> {
        return (await sendReq("/img/sfw/slap/gif"));
    }

    public static async smile(): Promise<Response> {
        return (await sendReq("/img/sfw/smile/gif"));
    }

    public static async tail(): Promise<Response> {
        return (await sendReq("/img/sfw/tail/gif"));
    }

    public static async tickle(): Promise<Response> {
        return (await sendReq("/img/sfw/tickle/gif"));
    }
}

export class NSFW {
    public static async anal(): Promise<Response> {
        return (await sendReq("/img/sfw/anal/gif"));
    }
    
    public static async boobjob(): Promise<Response> {
        return (await sendReq("/img/sfw/boobjob/gif"));
    }

    public static async cum(): Promise<Response> {
        return (await sendReq("/img/sfw/cum/gif"));
    }

    public static async fuck(): Promise<Response> {
        return (await sendReq("/img/sfw/fuck/gif"));
    }

    public static async neko(type?: ImageType): Promise<Response> {
        return (await sendReq(`/img/sfw/neko/${type ? type.type : "gif"}`));
    }

    public static async pussylick(): Promise<Response> {
        return (await sendReq("/img/sfw/pussylick/gif"));
    }

    public static async solo(): Promise<Response> {
        return (await sendReq("/img/sfw/solo/gif"));
    }

    public static async threesome_fff(): Promise<Response> {
        return (await sendReq("/img/sfw/threesome_fff/gif"));
    }

    public static async threesome_ffm(): Promise<Response> {
        return (await sendReq("/img/sfw/threesome_ffm/gif"));
    }

    public static async threesome_mmf(): Promise<Response> {
        return (await sendReq("/img/sfw/threesome_mmf/gif"));
    }

    public static async yaoi(): Promise<Response> {
        return (await sendReq("/img/sfw/yaoi/gif"));
    }

    public static async yuri(): Promise<Response> {
        return (await sendReq("/img/sfw/yuri/gif"));
    }
}

export async function quote(fields: QuoteField): Promise<Response> {
    return (await sendReq("/quote", fields, "POST"));
}

export async function status(fields: StatusField): Promise<Response> {
    return (await sendReq("/status", fields, "POST"));
}

export interface ImageType {
    type?: "img" | "gif"
}

export interface Response {
    error?: boolean,
    link?: string,
    time?: number,
    message?: string,
    details?: ResponseDetail
}

export interface ResponseDetail {
    path?: string,
    content_type?: string,
    user_agent?: string
}

export interface QuoteField {
    avatar?: string,
    message?: string,
    nameColor?: string,
    dateFormat?: string,
    username?: string
}

export interface StatusField {
    avatar?: string,
    mobile?: boolean,
    status?: string
}

const BASE_URL: string = "https://purrbot.site/api";

async function sendReq(endpoint: string, fields: any = {}, method: Method = "GET"): Promise<Response> {
    const link: string = urljoin(BASE_URL, endpoint);
    const data: any = await (await axios.get(link, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Cache-Control": "no-cache"
        },
        data: fields ? fields : {}
    })).data;
    if (data.error) {
        return {
            details: {
                path: data.details.path,
                content_type: data.details["content-type"],
                user_agent: data.details["user-agent"]
            },
            error: data.error,
            message: data.message
        }
    } else return {
        error: data.error,
        link: data.link,
        time: data.time
    };
}