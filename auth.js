require("dotenv").config();

exports.authHelper = (role) => {
    return async (req, res, next) => {
        try
        {
            const authToken = req.headers.authorization.split(" ")[1];
            console.log(authToken)
            const decodetoken = jwt.verify(authToken, process.env.JWT_SECRET);
            const userResult = await pool.query('SELECT * FROM users_table WHERE username = $1', [decodetoken.username]);
            const user = userResult.rows[0]
            console.log(user.role)
            console.log(role)
            if (user.role != role)
            {
                return res.status(401).send("You are not authorized");
            }
            req.user = user;
            next();
        }
        catch (error)
        {
            return res.status(401).send("User Unauthorized");
        }
    }
}

