import * as JWT from 'jsonwebtoken';

const TEN_MINUTES: string = '10m';

class JwtSignProcessor {
    static sign(payload: any, globalSecretKey: string): string {
        let signedToken: string = '';
        let validationStatus = globalSecretKey && payload;

        if (!validationStatus) {
            throw new Error('Invalid Global Secret Key (or) Payload Specified!');
        }

        signedToken = JWT.sign(payload, globalSecretKey, {
            expiresIn: TEN_MINUTES
        });

        return signedToken;
    }
}

export default JwtSignProcessor;
