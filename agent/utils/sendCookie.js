export const sendCookie = (agentToken, res) => {

    res.cookie('agentJwt', agentToken, {
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
        secure : true,
        sameSite : "None"
    })

}