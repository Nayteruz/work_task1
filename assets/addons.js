
document.addEventListener("DOMContentLoaded", function() {
    acc();
    tabs();
    slider();
});

function acc(){
    let item = document.querySelectorAll('.item-acc .name');
    item.forEach(function(el){
        el.addEventListener('click', function(e){
            let elem = e.target;
            let par = elem.parentNode;
            let itemText = par.querySelector('.text');
            itemText.classList.toggle('open');
        })
    })
};

function tabs(){
    let titleTabs = document.querySelectorAll('.tabs .list li');
    let textTabs = document.querySelectorAll('.tabs .tab-text .item-text');

    listEl(titleTabs, 0, 'active');
    listEl(textTabs, 0, 'active');

    titleTabs.forEach(function(el, index){
        el.addEventListener('click', function(e){
            let i = index;
            listEl(titleTabs, i, 'active');
            listEl(textTabs, i, 'active');
            e.preventDefault();
        })
    })

    function listEl(list, ind, activeClass){
        list.forEach(function(e, index){
            if(ind == index){
                e.classList.add(activeClass);
            } else {
                e.classList.remove(activeClass);
            }
        })
    }
}



function slider(){
    let wrapSlider, track, trackWidth, itemsTrack, prev, next, currentElem = 0, itemWidth, leftTransform = 0, animated = false;

    wrapSlider = document.querySelector('.slider');
    track = wrapSlider.querySelector('.list');
    trackWidth = track.offsetWidth;
    itemsTrack = track.querySelectorAll('.item');
    //itemWidth = itemsTrack[0].offsetWidth;

    prev = wrapSlider.querySelector('.controlls .prev');
    next = wrapSlider.querySelector('.controlls .next');
    next.addEventListener('click', function(){
        slideCont(+1);
    })
    prev.addEventListener('click', function(){
        slideCont(-1);
    })
    disabledButton(0);
    activeClass(0);
    isAnimated();

    window.onresize = function(event) {
        trackWidth = track.offsetWidth;
    };

    function slideCont(ind){
        if(animated) return;
        currentElem += ind;
        activeClass(currentElem);
        disabledButton(currentElem);
        leftTransform = -1 * trackWidth * (currentElem);
        track.style.transform =  `translateX(${leftTransform}px)`;
    }

    function activeClass(ind){
        itemsTrack.forEach(function(el, index){
            el.classList.remove('active');
            if(ind == index){
                itemsTrack[ind].classList.add('active');
            }
        })
    }

    function disabledButton(ind){
        if(ind == 0){
            prev.setAttribute('disabled', 'disabled');
        } else if (ind == itemsTrack.length - 1){
            next.setAttribute('disabled', 'disabled');
        } else if (ind > 0 && ind < itemsTrack.length ) {
            prev.removeAttribute('disabled');
            next.removeAttribute('disabled');
        }

    }

    function isAnimated(){
        track.addEventListener("transitionstart", function(e){
            track.classList.add('animated');
            animated = true;
        }, false);
        track.addEventListener("transitionend", function(e){
            track.classList.remove('animated');
            animated = false;
        }, false);
    }
}


