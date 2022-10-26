document.addEventListener('DOMContentLoaded', () => {

  // Tabs

  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent(){
    tabsContent.forEach(elem => {
      elem.classList.add('hide')
      elem.classList.remove('show')
    })

    tabs.forEach(elem => {
      elem.classList.remove('tabheader__item_active')
    })
  }

  function showTabContent(i = 0){
    tabsContent[i].classList.remove('hide')
    tabsContent[i].classList.add('show', 'fade')
    tabs[i].classList.add('tabheader__item_active')
  }

  hideTabContent()
  showTabContent()

  tabsParent.addEventListener('click', (event) => {
    const target = event.target;
    console.log('fdslkf')
    if (target && target.classList.contains('tabheader__item')){
      tabs.forEach((item, i) => {
        if (target === item){
          hideTabContent()
          showTabContent(i)
        }
      })
    }
  })

  // Timer

  const deadline = '2022-10-30';

  function getTimeRemainging(endtime){
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / (1000 * 60) % 60),
          seconds = Math.floor(t / 1000 % 60)

    return {
      t,
      days,
      hours,
      minutes,
      seconds
    }
  }

  function setClock(selector, endtime, block){
    const block = document.querySelector(block),
          timer = document.querySelector(selector),
          days = document.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds')
          timeInterval = setInterval(updateClock, 1000)

    updateClock()

    function getZero(int){
      return (int > 0 && int > 10) ? int : `0${int}`
    }

    function updateClock(){
      const t = getTimeRemainging(endtime)

      if (t.t < 0) {
        block.innerHTML = ''
        clearInterval(timeInterval)
      }

      days.innerHTML = getZero(t.days)
      hours.innerHTML = getZero(t.hours)
      minutes.innerHTML = getZero(t.minutes)
      seconds.innerHTML = getZero(t.seconds)
    }
  }

  // Promotion

  setClock('.timer', deadline, '.promotion')
})