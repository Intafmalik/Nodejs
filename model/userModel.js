module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define("user",{
        username:{
            type : DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type : DataTypes.TEXT,
            allowNull:false
        },
        password:{
            type : DataTypes.STRING,
            allowNull:false
        },
        otp:{
            type:DataTypes.STRING
        },
        otpExpireTime:{
            type:DataTypes.STRING
        }
    })
    return User;
}





