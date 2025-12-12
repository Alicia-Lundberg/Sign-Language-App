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
  alg: require('../../assets/gifs/level_2/alg.gif'),
  djur: require('../../assets/gifs/level_2/djur.gif'),
  fagel: require('../../assets/gifs/level_2/fagel.gif'),
  fisk: require('../../assets/gifs/level_2/fisk.gif'),
  hast: require('../../assets/gifs/level_2/hast.gif'),
  hund: require('../../assets/gifs/level_2/hund.gif'),
  husdjur: require('../../assets/gifs/level_2/husdjur.gif'),
  kanin: require('../../assets/gifs/level_2/kanin.gif'),
  katt: require('../../assets/gifs/level_2/katt.gif'),  
}

export const lessonsData = [
  {
    id: 1,
    title: 'Nivå 1', //Hälsningsfraser
    description: 'Hälsningsfraser',
    lessons: [
      { type: 'multipleChoice', question: 'Vad betyder tecknet?', gif: gifMap.hej, options: ['Ja','Hej','Tack','God dag'], correct: 1 },
      { type: 'chooseVideo', question: 'Välj tecknet för "Hej"', gif: [gifMap.hejDa, gifMap.hej], correct: 1 },
      { type: 'pair', question: 'Para ihop tecken och ord', questionDescr: 'Tryck på tecknet och ordet som hör ihop', gif: [gifMap.godMorgon, gifMap.godNatt], options: ['God morgon','God natt'],  correct: [{ gif: 0, word: 0 }, { gif: 1, word: 1 }] }, //God morgon & Godnatt
      { type: 'multipleChoice', question: 'Vad betyder tecknet?', gif: gifMap.trevligtAttTraffas, options: ['Jag kommer','Trevligt att träffas','Jag är yngre','Inom kort'], correct: 1 },
      { type: 'multipleChoice', question: 'Vad betyder tecknet?', gif: gifMap.vadHeterDu, options: ['Hur gjorde du','Vad tror du','Hur gammal är du','Vad heter du'], correct: 3 },
    ]
  },


  {
    id: 2,
    title: 'Nivå 2', //Djur
    description: 'Djur',
    lessons: [
      { type: 'multipleChoice', question: 'Vad betyder tecknet?', gif: gifMap.djur, options: ['Djur','Katt','Älg','Kanin'], correct: 0 },
      { type: 'pair', question: 'Para ihop tecken och ord', questionDescr: 'Tryck på tecknet och ordet som hör ihop', gif: [gifMap.fisk, gifMap.kanin], options: ['Kanin','Fisk'], correct: [{ gif: 0, word: 1 }, { gif: 1, word: 0 }] },
      { type: 'chooseVideo', question: 'Välj tecknet för "Katt"', gif: [gifMap.katt, gifMap.hast], correct: 0 },
      { type: 'chooseVideo', question: 'Välj tecknet "Husdjur"', gif: [gifMap.fagel, gifMap.husdjur], correct: 1 },
      { type: 'pair', question: 'Para ihop tecken och ord', questionDescr: 'Tryck på tecknet och ordet som hör ihop', gif: [gifMap.alg, gifMap.hund], options: ['Älg','Hund'], correct: [{ gif: 0, word: 0 }, { gif: 1, word: 1 }] },
]},
  {
    id: 3,
    title: 'Nivå 3',
    description: 'TODO',
    lessons: [
      { type: 'multipleChoice', question: 'Vad betyder A?', gif: gifMap.jagHeter, options: ['A','B','C','D'], correct: 0 },
      { type: 'multipleChoice', question: 'Vad betyder B?', gif: gifMap.jagHeter, options: ['A','B','C','D'], correct: 1 },
      { type: 'multipleChoice', question: 'Vad betyder C?', gif: gifMap.jagHeter, options: ['A','C','B','D'], correct: 1 },
      { type: 'multipleChoice', question: 'Vad är rätt här?', gif: gifMap.jagHeter, options: ['D','E','F','D'], correct: 0 },
      { type: 'multipleChoice', question: 'Vad visas här?', gif: gifMap.jagHeter, options: ['G','E','F','D'], correct: 1 },
    ]
  }
]
