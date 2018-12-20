export function checkEmailExists() {
    return {
        types: ['CHECK_EMAIL_EXISTS'],
        payload: {
            request: {
                url: '/checkEmail'
            }
        }
    };
}
//# sourceMappingURL=AuthActions.js.map