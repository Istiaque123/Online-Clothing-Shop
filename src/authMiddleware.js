import jwt from 'jsonwebtoken';


const authenticateToken = ( req, res, next ) => {

    const authHeader = tokenBal;
    const token = authHeader && authHeader.split( ' ' )[ 1 ];

    if ( !token ) return res.status( 401 ).json( {
        message: 'Access denied. No token provided.'
    } );
    

    jwt.verify( token, 'your_secret_key', ( err, user ) => {
        if ( err ) return res.status( 403 ).json( {
            message: 'Invalid token.'
        } );

        req.user = user;
        next();
    } );
};

export default authenticateToken;