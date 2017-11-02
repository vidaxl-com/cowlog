const cowsay = require('cowsay')
module.exports = exports = {
  preset: true,
  alternateParameterPrint: false,
  alternateParameterHeadPrint: true,
  alternateParameterFootPrint: true,
  face: (function () {
    /*
    Some cartoons in the cowsay library does not look appropriate in a professional environment, or against
    the views of the author of the cowlog library.
    */
    let faces = [
      'beavis.zen', 'bong', 'bud-frogs', 'bunny', 'cheese', 'cower', 'daemon', 'doge', 'default',
      'doge', 'dragon', 'dragon-and-cow', 'elephant', 'elephant-in-snake', 'eyes', 'flaming-sheep',
      'ghostbusters', 'goat', /* 'head-in' */ 'hedgehog', 'hellokitty', /* 'kiss' */ 'kitty', 'koala', 'kosh',
      'luke-koala', 'mech-and-cow', 'meow', /* 'milk' */ 'moofasa', 'moose', /* 'mutilated' */ 'ren',
      'satanic', 'sheep', 'skeleton', 'small', /* 'sodomized' */ 'squirrel', 'stegosaurus', 'stimpy',
      /* 'supermilker' */ 'surgery', /* 'telebears' */ 'turkey', 'turtle', 'tux', 'vader', 'vader-koala',
      'whale', 'www'
    ]

    return faces[Math.floor(Math.random() * faces.length)]
  }()),
  activity: (function () {
    let activities = [cowsay.say, cowsay.think]

    return activities[Math.floor(Math.random() * activities.length)]
  }()),
  registerGlobal: true
}
