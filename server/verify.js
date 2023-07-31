import jwt from 'jsonwebtoken'

export default function verify (req,res,next) {
    const token = req.header('token');
    if(!token) return res.status(401).send({message: 'Access Denied'});
    jwt.verify(token, process.env.TOKEN_SECRET, (err,user) => {
        if(err) return res.sendStatus(403);
        req.id = user.id;
        next();
    });
}
