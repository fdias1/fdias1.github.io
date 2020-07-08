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
  element.children().css('opacity',getElementOpcacity($(element)))
}

$(document).ready(function(){
  $(window).scroll(function(){
    $('section').each((index,element) => {
      fade($(element))
    })
  })
})

// serviço de email
var myform = $('form#myform')
myform.submit(function(event){
	event.preventDefault()
	var params = myform.serializeArray().reduce(function(obj, item) {
    obj[item.name] = item.value
    return obj
  }, {})

  // Change to your service ID, or keep using the default service
  var service_id = 'default_service'
  var template_id = 'template_FC08fEDc'

  if (params['message_html'] && params['reply_to'] && params['from_name']) {
    myform.find('button').text('Sending...')
    emailjs.send(service_id, template_id, params)
    .then(function(){ 
        alert('Sua mensagem foi enviada, em breve retornarei o contato, obrigado!')
        myform.find('button').text('Send')
      }, function(err) {
        alert('Something wrong happened, please try again later')
        myform.find('button').text('Send')
        $('message_html').text('')
      }
    )
  }
  return false
})