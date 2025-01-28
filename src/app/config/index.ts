import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.join((process.cwd(), '.env')) });


export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    salt_rounds: process.env.SALT_ROUNDS,
    jwt_token_secret: process.env.JWT_TOKEN_SECRET,
    jwt_refresh_expires_in: process.env.JWT_TOKEN_EXPIRES_IN,

    aamarpay_store_id: process.env.AAMARPAY_STORE_ID,
    aamarpay_signature_key: process.env.AAMARPAY_SIGNATURE_KEY,
    aamarpay_api_url: process.env.AAMARPAY_API_URL,
    aamarpay_success_url: process.env.AAMARPAY_SUCCESS_URL,
    aamarpay_fail_url: process.env.AAMARPAY_FAIL_URL,
    aamarpay_cancel_url: process.env.AAMARPAY_CANCEL_URL,


}