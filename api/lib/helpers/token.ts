import * as bcrypt from 'bcrypt'


export const UniqueTokenHash = (text: String): String => {
    // Generate Unique id
    return bcrypt.hashSync(text, 10);
}

export const UniqueTokenDecode = (text: String) => {
    // Generate Unique id

}