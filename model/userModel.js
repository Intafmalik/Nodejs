module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define("user",{
        name:{
            type : DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type : DataTypes.TEXT,
            allowNull:false
        },
        message:{
            type : DataTypes.STRING,
            allowNull:false
        },
    })
    return User;
}





