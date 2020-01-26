export default function (el, map, containWidth, containHeight) {
  const ratinX = window.innerWidth / containWidth
  const ratinY = window.innerHeight / containHeight
  const ratinBoundary = containHeight / containWidth
  const ratin =
    window.innerHeight / window.innerWidth > ratinBoundary ? ratinX : ratinY
  el.style.transform = `scale(${ratinX}, ${ratinY})`
  // el.style.transform = `scale(${ratin})`
  el.style.transformOrigin = 'left top'
  el.style.backgroundSize = '99% 99%'
  // el.style.margin = `${(window.innerHeight - containHeight * ratin) /
  //   2}px ${(window.innerWidth - containWidth * ratin) / 2}px`
  // map.style.margin = `${(window.innerHeight - containHeight * ratin) /
  //   2}px ${(window.innerWidth - containWidth * ratin) / 2}px`
}
