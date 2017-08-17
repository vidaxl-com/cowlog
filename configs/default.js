const cowsay = require('cowsay');
module.exports = {
    preset: true,
    alternateParameterPrint: true,
        face: function () {
            let faces = [
                'beavis.zen','bong','bud-frogs','bunny','cheese','cower','daemon','default','doge','dragon',
                'dragon-and-cow','elephant','elephant-in-snake','eyes','flaming-sheep','ghostbusters','goat',
                /*'head-in'*/,'hedgehog','hellokitty',/*'kiss'*/,'kitty','koala','kosh','luke-koala','mech-and-cow','meow',
                'milk','moofasa','moose',/*'mutilated'*/,'ren','satanic','sheep','skeleton','small',/*'sodomized'*/,
                'squirrel','stegosaurus','stimpy','supermilker','surgery','telebears','turkey','turtle','tux',
                'vader','vader-koala','whale','www',
                ];
            return faces[Math.floor(Math.random()*faces.length)];
        }(),
    activity:function(){
    let activities = [cowsay.say,cowsay.think];
    return activities[Math.floor(Math.random()*activities.length)];
    }(),
    registerGlobal:true
};