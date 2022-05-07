'use strict';
import {getZero} from './timer';

function slider({nextArrow, prevArrow, current, total, slide, wrapper, inner, slideOffer}){
    const rightArrow = document.querySelector(nextArrow),
    leftArrow = document.querySelector(prevArrow),
    currentNum=document.querySelector(current),
    totalNum=document.querySelector(total),
    slides=document.querySelectorAll(slide),
    slidesWrapper= document.querySelector(wrapper),
    slidesField=document.querySelector(inner),
    width=window.getComputedStyle(slidesWrapper).width,
    slider=document.querySelector(slideOffer),
    dots=[],
    indicators=document.createElement('ol');
    slider.style.position='relative';
    slidesField.style.width =100*slides.length+"%";
    slides.forEach(s=>{
        s.style.width=width;
    });
    slidesField.style.display='flex';
    slidesField.style.transition='0.5s all';
    slidesWrapper.style.overflow='hidden';
    totalNum.textContent=getZero(slides.length);

    indicators.style.cssText=`
    position:absolute;
    right:0;
    bottom:0;
    left:0;
    z-index:15;
    display:flex;
    justify-content:center;
    margin-right:15%;
    margin-left:15%;
    list-style:none;
    `;
    slider.append(indicators);

    for(let i=0;i<slides.length;i++){
        const dot=document.createElement('li');
        dot.setAttribute('data-slide-to',i+1);
        dot.style.cssText=`
        box-sizing:content-box;
        flex:0 1 auto;
        width:30px;
        height:6px;
        margin-right:3px;
        margin-left:3px;
        cursor:pointer;
        background-color:#fff;
        background-clip:padding-box;
        border-top:10px solid transparent;
        border-bottom:10px solid transparent;
        opacity:.5;
        transition:opacity .6 easy;
        `;
        /* if(i==0){
            dot.style.opacity='1';
        } */
        indicators.append(dot);
        dots.push(dot);
        
    }
    

    
    
    let sI=1,
    offset=0;
    slideNumber(sI);
    currentNum.textContent=getZero(sI);
    rightArrow.addEventListener('click',()=>{
        if (offset == (replaceWidth(width)) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += replaceWidth(width); 
        }
        sI++;
        slideNumber(sI);
    });

    
    leftArrow.addEventListener('click',()=>{
    if (offset==0){
        offset=(replaceWidth(width))*(slides.length-1);
    }else{
        offset -= replaceWidth(width);
    }
        sI=sI-1;
        slideNumber(sI);
    });


    function slideNumber(n){
        if(n>slides.length){
        sI=1;   
        }
        if(n<1){
         sI=slides.length;
          }
         dots.forEach(dot=>dot.style.opacity='.5');
        dots[sI-1].style.opacity='1';
        slidesField.style.transform=`translateX(-${offset}px)`;
    
currentNum.textContent=getZero(sI);
}

function replaceWidth(px){

const t = +px.replace(/\D/g,'');
return t;
}



dots.forEach(dot=>{
dot.addEventListener('click',(e)=>{
    const slideTo=e.target.getAttribute('data-slide-to');
    sI=slideTo;
    offset=(replaceWidth(width))*(slideTo-1);
    slideNumber(sI);
});
});

}

export default slider;