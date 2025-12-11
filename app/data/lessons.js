// app/data/lessons.js

// Map all GIFs here
export const gifMap = {
  //level 1
  hej: require('../../assets/gifs/level_1/hej.gif'),
  hejDa: require('../../assets/gifs/level_1/hej-da.gif'),
  jagHeter: require('../../assets/gifs/level_1/jag-heter.gif'),
  vadHeterDu: require('../../assets/gifs/level_1/vad-heter-du.gif'),
  godMorgon: require('../../assets/gifs/level_1/god-morgon.gif'),
  godNatt: require('../../assets/gifs/level_1/god-natt.gif'),
  trevligtAttTraffas: require('../../assets/gifs/level_1/trevligt-att-traffas.gif'),
  //level 2
  alg: require('../../assets/gifs/level_2/alg-tecken.gif'),
  djur: require('../../assets/gifs/level_2/djur-tecken.gif'),
  fågel: require('../../assets/gifs/level_2/fågel-tecken.gif'),
  fisk: require('../../assets/gifs/level_2/fisk-tecken.gif'),
  hast: require('../../assets/gifs/level_2/hast-tecken.gif'),
  hund: require('../../assets/gifs/level_2/hund-tecken.gif'),
  husdjur: require('../../assets/gifs/level_2/husdjur-tecken.gif'),
  kanin: require('../../assets/gifs/level_2/kanin-tecken.gif'),
  katt: require('../../assets/gifs/level_2/katt-tecken.gif'),
  
}

export const lessonsData = [
  {
    id: 1,
    title: 'Level 1', //Hälsningsfraser
    description: 'Hälsningsfraser!',
    lessons: [
      { type: 'multipleChoice', question: 'Välj rätt tecken!', gif: gifMap.hej, options: ['Ja','Hej','Tack','God dag'], correct: 1 },
      { type: 'chooseVideo', question: 'Välj tecknet för "Hej"!', gif: [gifMap.hejDa, gifMap.hej], correct: 1 },
      { type: 'pair', question: 'Para ihop rätt tecken med rätt ord!', gif: [gifMap.godMorgon, gifMap.godNatt], options: ['God morgon','God natt'],  correct: [{ gif: 0, word: 0 }, { gif: 1, word: 1 }] }, //God morgon & Godnatt
      { type: 'multipleChoice', question: 'Välj rätt tecken!', gif: gifMap.trevligtAttTraffas, options: ['Jag kommer','Trevligt att träffas','Jag är yngre','Inom kort'], correct: 1 },
      { type: 'multipleChoice', question: 'Välj rätt tecken!', gif: gifMap.vadHeterDu, options: ['Hur gjorde du','Vad tror du','Hur gammal är du','Vad heter du'], correct: 3 },
    ]
  },


  {
    id: 2,
    title: 'Level 2', //Djur
    description: 'Djur!',
    lessons: [
      { type: 'multipleChoice', question: 'Välj rätt tecken!', gif: gifMap.djur, options: ['Djur','Katt','Älg','Kanin'], correct: 0 },
      { type: 'pair', question: 'Para ihop rätt tecken med rätt ord!', gif: [gifMap.fisk, gifMap.kanin], options: ['Kanin','Fisk'],  correct: [{ gif: 0, word: 1 }, { gif: 1, word: 0 }] },
      { type: 'chooseVideo', question: 'Välj tecknet för "Katt"!', gif: [gifMap.katt, gifMap.hast], correct: 0 },
      { type: 'chooseVideo', question: 'Välj tecknet för "Husdjur"!', gif: [gifMap.fågel, gifMap.husdjur], correct: 1 },
      { type: 'pair', question: 'Para ihop rätt tecken med rätt ord!', gif: [gifMap.alg, gifMap.hund], options: ['Älg','Hund'],  correct: [{ gif: 0, word: 0 }, { gif: 1, word: 1 }] },
    ]
  },
  {
    id: 3,
    title: 'Level 3',
    description: 'Level 3',
    lessons: [
      { type: 'multipleChoice', question: 'Vad betyder A?', gif: gifMap.jagHeter, options: ['A','B','C','D'], correct: 0 },
      { type: 'multipleChoice', question: 'Vad betyder B?', gif: gifMap.jagHeter, options: ['A','B','C','D'], correct: 1 },
      { type: 'multipleChoice', question: 'Vad betyder C?', gif: gifMap.jagHeter, options: ['A','C','B','D'], correct: 1 },
      { type: 'multipleChoice', question: 'Vad är rätt här?', gif: gifMap.jagHeter, options: ['D','E','F','D'], correct: 0 },
      { type: 'multipleChoice', question: 'Vad visas här?', gif: gifMap.jagHeter, options: ['G','E','F','D'], correct: 1 },
    ]
  }
]
