const cowsay = require('cowsay');
module.exports = {
    preset: true,
    alternateParameterPrint: true,
        face: function () {
            let faces = [
                'stegosaurus',
                ];
            return faces[Math.floor(Math.random()*faces.length)];
        }(),
    activity:function(){
    let activities = [cowsay.say,cowsay.think];
    return activities[Math.floor(Math.random()*activities.length)];
    }(),
    registerGlobal:true
};