// This is a demo code file
// Feel free to delete it

/**
 * 增加数据
 * 此处的注释将会自动附带到生成的 API 文档中
 */
export interface ReqAddDcUserTestRulesNumber {
    /** 要增加的消息内容 */
    guild_id:string
    role_id:string
    description: string;
    chain_type: string;
    number:string
}

export interface ResAddDcUserTestRulesNumber {
    /** 服务端内容创建时间 */
    time: Date
}
