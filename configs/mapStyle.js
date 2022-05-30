// const colorArrays = [
//   {
//     svgBg: '#eeeef3',
//     rootRectFill: '#5856d5',
//     rootFoDivFontColor: '#fff',
//     pathStroke: '#5856d5',
//     subRootRectFill: '#0CAFFF',
//     subRootFoDivFontColor: '#fdfafa',
//     leafRectFill: 'transparent',
//     leafFoDivFontColor: '#4B4B4B'
//   },
//   {
//     svgBg: '#2C2C2F',
//     rootRectFill: '#5856D5',
//     rootFoDivFontColor: '#FFF',
//     pathStroke: '#5856d5',
//     subRootRectFill: '#49494E',
//     subRootFoDivFontColor: '#FFF',
//     leafRectFill: 'transparent',
//     leafFoDivFontColor: '#FFF'
//   },
//   {
//     svgBg: '#FFF',
//     rootRectFill: '#597391',
//     rootFoDivFontColor: '#FFF',
//     pathStroke: '#A0BAD2',
//     subRootRectFill: '#FDF2F2',
//     subRootFoDivFontColor: '#848289',
//     leafRectFill: 'transparent',
//     leafFoDivFontColor: '#848289'
//   },
//   {
//     svgBg: '#DFDFDF',
//     rootRectFill: '#A53626',
//     rootFoDivFontColor: '#FFF',
//     pathStroke: '#383833',
//     subRootRectFill: '#383833',
//     subRootFoDivFontColor: '#FFF',
//     leafRectFill: 'transparent',
//     leafFoDivFontColor: '#57575B'
//   }
// ]
const markerList = [
  {
    category: '颜色',
    imgs: [
      'https://cdn.kimjisoo.cn/pic/svgicons/tag-red.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/tag-orange.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/tag-yellows.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/tag-green.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/tag-blue.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/tag-dark-purple.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/tag-grey.svg'
    ]
  },
  {
    category: '优先级',
    imgs: [
      'https://cdn.kimjisoo.cn/pic/svgicons/priority-1.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/priority-2.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/priority-3.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/priority-4.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/priority-5.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/priority-6.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/priority-7.svg'
    ]
  },
  {
    category: '任务',
    imgs: [
      'https://cdn.kimjisoo.cn/pic/svgicons/task-start.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/task-oct.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/task-3oct.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/task-half.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/task-5oct.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/task-7oct.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/task-done.svg'
    ]
  },
  {
    category: '标记',
    imgs: [
      'https://cdn.kimjisoo.cn/pic/svgicons/flag-red.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/flag-orange.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/flag-yellow.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/flag-green.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/flag-blue.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/flag-purple.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/flag-gray.svg'
    ]
  },
  {
    category: '符号',
    imgs: [
      'https://cdn.kimjisoo.cn/pic/svgicons/c_symbol_heart.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/c_symbol_like.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/c_symbol_dislike.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/c_symbol_heart.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/symbol-pin.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/symbol-idea.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/symbol-lightning.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/c_symbol_telephone.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/c_symbol_pen.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/symbol-run.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/symbol-exclam.svg',
      'https://cdn.kimjisoo.cn/pic/svgicons/symbol-question.svg'
    ]
  }
]

const mapList = [
  {
    name: 'Logic Tree',
    id: 'MAPID-LogicTree',
    imgUrl: 'https://cdn.kimjisoo.cn/pic/svgicons/logic-tree.svg'
  },
  {
    name: 'Tree Table',
    id: 'MAPID-TreeTable',
    imgUrl: 'https://cdn.kimjisoo.cn/pic/svgicons/tree-table.svg'
  }
]

const colorList = [
  {
    id: 'COLOR-Energy-2',
    imgUrl: 'https://cdn.kimjisoo.cn/pic/svgicons/colors/energy-2.svg',
    style: {
      colors: {
        bgRoot: '#0D0D0D',
        bgSubRoot: '#233ED9',
        bgLeaf: '#ffffff',
        bgSvg: '#ffffff',
        path: '#0D0D0D',
        border: '#0D0D0D',
        textRoot: '#ffffff',
        textSubRoot: '#ffffff',
        textLeaf: '#0D0D0D',
      }
    }
  },
  {
    id: 'COLOR-Energy-4',
    imgUrl: 'https://cdn.kimjisoo.cn/pic/svgicons/colors/energy-4.svg',
    style: {
      colors: {
        bgRoot: '#F22816',
        bgSubRoot: '#FFFFFF',
        bgLeaf: '#262626',
        bgSvg: '#0D0D0D',
        path: '#F22816',
        border: '#F22816',
        textRoot: '#ffffff',
        textSubRoot: '#0D0D0D',
        textLeaf: '#ffffff',
      }
    }
  },
  {
    id: 'COLOR-Florid-2',
    imgUrl: 'https://cdn.kimjisoo.cn/pic/svgicons/colors/florid-2.svg',
    style: {
      colors: {
        bgRoot: '#0A052E',
        bgSubRoot: '#1692D2',
        bgLeaf: '#e3ecff',
        bgSvg: '#EDF3FF',
        path: '#0A052E',
        border: '#0A052E',
        textRoot: '#ffffff',
        textSubRoot: '#ffffff',
        textLeaf: '#0A052E',
      }
    }
  },
  {
    id: 'COLOR-Sakura-2',
    imgUrl: 'https://cdn.kimjisoo.cn/pic/svgicons/colors/sakura-2.svg',
    style: {
      colors: {
        bgRoot: '#FFA9C6',
        bgSubRoot: '#D1C3BD',
        bgLeaf: '#ffd4dc',
        bgSvg: '#FFE3E8',
        path: '#FFA9C6',
        border: '#FFA9C6',
        textRoot: '#101010',
        textSubRoot: '#101010',
        textLeaf: '#101010',
      }
    }
  }
]

module.exports = { markerList, mapList, colorList }
