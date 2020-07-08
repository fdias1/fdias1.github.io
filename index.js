function getElementOpcacity(element) {
  const scrollTop = $(window).scrollTop()
  const scrollHeight = $(window).height()
  const scrollBotton = $(window).scrollTop() + scrollHeight
  const elementTop = element.position().top
  const elementHeight = element.height()
  const elementBotton = element.position().top + elementHeight

  const blackZone = 0.2
  const fadeZone = 0.3

  const blackZoneHeight = blackZone * scrollHeight
  const blackZoneTop = scrollTop + blackZoneHeight
  const blackZoneBotton = scrollBotton - blackZoneHeight

  const fadeZoneHeight = fadeZone * scrollHeight
  const fadeZoneTop = scrollTop + fadeZoneHeight + blackZoneHeight
  const fadeZoneBotton = scrollBotton - fadeZoneHeight - blackZoneHeight

  let whereElementIs = ''
  if (elementBotton < scrollBotton && elementTop > scrollTop) {
    whereElementIs = 'focus'
    return 1

  } else if (elementTop > blackZoneBotton){
    whereElementIs = 'blackzone'
    return 0
    
  } else if (elementBotton < blackZoneTop) {
    whereElementIs = 'blackzone'
    return 0

  } else if (elementTop > fadeZoneBotton) {
    whereElementIs = 'botton'
    return (blackZoneBotton - elementTop) / fadeZoneHeight

  } else if (elementBotton < fadeZoneTop ) {
    whereElementIs = 'top'
    return (elementBotton - blackZoneTop) / fadeZoneHeight

  } else {
    whereElementIs = 'focus'
    return 1

  }
}

function fade(element) {
  element.children().css("opacity",getElementOpcacity($(element)))
}

$(document).ready(function(){
  $(window).scroll(function(){
    $('section').each((index,element) => {
      fade($(element))
    })
  })
})