import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'us-east-1_o4rdWPRqb',
    ClientId: '771556cij0bvie8f7lhpavtphd'
};

export default new CognitoUserPool(poolData);