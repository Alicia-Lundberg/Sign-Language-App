// app/data/lessons.js

// Map all your GIFs here
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
}

export const lessonsData = [
  {
    id: 1,
    title: 'Level 1', //Hälsningsfraser
    lessons: [
      { type: 'multipleChoice', question: 'Välj rätt tecken', gif: gifMap.hej, options: ['Ja','Hej','Tack','God dag'], correct: 1 },
      { type: 'chooseVideo', question: 'Välj rätt tecken', gif: [gifMap.hejDa, gifMap.hej], correct: 1 },
      { type: 'multipleChoice', question: 'Para ihop rätt', gif: gifMap.godMorgon, options: ['God morgon','TODO','TODO','TODO'], correct: 0 }, //God morgon & Godnatt
      { type: 'multipleChoice', question: 'Välj rätt tecken', gif: gifMap.trevligtAttTraffas, options: ['Jag kommer','Trevligt att träffas','Jag är yngre','Inom kort'], correct: 1 },
      { type: 'multipleChoice', question: 'Välj rätt tecken', gif: gifMap.vadHeterDu, options: ['Hur gjorde du','Vad tror du','Hur gammal är du','Vad heter du'], correct: 3 },
    ]
  },
  {
    id: 2,
    title: 'Level 2',
    lessons: [
      { type: 'multipleChoice', question: 'Vad betyder A?', gif: gifMap.jagHeter, options: ['A','B','C','D'], correct: 0 },
      { type: 'multipleChoice', question: 'Vad betyder B?', gif: gifMap.jagHeter, options: ['A','B','C','D'], correct: 1 },
      { type: 'multipleChoice', question: 'Vad betyder C?', gif: gifMap.jagHeter, options: ['A','C','B','D'], correct: 1 },
      { type: 'multipleChoice', question: 'Vad är rätt här?', gif: gifMap.jagHeter, options: ['D','E','F','D'], correct: 0 },
      { type: 'multipleChoice', question: 'Vad visas här?', gif: gifMap.jagHeter, options: ['G','E','F','D'], correct: 1 },
    ]
  },
  {
    id: 3,
    title: 'Level 3',
    lessons: [
      { type: 'multipleChoice', question: 'Vad betyder A?', gif: gifMap.jagHeter, options: ['A','B','C','D'], correct: 0 },
      { type: 'multipleChoice', question: 'Vad betyder B?', gif: gifMap.jagHeter, options: ['A','B','C','D'], correct: 1 },
      { type: 'multipleChoice', question: 'Vad betyder C?', gif: gifMap.jagHeter, options: ['A','C','B','D'], correct: 1 },
      { type: 'multipleChoice', question: 'Vad är rätt här?', gif: gifMap.jagHeter, options: ['D','E','F','D'], correct: 0 },
      { type: 'multipleChoice', question: 'Vad visas här?', gif: gifMap.jagHeter, options: ['G','E','F','D'], correct: 1 },
    ]
  }
]
